exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
if(message.mentions.members.first()) {
  let member = message.mentions.members.first();
const mentionedMemberPerms = client.permlevel({
  member: message.mentions.members.first(),
  author: message.mentions.users.first(),
  guild: message.guild,
  settings: message.settings,
  client: message.client,
  channel: message.channel
});
message.channel.send(`${member.displayName}'s permission level is: ${mentionedMemberPerms} - ${client.config.permLevels.find(l => l.level === mentionedMemberPerms).name}`);
} else {
  message.reply(`Your permission level is: ${level} - ${friendly}`);
}
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "miscellaneous",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel [user mention]"
};
