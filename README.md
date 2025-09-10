![Version](https://img.shields.io/badge/Version-1.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Runs with Node.js](https://img.shields.io/badge/Runs%20with-Node.js-43853d.svg?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Runs with Slack API](https://img.shields.io/badge/Slack-API-4A154B.svg?style=flat-square&logo=slack&logoColor=white)](https://api.slack.com/)
[![Runs with Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4.svg?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![Runs with dotenv](https://img.shields.io/badge/Env-dotenv-000.svg?style=flat-square&logo=dotenv&logoColor=white)](https://www.npmjs.com/package/dotenv)

# Slack Content Bot

![Slack Bot Banner](/assets/slack-bot-banner.png)

**Project Description:**

Slack Content Bot - is a modern Slack bot that helps automate content creation and publishing.
It supports image uploads, block-based message publishing, thread creation, and even obtaining a user token via OAuth for full access to the Slack API.

## ✨ Key Features

- **Message Posting:** sends simple text or formatted block messages.
- **File Uploads:** supports uploading documents, images, and other files to Slack channels.
- **Multiple Files:** sends multiple files either as a gallery or in a single thread.
- **Buffer Handling:** allows sending images directly from memory without saving to disk.
- **OAuth Support:** obtains a user token via a refresh token for performing advanced actions.

---

## 🛠 Main Technologies

- **Node.js** – a JavaScript runtime for server-side logic.
- **Slack Web API** – the official library for interacting with Slack.
- **Axios** – an HTTP client for making requests to Slack OAuth.
- **dotenv** – manages environment variables.
- **fs** – a module for working with the file system (uploading local files).

---

## 📂 Project Structure

```bash
slack-bot/
│── assets/                   # banners, icons
│── src/
│   ├── index.js              # entry point
│   ├── auth/
│   │   └── oauth.js          # logic for obtaining user token via refresh token
│   ├── services/
│   │   ├── messageService.js # functions for sending messages
│   │   ├── fileService.js    # uploading files to Slack
│   │   └── bufferService.js  # working with image buffers
│   └── utils/
│       └── logger.js         # logging utility
│── .env                      # environment variables (SLACK_BOT_TOKEN, CLIENT_ID...)
│── package.json
│── ABOUT.md                  # project description
```

## 🚀 How to Run

Prerequisites

- **Install Node.js**
- **Create a Slack App at** https://api.slack.com/apps
- **Add the required OAuth Scopes**:

```bash
chat:write
chat:write.public
files:read
files:write
incoming-webhook
remote_files:read
remote_files:write
```

## ⚙️ Install

````bash
git clone https://github.com/your-username/slack-bot.git
cd slack-bot
npm install
```bash
````

## 🔧 Configure

Create .env:

```bash
SLACK_BOT_TOKEN=xoxb-******\*\*******
SLACK_CHANNEL_ID=C1234567890
SLACK_USER_REFRESH_TOKEN=xoxe-******\*\*******
SLACK_CLIENT_ID=**\*\*\*\***
SLACK_CLIENT_SECRET=**\*\*\*\***
```

## ▶️ Run

```bash
node src/index.js
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or a pull request if you’d like to add new features or fix bugs.
