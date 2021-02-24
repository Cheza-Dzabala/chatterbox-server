const {
  authenticationController,
} = require("./controllers/authentication_controller");
const { loginSchema, registrationSchema } = require("./models/schemas");
const { responseUtility } = require("./utils/responses");

const _handleAuth = authenticationController();
const _respond = (res, statusCode, payloadStr) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(statusCode);
  res.write(payloadStr);
  res.end("\n");
};

const _processErrors = (error) => {
  const response = responseUtility(
    422,
    error.details[0].message,
    "validation errror"
  );
  return response;
};

let _routes = {
  // Handle Login Route
  login: async (data, res) => {
    const { body, method } = data;
    try {
      const { error, value } = loginSchema.validate(body);
      if (error) {
        const response = _processErrors(error);
        return _respond(
          res,
          response.statusCode,
          JSON.stringify(response.data)
        );
      }
      switch (method) {
        case "post":
          const { statusCode, data } = await _handleAuth.login(value);
          _respond(res, statusCode, JSON.stringify(data));
          break;
        default:
          let payload = {
            data: { message: "Method not allowed on this route" },
          };
          _respond(res, 405, JSON.stringify(payload));
          break;
      }
    } catch (e) {
      console.log("\n\n Internal Server Error::::: ", e);
      _respond(res, 500, "Something went wrong");
    }
  },

  // Handle Registration Route
  register: async (data, res) => {
    const { body, method } = data;
    try {
      const { error, value } = registrationSchema.validate(body);
      if (error) {
        const response = _processErrors(error);
        return _respond(
          res,
          response.statusCode,
          JSON.stringify(response.data)
        );
      }
      switch (method) {
        case "post": {
          const { statusCode, data } = await _handleAuth.register(value);
          _respond(res, statusCode, JSON.stringify(data));
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
    } catch (e) {
      console.log("\n\n Internal Server Error::::: ", e);
      _respond(res, 500, "Something went wrong");
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
