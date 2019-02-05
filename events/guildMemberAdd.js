// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.username).replace("{{userMention}}", `<@${member.user.id}>`);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  
try {
member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage)
} catch(err) {
console.log(err)
let warnChannel = member.guild.channels.find(channel => channel.type === "text" && channel.permissionsFor(member.guild.me).has("SEND_MESSAGES"))
member.guild.channels.get(warnChannel.id).send("You seem to have enabled welcome and leave messages, but I don’t have permissions to talk there or the channel is not set correctly! Please ask in our support server for help if you need it! https://discord.gg/HTuAE28")



}


};
