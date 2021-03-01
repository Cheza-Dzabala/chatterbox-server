const e = require("cors");
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

const decodeToken = (token) => {
  const user = jwt.decode(token);
  if (user !== null) {
    delete user.password;
    return user;
  } else {
    throw new Error("Malformed token");
  }
};
module.exports = {
  signUser: signUser,
  decodeToken: decodeToken,
};
