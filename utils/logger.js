function logInfo(msg) {
  console.log("ℹ️ " + msg);
}

function logError(msg) {
  console.error("❌ " + msg);
}

function logSuccess(msg) {
  console.log("✅ " + msg);
}

module.exports = { logInfo, logError, logSuccess };
