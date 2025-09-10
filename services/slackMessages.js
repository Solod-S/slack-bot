const { WebClient } = require("@slack/web-api");
const { botToken, channelID } = require("../config/slackConfig");

const web = new WebClient(botToken);

// Отправка простого сообщения
async function sendMessage(text) {
  try {
    const resp = await web.chat.postMessage({ channel: channelID, text });
    console.log(`✅ Сообщение отправлено: "${text}"`);
    return resp.ts; // возвращаем ts для тредов
  } catch (err) {
    console.error("Ошибка отправки сообщения:", err.data || err);
  }
}

module.exports = { sendMessage, web };
