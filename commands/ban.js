exports.run = async (client, message, args, level) => {
       
    
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first() || client.users.get(args[0]);
    if (!user) return message.reply('You must mention someone or supply a user id to ban them.');
    if (!user) user = await client.fetchUser(args[0]); 
   
    if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply('Missing the required `Ban members` permission!');
    
    if (!user) return message.reply('You must mention someone or supply a user id to ban them.').catch(console.error);
    
    
    if(user === message.author.id || user.id === message.author.id) return message.reply("dont ban urself idit");
   
  if(message.guild.member(user)) {
    if (!message.guild.member(user).bannable || message.isMentioned("476441815503863840") || args[0] === '476441815503863840') 
    return message.reply('I cannot ban that member');
    
    if (!user.bot) { await user.send(`you were banned from ${message.guild.name} with reason ${reason}`).catch(console.error); }
    }
  
 
// fuck you baltimore


           
    await message.guild.ban(user, { days: 1, reason: reason });
    message.channel.send(`banned ${user} with reason ${reason}`);
    
    
};
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: 'ban',
    category: "Moderation",
    description: 'Bans the mentioned user.',
    usage: 'ban [mention or userid] [reason]'
  };
