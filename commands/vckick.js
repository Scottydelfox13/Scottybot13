exports.run = async (client, message, args, level) => { 
// Make sure the bot user has permissions to make channels and move members in the guild:
if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.reply('Missing the required `Manage Channels` and `Move Members` permissions.');

// Get the mentioned user/bot and check if they're in a voice channel:
const member = message.mentions.members.first() || message.guild.members.get(args[0]);
if (!member) return message.reply('You need to @mention a user/bot to kick from the voice channel.');
if (!member.voiceChannel) return message.reply('That user/bot isn\'t in a voice channel.');

// Now we make a temporary voice channel, move the user/bot into the channel, and delete it:
const temp_channel = await message.guild.createChannel(member.id, 'voice', [
  { id: message.guild.id,
    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
  { id: member.id,
    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
]);
await member.setVoiceChannel(temp_channel);

await temp_channel.delete();

// Finally, pass some user response to show it all worked out:
message.react('👌');
/* or just "message.reply", etc.. up to you! */
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "vckick",
    category: "Moderation",
    description: "kicks a user or bot from a voice channel.",
    usage: "vckick [user mention or id]"
  };
  
