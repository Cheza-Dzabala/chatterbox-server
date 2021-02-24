const { Client } = require("pg");
const { connection } = require("./connection");

const _dropDB = async () => {
  try {
    const query = ` DELETE FROM users;`;
    const table = await connection().pool.query(query);
    return;
  } catch (err) {
    console.log(`Table Creation error: ${err}`);
  }
};
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
    const table = await connection().pool.query(query);
    return;
  } catch (err) {
    console.log(`Table Creation error: ${err}`);
  }
};

module.exports = {
  configure: _configureDB,
  destroy: _dropDB,
};
