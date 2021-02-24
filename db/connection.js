const { Pool } = require("pg");
const { dbConfig } = require("../config");

var conn = () => {
  const _pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  _pool.connect();

  return {
    pool: _pool,
    connect: () => {
      _pool.on("error", () => {
        console.log("Client Errrored");
      });
      _pool.on("notification", (message) =>
        console.log("Client Message", message)
      );
    },
    closeConnection: () => _pool.end(),
  };
};

module.exports = {
  connection: conn,
};
