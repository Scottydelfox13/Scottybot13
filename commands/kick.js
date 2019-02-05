exports.run = async (client, message, args, level) => {
    const user = message.mentions.users.first() || message.guild.members.get(args[0]); 
    const reason = args.slice(1).join(' ');

    if (!message.guild.me.hasPermission(['KICK_MEMBERS'])) return message.reply('Missing the required `kick members` permission!');
    
    if(!user) return message.reply("you must supply a user id or mention a user");
    if(user === message.author.id || user.id === message.author.id) return message.reply("dont kick urself idit");
    if (!message.guild.member(user).kickable ||  message.isMentioned("346419337021882368") || args[0] === '346419337021882368') 
    return message.reply('I cannot kick that member');

    if(!user.bot) { await user.send(`you were kicked from ${message.guild.name} with reason ${reason}`); }
    await message.guild.member(user).kick(reason);
    await message.channel.send(`kicked ${user} with reason ${reason}`);

};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: 'kick',
    category: "Moderation",
    description: 'kicks the mentioned user.',
    usage: 'kick [mention or userid] [reason]'
  };