const { Client } = require("pg");
const { connection } = require("./db/connection");

const _configureDB = async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        email varchar UNIQUE,
        name varchar,
        username varchar UNIQUE,
        password varchar
    );
    `;
    await connection().pool.query(query);
    // console.log("Table Created", table);
    return;
  } catch (err) {
    console.log(`Table Creation error: ${err}`);
  }
};

module.exports = {
  configure: _configureDB,
};
