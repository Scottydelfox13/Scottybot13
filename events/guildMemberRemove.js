
module.exports = async (client, member) => {
    // Load the guild's settings
    const settings = client.getSettings(member.guild.id);
  

    if (settings.welcomeEnabled !== "true") return;

    const leaveMessage = settings.leaveMessage.replace("{{user}}", member.user.username).replace("{{userMention}}", `<@${member.user.id}>`);
  
try {
    member.guild.channels.find(c => c.name === settings.welcomeChannel).send(leaveMessage)
  } catch(err) {
console.log(err);
let warnChannel = member.guild.channels.find(channel => channel.type === "text" && channel.permissionsFor(member.guild.me).has("SEND_MESSAGES"))
member.guild.channels.get(warnChannel.id).send("You seem to have enabled welcome and leave messages, but I don’t have permissions to talk there or the channel is not set correctly! Please ask in our support server for help if you need it! https://discord.gg/HTuAE28")

}


};
  
