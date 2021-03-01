const registrationString =
  "INSERT INTO users(name, email, username, password) VALUES($1, $2, $3, $4) RETURNING *";

const _userString = "SELECT * FROM users WHERE email = $1";

const _getMessagesString = "Select * FROM messages";

const _setMessageString =
  "INSERT INTO messages(sender_id, sender_name, message) VALUES($1, $2, $3) RETURNING *";

module.exports = {
  registrationString: registrationString,
  userString: _userString,
  getMessagesString: _getMessagesString,
  setMessagesString: _setMessageString,
};
