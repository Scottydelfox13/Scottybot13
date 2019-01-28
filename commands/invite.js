exports.run = (client, message, args, level) => {

message.reply("here is an invitation link to invite me, please also vote!\nhttps://discordbots.org/bot/518957742036221978");


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "System",
  description: "creates an invite link to invite the bot to your guild",
  usage: "invite"
};
