const bcrypt = require("bcrypt");
const { connection } = require("../db/connection");
var { userString, registrationString } = require("../strings/db_strings");
const conn = connection();

const _getUser = async (email) => {
  const result = await conn.pool.query(userString, [email]);
  if (result.rows[0] === undefined) {
    throw new Error("No user with this email");
  }
  return result.rows[0];
};

const _saveUser = async (body) => {
  const { name, email, username, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const dbValues = [name, email, username, hashedPassword];
  try {
    const result = await conn.pool.query(registrationString, dbValues);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getUser: _getUser,
  saveUser: _saveUser,
};
