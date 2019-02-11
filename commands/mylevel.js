exports.run = async (client, message, args, level) => {

  const friendly = client.config.permLevels.find(l => l.level === level).name;
  if(!message.guild) return message.reply(`Your permission level is: ${level} - ${friendly}`);

  const user = message.mentions.members.first();
  const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());

  if(user && user.id === client.config.ownerID) return message.channel.send(`${user.displayName}'s permission level is: 10 - Bot Owner`);
  else if(user && client.config.admins.includes(user.id)) return message.channel.send(`${user.displayName}'s permission level is: 9 - Bot Admin`);
  else if(user && client.config.support.includes(user.id)) return message.channel.send(`${user.displayName}'s permission level is: 8 - Bot Support`);
  else if(user && message.guild.ownerID === user.id) return message.channel.send(`${user.displayName}'s permission level is: 4 - Server Owner`);
  else if(user && user.hasPermission('ADMINISTRATOR')) return message.channel.send(`${user.displayName}'s permission level is: 3 - Administrator`);
  else if(user && modRole && user.roles.has(modRole.id)) return message.channel.send(`${user.displayName}'s permission level is: 2 - Moderator`);
  else if(user) return message.channel.send(`${user.displayName}'s permission level is: 0 - User`);
  else return message.reply(`Your permission level is: ${level} - ${friendly}`);
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
