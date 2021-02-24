const http = require("http");
const url = require("url");
const { routes } = require("./routes");
const { configure } = require("./setup");
const {
  environmentConfig: { PORT, HOSTNAME },
} = require("./config");

configure();
const server = http.createServer((req, res) => {
  let body = null;
  const endpoint = req.url.split("/")[1];
  const headers = req.headers;
  const method = req.method.toLowerCase();

  req.on("data", (data) => {
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

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
