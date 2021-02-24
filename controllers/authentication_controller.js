const { processLogin } = require("./login");
const { processRegistration } = require("./register");
const authenticationController = () => {
  return {
    login: processLogin,
    register: processRegistration,
  };
};

module.exports = {
  authenticationController: authenticationController,
};
