const fs = require("fs");
const { sendMessage } = require("./services/slackMessages");
const { sendFile } = require("./services/slackFiles");
const { sendBuffersAsPost } = require("./services/slackPosts");
const { getUserToken } = require("./services/slackAuth");

// Пример использования
(async () => {
  try {
    // await sendMessage("Hello Slack Bot! 🚀");

    // await sendFile("./assets/1.jpg", "🚀🚀");
    const buffers = [
      { buffer: fs.createReadStream("./assets/1.jpg") },
      { buffer: fs.createReadStream("./assets/2.jpg") },
      { buffer: fs.createReadStream("./assets/3.jpg") },
      { buffer: fs.createReadStream("./assets/4.jpg") },
      { buffer: fs.createReadStream("./assets/5.jpg") },
      { buffer: fs.createReadStream("./assets/6.jpg") },
      { buffer: fs.createReadStream("./assets/7.jpg") },
      { buffer: fs.createReadStream("./assets/8.jpg") },
      { buffer: fs.createReadStream("./assets/9.jpg") },
      { buffer: fs.createReadStream("./assets/10.jpg") },
    ];
    const postData = {
      title:
        "📰 Зеленський підтримує Трампа щодо енергетичних санкцій проти Росії",
      uaLink:
        "https://mezha.net/ua/bukvy/zelensky-supports-trump-s-energy-sanctions-on-russia-amid-global-tensions/",
      enLink:
        "https://mezha.net/eng/bukvy/zelensky-supports-trump-s-energy-sanctions-on-russia-amid-global-tensions/",
      bannerUrl:
        "https://mezha.net/wp-content/uploads/2025/09/09/the-president-of-ukraine.webp",
      shortDescription:
        "Президент України Зеленський підтримав позицію Трампа щодо розірвання енергетичних угод з Росією та закликав до повної відмови від російських енергоносіїв для посилення тиску на Путіна.",
      callToAction: "📌 Оберіть зображення в реплаях нижче 👇",
    };
    await sendBuffersAsPost(postData, buffers);

    const userToken = await getUserToken();
    console.log("🎫 User token:", userToken);
  } catch (err) {
    console.error("Error в index.js:", err);
  }
})();
