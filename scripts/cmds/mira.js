const axios = require("axios");
const apikey = 'rs_fwgsj9hi-57t2-tymm-8lst-6k';
const baseURL = "https://rasin-apis.onrender.com/api/rasin";
const teachURL = `${baseURL}/teach`;
const chatURL = `${baseURL}/jeba`;
const listURL = `${baseURL}/list?count=true&apikey=${apikey}`;

const conversationMemory = {};

const rasin = ["mira", "xuna", "janu", "xanu", "bot"];
const mira = [
  "Hae babe bolo ??",
  "Hae bolo suntechi ?",
  "Kisse tor ?",
  "Hae Xuna Bolo?",
  "oiiii jaan? Kotto miss korsi tmk",
  "Serious Prem korte chaile inbox"
];

const captions = [
  'Aj akta gf thakle amio couple pic ditam ?',
  'Hi bby serious rls korte chaile inbox',
  'Huh! Bot er abar prem ?',
  'যে বয়সে নেংটা হয়ে টায়ার দিয়ে খেলতাম আর এখন সেই বয়সে পোলাপান রাস্তায় Girlfriend নিয়ে ঘুরে | Technologiaa',
  'আহহা নারী কত্ত সুন্দর অভিনয় করে রে'
];

const randomCaption = () => captions[Math.floor(Math.random() * captions.length)];

module.exports = {
  config: {
    name: "mira",
    aliases: rasin,
    version: "2.0.0",
    author: "Tasbiul Islam Rasin",
    countDown: 1,
    role: 0,
    longDescription: { en: "Chat with Mira" },
    category: "Simsimi",
    guide: { en: "Say Mira <your_message>" }
  },

  onStart: async function ({ api, event, args, messageID, threadID, senderID }) {
    const raw = args.join(" ").trim();
    const key = `${threadID}_${senderID}`;

    if (!raw) {
      const reply = mira[Math.floor(Math.random() * mira.length)];
      return api.sendMessage(reply, threadID, (_, info) => {
        if (info) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: senderID
          });
        }
      }, messageID);
    }

    if (raw === "list") {
      try {
        const res = await axios.get(listURL);
        return api.sendMessage(res.data.status === "success" ? res.data.message : "❌", threadID, messageID);
      } catch {
        return api.sendMessage("❌ Couldn't fetch list.", threadID, messageID);
      }
    }

    if (raw === "teach") {
      return api.sendMessage(
        "✏ ?????:\n\nMira teach hi => hey, how are u, hello\n\n????????? ?? ?????",
        threadID,
        messageID
      );
    }

    if (raw.startsWith("teach ")) {
      const [phrase, replyText] = raw.substring(6).split("=>").map(p => p.trim());
      if (!phrase || !replyText) {
        return api.sendMessage("Usage: Mira teach <text> => <reply1, reply2...>", threadID, messageID);
      }

      const replies = replyText.split(",").map(r => r.trim());
      const teachReq = `${teachURL}?ask=${encodeURIComponent(phrase)}&reply=${encodeURIComponent(replies.join(","))}&apikey=${apikey}`;

      try {
        const res = await axios.get(teachReq);
        if (res.data.status === "error") {
          return api.sendMessage(res.data.message || "Failed to teach.", threadID, messageID);
        }

        return api.sendMessage(
          `✅ ???????????? ?????\n\nNᴇᴡ Tᴇᴀᴄʜ 【 ${res.data.new_teach} 】\nNᴇᴡ ?ᴇᴘʟʏ 【 ${res.data.new_reply} 】\n\n${randomCaption()}`,
          threadID,
          messageID
        );
      } catch (error) {
        if (error.response?.status === 403) {
          const data = error.response.data;
          return api.sendMessage(
            `${data.message || "? 18+ content is not allowed!"}\n\n${data.admin_message || ""}`,
            threadID,
            messageID
          );
        }

        console.error("Teach error:", error.message);
        return api.sendMessage("❌ Failed to teach. Try again later.", threadID, messageID);
      }
    }

    try {
      let url = `${chatURL}?msg=${encodeURIComponent(raw)}&apikey=${apikey}`;
      if (conversationMemory[key]) {
        url += `&prev=${encodeURIComponent(conversationMemory[key])}`;
      }

      const res = await axios.get(url);
      const reply = res.data.response || "Hi kaman asan ?";
      conversationMemory[key] = reply;

      return api.sendMessage(reply, threadID, (_, info) => {
        if (info) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: senderID
          });
        }
      }, messageID);
    } catch (err) {
      console.error("mira Start Error:", err.message);
      return api.sendMessage("❌ Something went wrong.", threadID, messageID);
    }
  },

  onChat: async function ({ api, event }) {
    const { body, threadID, senderID, messageID } = event;
    if (!body) return;

    const lower = body.toLowerCase().trim();
    const triggered = rasin.some(word => lower.startsWith(word));
    if (!triggered) return;

    const raw = lower.replace(new RegExp(`^(${rasin.join("|")})\\s*`, "i"), "").trim();
    if (!raw) {
      const reply = mira[Math.floor(Math.random() * mira.length)];
      return api.sendMessage(reply, threadID, (_, info) => {
        if (info) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: senderID
          });
        }
      }, messageID);
    }

    return module.exports.onStart({ api, event, args: [raw], messageID, threadID, senderID });
  },

  onReply: async function ({ api, event }) {
    const { threadID, senderID, messageID, body } = event;
    const msg = body?.trim();
    if (!msg) return;

    const key = `${threadID}_${senderID}`;
    try {
      let url = `${chatURL}?msg=${encodeURIComponent(msg)}&apikey=${apikey}`;
      if (conversationMemory[key]) {
        url += `&prev=${encodeURIComponent(conversationMemory[key])}`;
      }

      const res = await axios.get(url);
      const reply = res.data.response || "Hi kamon asen?";
      conversationMemory[key] = reply;

      return api.sendMessage(reply, threadID, (_, info) => {
        if (info) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: senderID
          });
        }
      }, messageID);
    } catch (err) {
      console.error("Error in Reply:", err.message);
      return api.sendMessage("❌ Error while replying.", threadID, messageID);
    }
  }
};
