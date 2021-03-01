const { Client } = require("pg");
const { connection } = require("./connection");

const _dropDB = async () => {
  try {
    const query = `DROP TABLE users;`;
    const messagesQuery = `DROP TABLE messages;`;
    await connection().pool.query(query);
    await connection().pool.query(messagesQuery);
    return;
  } catch (err) {
    console.log(`Table Drop error: ${err}`);
  }
};
const _configureDB = async () => {
  try {
    const tableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT GENERATED ALWAYS AS IDENTITY,
        email varchar UNIQUE,
        name varchar,
        username varchar UNIQUE,
        password varchar,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

    const messagesQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT GENERATED ALWAYS AS IDENTITY,
      sender_id int,
      sender_name varchar,
      message varchar,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;
    await connection().pool.query(tableQuery);
    await connection().pool.query(messagesQuery);
    return;
  } catch (err) {
    console.log(`Table Creation error: ${err}`);
  }
};

module.exports = {
  configure: _configureDB,
  destroy: _dropDB,
};
