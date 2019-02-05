exports.run = async (client, message, args, level) => { 
  if(!message.flags[0]) return message.reply("must provide -add or -remove");
  
  switch (message.flags[0]) {
      // This would be 'role -add'.
      case 'add': {
        // Check if the message mentions a user.
        if (message.mentions.members.size === 0) return message.reply('Please mention a user to give the role to.');
        const member = message.mentions.members.first();
        // This is the name of the role. For example, if you do 'role -add @York#2400 The Idiot Himself', the name of the role would be 'The Idiot Himself'.
        const name = args.slice(1).join(' ');
        // Find the role on the guild.
        const role = message.guild.roles.find(r => r.name === name);
        // End the command if the bot cannot find the role on the server.
        if (!role) return message.reply('I can\'t seem to find that role.');
        try {
          await member.addRole(role);
          await message.channel.send(`I've added the ${name} role to ${member.displayName}.`);
        } catch (e) {
          console.log(e);
        }
        break;
      }
  
      case 'remove': {
        // Check if the message mentions a user.
        if (message.mentions.members.size === 0) return message.reply('Please mention a user to take the role from.');
        const member = message.mentions.members.first();
        // This is the name of the role. For example, if you do 'role -remove @York#2400 The Idiot Himself', the name of the role would be 'The Idiot Himself'.
        const name = args.slice(1).join(' ');
        // Find the role on the guild.
        const role = message.guild.roles.find(r => r.name === name);
        // End the command if the bot cannot find the role on the server.
        if (!role) return message.reply('I can\'t seem to find that role.');
        try {
          await member.removeRole(role);
          await message.channel.send(`I've removed the ${name} role from ${member.displayName}.`);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'Moderator'
  };
  
  exports.help = {
    name: 'role',
    category: 'Moderation',
    description: 'It can give or take a role to/from a user.',
    usage: 'role <-add|-remove> <role name>'
  };