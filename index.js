const { WebClient } = require("@slack/web-api");
const fs = require("fs");
require("dotenv").config();

const token = process.env.SLACK_BOT_TOKEN;
const channelID = process.env.SLACK_CHANNEL_ID; // ID канала, например

const web = new WebClient(token);

// === Отправка простого сообщения ===
async function sendMessage(text) {
  try {
    await web.chat.postMessage({ channel: channelID, text });
    console.log(`✅ Сообщение отправлено: "${text}"`);
  } catch (err) {
    console.error("Ошибка отправки сообщения:", err.data || err);
  }
}

// === Отправка файла с комментарием ===
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
      console.log(`✅ Файл отправлен: ${filename} (коммент: "${comment}")`);
    } else {
      console.error("Ошибка отправки файла:", resp.error);
    }
  } catch (err) {
    console.error("Ошибка отправки файла:", err.data || err);
  }
}

// === Отправка нескольких файлов в нескольких сообщениях ===
async function sendMultipleFiles(filePaths, mainComment = "Файлы:") {
  // Создаём первый пост с комментарием
  const thread_ts = await sendMessage(mainComment);

  for (const filePath of filePaths) {
    // Отправляем каждый файл в один тред
    await sendFile(filePath, thread_ts);
  }
}

// === Отправка нескольких файлов в одном сообщении ===
async function sendImagesAsPost(urls, text = "Вот несколько фото:") {
  try {
    const blocks = [{ type: "section", text: { type: "mrkdwn", text } }];

    for (const url of urls) {
      blocks.push({ type: "image", image_url: url, alt_text: "Фото" });
    }

    await web.chat.postMessage({ channel: channelID, blocks });
    console.log("✅ Пост с несколькими фото отправлен");
  } catch (err) {
    console.error("Ошибка отправки поста с фото:", err.data || err);
  }
}

// === Примеры использования ===
// (async () => {
//   // Просто текст
//   await sendMessage("Привет! Это простое сообщение 🚀");

//   // Текст + фото
//   await sendFile("./test.png", "Сообщение вместе с фото");

//   // Только фото
//   await sendFile("./test.png");

//   // Несколько фото
//   const photos = ["./test.png", "./test2.png", "./test3.png"];
//   await sendMultipleFiles(photos, "Отправка нескольких фото");
// })();

// (async () => {
//   const urls = [
//     "https://mezha.net/wp-content/uploads/2025/09/08/notice-of-suspicion-for.webp",
//     "https://mezha.net/wp-content/uploads/2025/09/08/police-in-the-czech.webp",
//     "https://mezha.net/wp-content/uploads/2025/09/08/president-trump-is-expected.webp",
//   ];
//   await sendImagesAsPost(urls, "Несколько фото в одном сообщении!!!!");
// })();
