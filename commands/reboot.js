exports.run = async (client, message, args, level) => {
  await message.reply("Bot is shutting down.");
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  await message.reply("Bot has started back up!");
  process.exit(1);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart", "reset"],
  permLevel: "Bot Support"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
