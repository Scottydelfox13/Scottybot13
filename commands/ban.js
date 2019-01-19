exports.run = async (client, message, args, level) => {
        switch (message.flags[0]) {
      
      case 'id': {
        let user1 = args[0];
        let reason = args.slice(1).join(' ');
        
        if(!user1) return message.reply("must supply a user id when using -id");
        if(user1 === message.author.id) return message.reply("dont ban urself idit");
        try{
        await message.guild.ban(user1, { reason: reason });
        await message.channel.send(`banned <@${user}> with reason ${reason}`);
        } catch (err) {
        console.log(err);
        }
      
      }
      break;
    }
    
    
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first() || client.users.get(args[0]);
    
    if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply('Missing the required `Ban members` permission!');
    
    if (!user) return message.reply('You must mention someone or supply a user id to ban them.').catch(console.error);
    
    
    if(user === message.author.id || user.id === message.author.id) return message.reply("dont ban urself idit");
   

    if (!message.guild.member(user).bannable || message.isMentioned("476441815503863840") || args[0] === '476441815503863840') 
    return message.reply('I cannot ban that member');
    



    if(!user.bot) { await user.send(`you were banned from ${message.guild.name} with reason ${reason}`); }
    await message.guild.ban(user, { days: 1, reason: reason });
    await message.channel.send(`banned ${user} with reason ${reason}`);
    
    
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
    description: 'Bans the mentioned user. [optional flag -id if the user is not in the server]',
    usage: 'ban [-id <optional>] [mention or userid] [reason]'
  };
