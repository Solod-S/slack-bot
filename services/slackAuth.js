const axios = require("axios");
const {
  clientId,
  clientSecret,
  refreshToken,
} = require("../config/slackConfig");

// Обновляем user token через refresh_token
async function getUserToken() {
  try {
    const res = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
      }
    );

    if (!res.data.ok) {
      throw new Error(
        "Не удалось получить user token: " + JSON.stringify(res.data)
      );
    }

    return res.data.access_token; // xoxp-...
  } catch (err) {
    console.error("Ошибка получения user token:", err.message);
    throw err;
  }
}

module.exports = { getUserToken };
