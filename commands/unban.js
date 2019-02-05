exports.run = async (client, message, args) => {
 try {
    
  let reason = args.slice(1).join(' ');


  let user = args[0];

  if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply('Missing the required `Ban members` permission!');
  
  if (!user) return message.reply('You must supply a username or user id.');
message.guild.fetchBans()
.then(bans => {
      var member = bans.get(user);

      if (!member) {message.channel.send('that user isn\'t a user or isnt banned');
    } else {
      message.guild.unban(member, reason);
        message.channel.send(`${member} is unbanned with reason ${reason}`);
    }
});

 
  

     


} catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }


};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };

  exports.help = {
    name: 'unban',
    category: "Moderation",
    description: 'Unbans the mentioned user.',
    usage: 'unban [username or userid] [reason]'
  };