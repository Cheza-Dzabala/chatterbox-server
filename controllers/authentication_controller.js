const bcrypt = require("bcrypt");
const { signUser } = require("../utils/token");
const { getUser, saveUser } = require("../models/user");
const { responseUtility } = require("../utils/responses");

function authenticationController() {
  async function _processLogin(body) {
    const { email, password } = body;
    try {
      const user = await getUser(email);
      const passwordValid = bcrypt.compareSync(password, user.password);
      if (passwordValid) {
        const response = signUser(user);
        return responseUtility(200, response, "Successfully logged in.");
      }
      return responseUtility(403, response, "Unable to log in.");
    } catch (err) {
      console.log("Login err", err.message);

      return responseUtility(403, err.message, "Unable to log in.");
    }
  }

  async function _processRegistration(body) {
    try {
      const user = await saveUser(body);
      const response = signUser(user);
      return responseUtility(201, response, "Successfully registered user.");
    } catch (err) {
      console.log("Registration err", err.message);
      return responseUtility(403, err.message, "Unable to sign you up.");
    }
  }

  return {
    login: _processLogin,
    register: _processRegistration,
  };
}

module.exports = {
  authenticationController: authenticationController,
};
