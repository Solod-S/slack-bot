const fs = require("fs");
const { web } = require("./slackMessages");
const { channelID } = require("../config/slackConfig");

// Отправка одного файла
async function sendFile(filePath, comment = "") {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("Файл не найден:", filePath);
      return;
    }

    const filename = filePath.split("/").pop();

    const resp = await web.files.uploadV2({
      file: fs.createReadStream(filePath),
      filename,
      initial_comment: comment,
      channel_id: channelID,
    });

    if (resp.ok) {
      console.log(`✅ Файл отправлен: ${filename}`);
    } else {
      console.error("Ошибка отправки файла:", resp.error);
    }
  } catch (err) {
    console.error("Ошибка при загрузке файла:", err.data || err);
  }
}

module.exports = { sendFile };
