const Discord = require("discord.js");
const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });


exports.run = async (client, message, args, level) => {
    switch (message.flags[0]) { 
        case "info":
        default:
    const regex = /<:(\w+):(\d{17,19})>/;
    const str = `${args[0]}`;
    let m;
    
    const regex1 = /<a:(\w+):(\d{17,19})>/;


    if ((m = regex.exec(str)) !== null) {
        let emoteid = m[2];
        let emotename = m[1];
        const embed = new Discord.RichEmbed()
        .setColor(randomColor)
        .setThumbnail(`https://cdn.discordapp.com/emojis/${emoteid}.png?v=1`)
        .setAuthor(`${emotename} (${emoteid})`, `https://cdn.discordapp.com/emojis/${emoteid}.png?v=1`)
        .addField("Animated?", `No`, true)
        .addField("Usage", `\`\`\`${m[0]}\`\`\``);
       return message.channel.send({
            embed
          });
    } else if ((m = regex1.exec(str)) !== null) {
        let emoteid = m[2];
        let emotename = m[1];
        const embed = new Discord.RichEmbed()
        .setColor(randomColor)
        .setThumbnail(`https://cdn.discordapp.com/emojis/${emoteid}.gif?v=1`)
        .setAuthor(`${emotename} (${emoteid})`, `https://cdn.discordapp.com/emojis/${emoteid}.gif?v=1`)
        .addField("Animated?", `Yes`, true)
        .addField("Usage", `\`\`\`${m[0]}\`\`\``);
        
       return message.channel.send({
            embed
          });
    } else message.reply("invalid emoji! you must use a custom emoji");

          break;
      }
    


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji"],
  permLevel: "User"
};

exports.help = {
  name: "emote",
  category: "miscellaneous",
  description: "gives information about an emoji",
  usage: "emote [emoji]"
};
