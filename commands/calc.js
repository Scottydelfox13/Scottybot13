exports.run = async (client, message, args, level) => {


var happycalculator = require('happycalculator');
var formula = args.slice(0).join(' ');
if(!formula || !args) return message.reply("you must provide a formula to calculate")


let response = await happycalculator.calculate(formula);

message.channel.send(`The answer is \`${response}\``);

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["calculate"],
  permLevel: "User"
};

exports.help = {
  name: "calc",
  category: "miscellaneous",
  description: "does simple math equations/expressions.",
  usage: "calc [stuff to be calculated]"
};