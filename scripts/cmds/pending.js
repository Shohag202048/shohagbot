module.exports = {
  config: {
    name: "pending",
    aliases: ['pend', 'pen', 'approval', 'pendinglist'],
    version: "1.1",
    author: "Hasib",
    countDown: 3,
    prefix: false,
    role: 2,
    shortDescription: {
      en: "manage pending group requests"
    },
    longDescription: {
      en: "Approve or reject pending group requests in spam list or unapproved groups"
    },
    category: "admin",
    guide: {
      en: "{pn}pending - view pending list\n{pn}pending approve <numbers> - approve selected groups\n{pn}pending cancel <numbers> - reject selected groups"

    }

  },

  langs: {

    en: {

      invalidNumber: "❍ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗜𝗻𝗽𝘂𝘁\n━━━━━━━━━━━━━━\n\n» %1 ɪꜱ ɴᴏᴛ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ. ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ɴᴜᴍʙᴇʀꜱ ᴏɴʟʏ 😶‍🌫️🎀",
      cancelSuccess: "❍ 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗖𝗮𝗻𝗰𝗲𝗹𝗹𝗲𝗱\n━━━━━━━━━━━━━━\n\n» ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ʀᴇᴊᴇᴄᴛᴇᴅ %1 ɢʀᴏᴜᴘ ʀᴇQᴜᴇꜱᴛ(ꜱ) 🥹🎀",
      approveSuccess: "❍ 𝗚𝗿𝗼𝘂𝗽 𝗔𝗽𝗽𝗿𝗼𝘃𝗲𝗱\n━━━━━━━━━━━━━━\n\n» ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴀᴘᴘʀᴏᴠᴇᴅ [ %1 ] ɢʀᴏᴜᴘ(ꜱ) 😌🎀",
      cantGetPendingList: "❍ 𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━━━━━\n\n» ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ᴘᴇɴᴅɪɴɢ ʟɪꜱᴛ. ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ 😶‍🌫️🎀",
      returnListPending: "❍ 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗚𝗿𝗼𝘂𝗽𝘀 (%1)\n━━━━━━━━━━━━━━\n\n%2\n\n» ʀᴇᴘʟʏ ᴡɪᴛʜ:\n» 'ᴀᴘᴘʀᴏᴠᴇ <ɴᴜᴍʙᴇʀꜱ>' ᴛᴏ ᴀᴘᴘʀᴏᴠᴇ\n» 'ᴄᴀɴᴄᴇʟ <ɴᴜᴍʙᴇʀꜱ>' ᴛᴏ ʀᴇᴊᴇᴄᴛ\n\nᴇxᴀᴍᴘʟᴇ:\n» ᴘᴇɴᴅɪɴɢ ᴀᴘᴘʀᴏᴠᴇ 1 2 3 🎀",
      returnListClean: "❍ 𝗡𝗼 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗚𝗿𝗼𝘂𝗽𝘀\n━━━━━━━━━━━━━━\n\n» ᴄᴜʀʀᴇɴᴛʟʏ ɴᴏ ɢʀᴏᴜᴘꜱ ɪɴ ᴘᴇɴᴅɪɴɢ ʟɪꜱᴛ 😶‍🌫️🎀",
      noSelection: "❍ 𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝗜𝗻𝗽𝘂𝘁\n━━━━━━━━━━━━━━\n\n» ᴘʟᴇᴀꜱᴇ ꜱᴘᴇᴄɪꜰʏ ᴡʜɪᴄʜ ɢʀᴏᴜᴘꜱ ᴛᴏ ᴘʀᴏᴄᴇꜱꜱ.\n» ᴇxᴀᴍᴘʟᴇ: ᴘᴇɴᴅɪɴɢ ᴀᴘᴘʀᴏᴠᴇ 1 2 3 🥹🎀",
      instruction: "❍ 𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀\n━━━━━━━━━━━━━━\n\n1. ᴠɪᴇᴡ ᴘᴇɴᴅɪɴɢ ɢʀᴏᴜᴘꜱ: '{pn}'\n2. ᴀᴘᴘʀᴏᴠᴇ: '{pn} ᴀᴘᴘʀᴏᴠᴇ <ɴᴜᴍʙᴇʀꜱ>'\n3. ʀᴇᴊᴇᴄᴛ: '{pn} ᴄᴀɴᴄᴇʟ <ɴᴜᴍʙᴇʀꜱ>'\n\nᴇxᴀᴍᴘʟᴇꜱ:\n» {pn} ᴀᴘᴘʀᴏᴠᴇ 1 2 3\n» {pn} ᴄᴀɴᴄᴇʟ 4 5 😌🎀"


    }

  },
  onStart: async function({ api, event, getLang, commandName, args }) {
    const input = event.body;
    const { threadID, messageID } = event;
    if (input && (
                input.trim().toLowerCase().includes('pending') || 
                input.trim().toLowerCase().includes('pend') || 
                input.trim().toLowerCase().includes('pen')))

    if (args[0]?.toLowerCase() === 'help') {
      return api.sendMessage(getLang("instruction").replace(/{pn}/g, commandName), threadID, messageID);

    }

    try {

      const [spam, pending] = await Promise.all([

        api.getThreadList(100, null, ["OTHER"]).catch(() => []),

        api.getThreadList(100, null, ["PENDING"]).catch(() => [])

      ]);
      const list = [...spam, ...pending]

        .filter(group => group.isSubscribed && group.isGroup)

        .map((group, index) => ({

          ...group,

          displayIndex: index + 1

        }));

      if (list.length === 0) {

        return api.sendMessage(getLang("returnListClean"), threadID, messageID);

      }
      const msg = list.map(group => 

        `╭───────────────\n` +

        `│ ${group.displayIndex}. ${group.name || 'Unnamed Group'}\n` +

        `│ 👀 Members: ${group.participantIDs.length}\n` +

        `│ 🎀 ID: ${group.threadID}\n` +

        `╰───────────────`

      ).join('\n\n');

      const replyMsg = await api.sendMessage(

        getLang("returnListPending", list.length, msg).replace(/{pn}/g, commandName),

        threadID,

        (err, info) => {

          if (!err) {

            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              pending: list
            });
          }
        },
        messageID

      );

      setTimeout(() => {

        if (global.GoatBot.onReply.has(replyMsg.messageID)) {
          global.GoatBot.onReply.delete(replyMsg.messageID);
        }
      }, 5 * 60 * 1000);

    } catch (error) {

      console.error(error);

      return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID);

    }

  },

  onReply: async function({ api, event, Reply, getLang, commandName }) {

    if (String(event.senderID) !== String(Reply.author)) return;

    const { body, threadID, messageID } = event;

    const args = body.trim().split(/\s+/);

    const action = args[0]?.toLowerCase();

    if (!action || (action !== 'approve' && action !== 'cancel')) {

      return api.sendMessage(

        getLang("noSelection").replace(/{pn}/g, commandName),

        threadID,

        messageID

      );

    }

    const numbers = args.slice(1).map(num => parseInt(num)).filter(num => !isNaN(num));
    if (numbers.length === 0) {

      return api.sendMessage(getLang("invalidNumber", "empty selection"), threadID, messageID);

    }
    const invalidNumbers = numbers.filter(num => num <= 0 || num > Reply.pending.length);

    if (invalidNumbers.length > 0) {

      return api.sendMessage(
        getLang("invalidNumber", invalidNumbers.join(', ')),
        threadID,
        messageID
      );
    }
    const selectedGro
