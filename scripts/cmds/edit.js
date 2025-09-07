const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const OWNER_UID = "61557991443492"; // Owner UID
const VIP_PATH = path.join(__dirname, "cache", "vip.json");

module.exports = {
  config: {
    name: "edit",
    aliases: ["e"],
    version: "1.0",
    author: "Hasib",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Edit image using prompt" },
    longDescription: { en: "Edit an uploaded image based on your prompt." },
    category: "image",
    guide: { en: "{p}edit [prompt] (reply to image)" }
  },

  onStart: async function ({ api, event, args, message }) {
    // --- VIP check ---
    if (!fs.existsSync(VIP_PATH)) fs.writeFileSync(VIP_PATH, JSON.stringify([]));
    let vipData = JSON.parse(fs.readFileSync(VIP_PATH));
    const now = Date.now();
    vipData = vipData.filter(u => u.expire > now);
    fs.writeFileSync(VIP_PATH, JSON.stringify(vipData, null, 2));

    const isOwner = event.senderID === OWNER_UID;
    const isVIP = vipData.some(u => u.uid === event.senderID && u.expire > now);

    if (!isVIP && !isOwner) return message.reply("⚠️ | You need VIP access to use this command!");

    // --- Main logic ---
    const prompt = args.join(" ");
    const repliedImage = event.messageReply?.attachments?.[0];

    if (!prompt || !repliedImage || repliedImage.type !== "photo") {
      return message.reply("⚠️ | Please reply to a photo with your prompt to edit it.");
    }

    const imgPath = path.join(__dirname, "cache", `${Date.now()}_edit.jpg`);
    const waitMsg = await message.reply(`Editing image for: "${prompt}"...\nPlease wait...`);

    try {
      const imgURL = repliedImage.url;
      const imageUrl = `https://edit-and-gen.onrender.com/gen?prompt=${encodeURIComponent(prompt)}&image=${encodeURIComponent(imgURL)}`;
      const res = await axios.get(imageUrl, { responseType: "arraybuffer" });

      await fs.ensureDir(path.dirname(imgPath));
      await fs.writeFile(imgPath, Buffer.from(res.data, "binary"));

      await message.reply({
        body: `✅ | Edited image for: "${prompt}"`,
        attachment: fs.createReadStream(imgPath)
      });
    } catch (err) {
      console.error("EDIT Error:", err);
      message.reply("❌ | Failed to edit image. Please try again later.");
    } finally {
      await fs.remove(imgPath);
      api.unsendMessage(waitMsg.messageID);
    }
  }
};
