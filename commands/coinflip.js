exports.run = async (client, message, args) => {
let coinmessage = await message.channel.send("Flipping a coin...");

var myArray = [
"Heads",
"Tails"
];


await client.wait(1000);
coinmessage.edit(`The coin landed on ${myArray.random()}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "coinflip",
  category: "miscellaneous",
  description: "flips a coin",
  usage: "coinflip"
};
