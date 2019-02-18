const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`== STATISTICS ==

= SYSTEM STATS =
• Mem Usage      :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Discord.js     :: v${version}
• Node           :: ${process.version}
• Platform       :: ${process.platform}
• CPU Arch       :: ${process.arch}

= CLIENT STATS =
• Uptime         :: ${duration}
• Ping           :: ${Date.now() - message.createdTimestamp}ms

= USER STATS =
• Users          :: ${client.users.size.toLocaleString()}
• Servers        :: ${client.guilds.size.toLocaleString()}
• Emojis         :: ${client.emojis.size.toLocaleString()}
• Categories     :: ${client.channels.filter(e => e.type === "category").size.toLocaleString()}
• Text Channels  :: ${client.channels.filter(e => e.type === "text").size.toLocaleString()}
• Voice Channels :: ${client.channels.filter(e => e.type === "voice").size.toLocaleString()}
`
, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "miscellaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
