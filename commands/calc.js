exports.run = async (client, message, args, level) => {

const math = require('mathjs');

var formula = args.slice(0).join(' ');
if(!formula || !args) return message.reply("you must provide a formula to calculate");

try {

const f = math.parse(formula);
const answer = math.simplify(f);

message.reply(`The answer is \`${answer.toString()}\` `);
} catch (err) {
  message.channel.send("an error occurred");
}

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
