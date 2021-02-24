const bcrypt = require("bcrypt");
const { connection } = require("../db/connection");
const { signUser } = require("../utils/token");
var { registrationString } = require("../strings/db_strings");

const conn = connection();

const _verifyAccount = () => {};

const _registerAccount = async (body) => {
  const { name, email, username, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const dbValues = [name, email, username, hashedPassword];
  try {
    const result = await conn.pool.query(registrationString, dbValues);
    const user = signUser(result.rows[0]);
    return {
      statusCode: 201,
      data: {
        data: user,
        message: "Successfully registered user. Happy Chatting!",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      data: { data: err.message, message: "Unable to register user" },
    };
  }
};

module.exports = {
  processRegistration: _registerAccount,
};
