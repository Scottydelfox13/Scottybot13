module.exports = async client => {
  // Log that the bot is online.
  client.logger.event(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);


  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${client.config.defaultSettings.prefix}help | ${client.guilds.size} Servers`);  

};
