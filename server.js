const http = require("http");
const url = require("url");
const { routes } = require("./routes");
const { configure } = require("./db/setup");
const cors = require("cors");
const {
  environmentConfig: { PORT, HOSTNAME },
} = require("./config");
const { decodeToken } = require("./utils/token");
const { setMessage } = require("./models/messages");

configure();
const server = http.createServer((req, res) => {
  let body = null;
  const endpoint = url.parse(req.url).pathname.split("/")[1];
  const headers = req.headers;
  const method = req.method.toLowerCase();
  const allowed = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    /** add other headers as per requirement */
  };
  if (req.method === "OPTIONS") {
    res.writeHead(204, allowed);
    res.end();
    return;
  }

  req.on("data", (data) => {
    console.log("Data");
    body = JSON.parse(data);
  });

  req.on("end", function () {
    const route =
      typeof routes[endpoint] !== "undefined"
        ? routes[endpoint]
        : routes["notFound"];
    const data = {
      headers: headers,
      method: method,
      body: body,
    };
    route(data, res);
  });
});

const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: false,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  const token = socket.handshake.headers.authorization.split(" ")[1];
  const user = decodeToken(token);
  if (user !== null) {
    user.socketId = socket.id;
    if (!onlineUsers.some((online) => online.email === user.email)) {
      onlineUsers.push(user);
      io.emit("user_online", onlineUsers);
      // console.log(onlineUsers);
    }
  }

  socket.on("messages", async (data) => {
    try {
      const newMessage = await setMessage(data);
      io.emit("new_message", newMessage);
    } catch (e) {
      io.emit("message_error", e.message);
    }
  });

  socket.on("disconnect", (reason) => {
    // console.log("disconnect", reason);
    const onlineCopy = [];
    let offlineUser;
    onlineUsers.forEach((online) => {
      if (online.socketId !== socket.id) {
        onlineCopy.push(online);
      }
      if (online.socketId === socket.id) {
        offlineUser = online;
      }
    });
    onlineUsers = onlineCopy;
    // console.log(onlineUsers);
    io.emit("user_offline", offlineUser);
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

module.exports = server;
