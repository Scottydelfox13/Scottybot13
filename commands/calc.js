exports.run = async (client, message, args, level) => {

const math = require('mathjs');


var formula = args.slice(0).join(' ');
if(!formula || !args) return message.reply("you must provide a formula to calculate");
try {
const f = math.parse(formula)
let simplified = math.simplify(f)

message.reply(`The answer is \`${simplified}\``, {split: true, disableEveryone: true});
} catch (err) {
  message.channel.send(`an error occurred ${err}`, {split: true, disableEveryone: true});
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
