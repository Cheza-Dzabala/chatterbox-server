const bcrypt = require("bcrypt");
const { testEmail } = require("../utils/regex");
const { connection } = require("../db/connection");
const { signUser } = require("../utils/token");
var { loginString } = require("../strings/db_strings");

const conn = connection();

const _sanitizeInput = (email, password) => {
  if (email === undefined || email === "") {
    throw new Error("Email is required");
  } else if (!testEmail(email)) {
    throw new Error("Please enter a valid email");
  }
  if (password === undefined || password === "") {
    throw new Error("Password is required");
  }
};

const _login = async (body) => {
  const { email, password } = body;
  try {
    _sanitizeInput(email, password);
  } catch (err) {
    return {
      statusCode: 403,
      data: { data: err.message, message: "Unable to log you in." },
    };
  }
  const result = await conn.pool.query(loginString, [email]);
  if (result.rows[0] === undefined) {
    return {
      statusCode: 404,
      data: {
        message: "Unable to log in.",
        data: "Please check your email address",
      },
    };
  }

  const passwordValid = bcrypt.compareSync(password, result.rows[0].password);
  if (passwordValid) {
    const user = signUser(result.rows[0]);
    return {
      statusCode: 200,
      data: {
        data: user,
        message: "Successfully logged in.",
      },
    };
  }
  return {
    statusCode: 403,
    data: { message: "Login unsuccessful", data: "Please check your password" },
  };
};

module.exports = {
  processLogin: _login,
};
