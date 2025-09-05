module.exports = {
  config: {
    name: "goiadmin",
    author: "𝗔𝗺𝗶𝗻𝘂𝗹 𝗦𝗼𝗿𝗱𝗮𝗿",
    role: 0,
    shortDescription: " ",
    longDescription: "",
    category: "BOT",
    guide: "{pn}"
  },

  onChat: function({ api, event }) {
    const owners = ["61557991443492", "61576296543095"]; // both owners

    // Ignore if the sender is an owner
    if (!owners.includes(event.senderID)) {

      // Check if any owner is mentioned
      const mentions = event.mentions ? Object.keys(event.mentions) : [];
      const mentionedOwners = mentions.filter(id => owners.includes(id));

      if (mentionedOwners.length > 0) {
        const msg = [
          "If you mention my Owner again, I will punch you! 😾👊🏻",
          "Stop tagging my Owner without reason! 😒",
          "My Owner is busy. Do not mention them now!",
          "Don't dare mention my Owner again, or you'll regret it! 💀",
          "One more mention and you'll face serious consequences! 😠",
          "Keep tagging my Owner and you'll be blocked permanently! 🔒",
          "Touch my Owner with words and feel my wrath! ⚡",
          "Last warning! Stop tagging my Owner or face the fury! 🔥"
        ];
        return api.sendMessage({
          body: msg[Math.floor(Math.random() * msg.length)]
        }, event.threadID, event.messageID);
      }
    }
  },

  onStart: async function({}) {}
};
