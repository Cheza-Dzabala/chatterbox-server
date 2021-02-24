const {
  authenticationController,
} = require("./controllers/authentication_controller");

const handleAuth = authenticationController();
const _respond = (res, statusCode, payloadStr) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(statusCode);
  res.write(payloadStr);
  res.end("\n");
};

let _routes = {
  // Handle Login Route
  login: async (data, res) => {
    switch (data.method) {
      case "post":
        const response = await handleAuth.login(data.body);
        _respond(res, response.statusCode, JSON.stringify(response.data));
        break;
      default:
        let payload = {
          data: { message: "Method not allowed on this route" },
        };
        respond(res, 405, JSON.stringify(payload));
        break;
    }
  },

  // Handle Registration Route
  register: async (data, res) => {
    switch (data.method) {
      case "post": {
        const response = await handleAuth.register(data.body);
        _respond(res, response.statusCode, JSON.stringify(response.data));
        return;
      }
      default: {
        let payload = {
          data: {
            message: "Method not allowed on this route",
          },
        };
        _respond(res, 405, JSON.stringify(payload));
        return;
      }
    }
  },

  // Handle Route Not Found 404
  notFound: function (data, res) {
    let payload = {
      data: {
        message: "This route is not available",
      },
    };
    _respond(res, 404, JSON.stringify(payload));
  },
};

module.exports = {
  routes: _routes,
};
