const TelegramBot = require("node-telegram-bot-api");
const { token } = require("../helpers/shared");

const bot = new TelegramBot(token, { polling: true });

module.exports = { bot };

require("./message/message");
