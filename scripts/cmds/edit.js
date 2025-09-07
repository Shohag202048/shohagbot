const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");
const OWNER_UID = "61557991443492"; // Owner ID

// Special replies for the owner (randomized each time)
const ownerReplies = [
  "🙏 My Lord, thank you for blessing me with your command.\n🎨 I shall edit this image with your prompt: \"{prompt}\"",
  "👑 My Master, your wish is my command.\n✨ Allow me to craft your image with: \"{prompt}\"",
  "🤴 Hail the mighty Lord! I will transform this image with your sacred prompt: \"{prompt}\"",
  "🙇 At once, my Lord. I am editing this image with your request: \"{prompt}\"",
  "💎 My precious creator, thank you for using me.\n🖼️ Let me process this image with your given prompt: \"{prompt}\""
];

module.exports = {
  config: {
    name: "edit",
    aliases: ["e"],
    version: "1.3",
    author: "Hasib",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Edit image using prompt" },
    longDescription: { en: "Edit an uploaded image based on your prompt." },
    category: "image",
    guide: { en: "{p}edit [prompt] (reply to image)" }
  },

  onStart: async function ({ api, event, args, message }) {
    const prompt = args.join(" ");
    const repliedImage = event.messageReply?.attachments?.[0];

    // Validation
    if (!prompt) return message.reply("⚠️ | Please provide a prompt.");
    if (!repliedImage || repliedImage.type !== "photo") {
      return message.reply("⚠️ | Please reply to a photo with your prompt.");
    }

    const imgPath = path.join(CACHE_DIR, `${Date.now()}_edit.jpg`);
    let waitMsg;

    try {
      await fs.ensureDir(CACHE_DIR);

      // Choose special reply if owner
      if (event.senderID === OWNER_UID) {
        const randomMsg = ownerReplies[Math.floor(Math.random() * ownerReplies.length)]
          .replace("{prompt}", prompt);
        waitMsg = await message.reply(`${randomMsg}\n⏳ Please wait...`);
      } else {
        waitMsg = await message.reply(
          `🎨 Editing image for: "${prompt}"...\n⏳ Please wait...`
        );
      }

      // Generate edited image
      const imgURL = repliedImage.url;
      const apiUrl = `https://edit-and-gen.onrender.com/gen?prompt=${encodeURIComponent(prompt)}&image=${encodeURIComponent(imgURL)}`;
      const res = await axios.get(apiUrl, { responseType: "arraybuffer" });

      await fs.writeFile(imgPath, Buffer.from(res.data, "binary"));

      await message.reply({
        body: `✅ | Edited image for: "${prompt}"`,
        attachment: fs.createReadStream(imgPath)
      });
    } catch (err) {
      console.error("EDIT Error:", err);
      message.reply("❌ | Failed to edit image. Please try again later.");
    } finally {
      if (waitMsg) api.unsendMessage(waitMsg.messageID);
      if (await fs.pathExists(imgPath)) await fs.remove(imgPath);
    }
  }
};
