exports.run = async (client, message, args, level) => {
  const user = message.mentions.users.first();
  
  const messagecount = !user ? ( parseInt(args.join(' '))) : ( parseInt(args.slice(1).join(' ')));

  if (!message.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.reply('i am Missing the required `manage messages` permission!');
  
  
  if(!messagecount) return message.reply("you must specify a number of messages to delet");

  if(messagecount > 100) return message.reply("can only purge up to 100 messages stupid");


if(user) {
await message.delete();
message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages.filter(m => m.author.id === user.id)));
} else {


await message.delete();
message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
}


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["clean", "clear"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Purges X amount of messages from a given channel. (max 100)",
  usage: "purge <number>"
};
