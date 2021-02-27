const registrationString =
  "INSERT INTO users(name, email, username, password) VALUES($1, $2, $3, $4) RETURNING *";

const _userString = "SELECT * FROM users WHERE email = $1";

module.exports = {
  registrationString: registrationString,
  userString: _userString,
};
