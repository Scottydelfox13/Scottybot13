exports.run = (client, message, args, level) => { 
  if (!args || args.length < 1) return message.reply("github repo: https://github.com/Scottydelfox13/Scottybot13 <you can also send a command name>");
  const commandName = args[0];

  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
 const fs = require("fs"); 
  var rawFile = fs.readFileSync(`./commands/${commandName}.js`, 'utf8');
  rawFile = rawFile.toString();
  message.channel.send(rawFile, {split: true, code: 'js'});


};


exports.conf = {
  enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Support"
  };
  
  exports.help = {
    name: "code",
    category: "System",
    description: "fetches the code for a command",
    usage: "code [command]"
  };