const { connection } = require("../db/connection");
var { getMessagesString, setMessagesString } = require("../strings/db_strings");
const conn = connection();

const _setMessage = async (messageObject) => {
  const { sender_id, sender_name, message } = messageObject;
  try {
    const result = await conn.pool.query(setMessagesString, [
      sender_id,
      sender_name,
      message,
    ]);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
};
const _getMessages = async () => {
  try {
    const result = await conn.pool.query(getMessagesString);
    return result.rows;
  } catch (e) {
    console.log("error", e.message);
    throw new Error(e.message);
  }
};

module.exports = {
  getMessages: _getMessages,
  setMessage: _setMessage,
};
