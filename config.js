const dotenv = require("dotenv");
const { boolean } = require("joi");

dotenv.config();

const isSecure = process.env.NODE_ENV === "production" ? true : false;

const _databaseConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  secure: isSecure,
};

const _testDatabaseConfig = {
  user: process.env.TEST_DATABASE_USER,
  host: process.env.TEST_DATABASE_HOST,
  database: process.env.TEST_DATABASE_NAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  port: process.env.TEST_DATABASE_PORT,
  secure: false,
};

const _environmentConfig = {
  PORT: process.env.NODE_ENV === "test" ? 4000 : process.env.PORT,
  HOSTNAME:
    process.env.NODE_ENV === "test" ? "localhost" : process.env.HOSTNAME,
};

const _jwtSecretKey = process.env.PASSWORD_SECRET;

const db =
  process.env.NODE_ENV === "test" ? _testDatabaseConfig : _databaseConfig;
module.exports = {
  environmentConfig: _environmentConfig,
  dbConfig: db,
  jwtSecretKey: _jwtSecretKey,
  testDbConfig: _testDatabaseConfig,
};
