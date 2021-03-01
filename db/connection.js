const { Pool } = require("pg");
const { dbConfig } = require("../config");

var conn = () => {
  const _pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
    ssl: { rejectUnauthorized: false },
  });

  _pool.connect();

  return {
    pool: _pool,
    closeConnection: () => _pool.end(),
  };
};

module.exports = {
  connection: conn,
};
