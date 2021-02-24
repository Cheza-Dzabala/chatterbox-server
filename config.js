const dotenv = require("dotenv");

dotenv.config();

const _databaseConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

const _environmentConfig = {
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
};

const _jwtSecretKey = process.env.PASSWORD_SECRET;

module.exports = {
  environmentConfig: _environmentConfig,
  dbConfig: _databaseConfig,
  jwtSecretKey: _jwtSecretKey,
};
