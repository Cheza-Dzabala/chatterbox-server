const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");

const signUser = (user) => {
  const token = jwt.sign(user, jwtSecretKey, {
    expiresIn: 86400,
  });
  user.token = token;
  delete user.password;
  return user;
};

module.exports = {
  signUser: signUser,
};
