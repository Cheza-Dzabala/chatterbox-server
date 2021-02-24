const registrationString =
  "INSERT INTO users(name, email, username, password) VALUES($1, $2, $3, $4) RETURNING *";

const loginString = "SELECT * FROM users WHERE email = $1";

module.exports = {
  registrationString: registrationString,
  loginString: loginString,
};
