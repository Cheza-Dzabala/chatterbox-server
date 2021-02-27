const validUserLogin = {
  email: "chezad@live.com",
  password: "12345362",
};
const badEmailUserLogin = {
  email: "chezad2@live.com",
  password: "12345362",
};

const missingPasswordLogin = {
  email: "chezad@live.com",
};
const validUserRegistration = {
  name: "Macheza Dzabala",
  email: "chezad@live.com",
  username: "cheza",
  password: "12345362",
  confirm_password: "12345362",
};

const missingUserName = {
  email: "chezad@live.com",
  password: "Chwaisajosai",
  username: "Cheza",
};

module.exports = {
  validUser: validUserRegistration,
  missingUserName: missingUserName,
  validUserLogin: validUserLogin,
  missingPasswordLogin: missingPasswordLogin,
  badEmailUserLogin: badEmailUserLogin,
};
