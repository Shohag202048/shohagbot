const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// Ensure cache folder exists
fs.ensureDirSync(path.join(__dirname, "cache"));

// List of allowed users (only they can use the command)
const allowedUsers = ["61557991443492", "61576296543095"];

// Function to get base API URL
const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json");
  return base.data.api;
};

// Bot configuration
const config = {
  name: "autodl",
  version: "2.0",
  author: "Hasib",
  credits: "Hasib",
  description: "Auto download video from TikTok, Facebook, Instagram, YouTube, and more",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  dependencies: {
    "fs-extra": "",
    "axios": "",
  },
};

// Function called on chat
const onChat = async ({ api, event }) => {
  const senderID = event.senderID;

  // Restrict access to allowed users only
  if (!allowedUsers.includes(senderID)) {
    return api.sendMessage(
      "❌ You are not authorized to use this command.",
      event.threadID,
      event.messageID
    );
  }

  const dipto = event.body || "";

  try {
    // URL matching pattern
    const urlPattern = /https?:\/\/(vt\.tiktok\.com|www\.tiktok\.com|www\.facebook\.com|www\.instagram\.com|youtu\.be|youtube\.com|x\.com|pin\.it|twitter\.com|vm\.tiktok\.com|fb\.watch)/;
    if (!urlPattern.test(dipto)) return;

    api.setMessageReaction("⌛", event.messageID, {}, true);
    const w = await api.sendMessage("Wait Bby <😘", event.threadID);

    // Fetch download info from API
    const response = await axios.get(`${await baseApiUrl()}/alldl?url=${encodeURIComponent(dipto)}`);
    const d = response.data;

    // Determine file extension
    const imageExts = [".jpg", ".png", ".jpeg"];
    const ex = imageExts.find(ext => d.result.includes(ext)) || ".mp4";
    const cp = ex === ".mp4" ? d.cp : "Here's your Photo <😘";

    // Save file to cache
    const filePath = path.join(__dirname, "cache", `media_${Date.now()}${ex}`);
    const fileData = await axios.get(d.result, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(fileData.data, "binary"));

    // Generate tiny URL (fallback to original link if API fails)
    let tinyLink;
    try {
      const tinyUrlResponse = await axios.get(`https://tinyurl.com/api-create.php?url=${d.result}`);
      tinyLink = tinyUrlResponse.data;
    } catch {
      tinyLink = d.result;
    }

    api.setMessageReaction("✅", event.messageID, {}, true);
    api.unsendMessage(w.messageID);

    // Send the file with caption and link
    await api.sendMessage(
      {
        body: `${cp}\n✅ | Link: ${tinyLink}`,
        attachment: fs.createReadStream(filePath),
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );
  } catch (err) {
    api.setMessageReaction("❌", event.messageID, {}, true);
    console.error(err);
    api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};

// Optional onStart function
const onStart = () => {
  console.log("AutoDL bot module loaded.");
};

// Export module
module.exports = {
  config,
  onChat,
  onStart,
  run: onStart,
  handleEvent: onChat,
};
