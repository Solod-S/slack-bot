require("dotenv").config();

module.exports = {
  botToken: process.env.SLACK_BOT_TOKEN,
  channelID: process.env.SLACK_CHANNEL_ID,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  refreshToken: process.env.SLACK_USER_REFRESH_TOKEN,
};
