const { responseUtility } = require("../utils/responses");
const { getMessages } = require("../models/messages");
const { head } = require("superagent");

function _messagesController() {
  async function _getConversation() {
    try {
      const messages = await getMessages();
      return responseUtility(200, messages, "Message Thread");
    } catch (e) {
      return responseUtility(200, e.message, "Unable to get messages");
    }
  }

  return {
    getConversation: _getConversation,
  };
}

module.exports = {
  messagesController: _messagesController,
};
