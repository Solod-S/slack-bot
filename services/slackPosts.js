const { web } = require("./slackMessages");
const { channelID } = require("../config/slackConfig");

// Отправка поста с блоками и буферами (в реплаях файлы)
async function sendBuffersAsPost(content, buffers) {
  try {
    const blocks = [
      {
        type: "image",
        image_url: content.bannerUrl,
        alt_text: "Банер статті",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${content.title}*\n\n${content.shortDescription}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📖 Доступні версії статті:\n• <${content.uaLink}|🇺🇦 Українська версія>\n• <${content.enLink}|🌐 English version>`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `💡 ${content.callToAction}`,
          },
        ],
      },
    ];

    // Основной пост
    const mainMessage = await web.chat.postMessage({
      channel: channelID,
      text: content.title,
      blocks,
      unfurl_links: false,
      unfurl_media: false,
    });

    const thread_ts = mainMessage.ts;

    // Загружаем изображения в тред
    for (let i = 0; i < buffers.length; i++) {
      const resp = await web.files.uploadV2({
        file: buffers[i].buffer,
        filename: `image_${Date.now()}_${i}.png`,
        channel_id: channelID,
        thread_ts,
      });

      if (!resp.ok) {
        console.error("❌ Ошибка загрузки файла:", resp.error);
      }
    }

    console.log("✅ Пост с буферами и изображениями в реплаях отправлен");
  } catch (err) {
    console.error("Ошибка в sendBuffersAsPost:", err.data || err);
  }
}

module.exports = { sendBuffersAsPost };
