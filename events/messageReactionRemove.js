const Discord = require("discord.js");
module.exports = async (client, reaction, user) => {
    
    const message = reaction.message;
    if(!message.guild) return;
    const settings = client.getSettings(message.guild.id);
    if (message.author.id === user.id) return;
    if (reaction.emoji.name !== '⭐') return;
    if (!settings.starboardChannel.enabled) return;
    if(message.channel.nsfw) return;
    const starboardChannel = settings.starboardChannel.value;
    const starChannel = message.guild.channels.find(channel => channel.name == starboardChannel);
    if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`); 
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
    const stars = fetchedMessages.filter(m => m.embeds[0].type === "rich").find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
      const embed = new Discord.RichEmbed()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setThumbnail(message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
      await starMsg.edit(`⭐ ${parseInt(star[1])-1} <#${message.channel.id}>`,{ embed });
      
    }
    };
  
    // Here we add the this.extension function to check if there's anything attached to the message.
   function extension(reaction, attachment) {
      const imageLink = attachment.split('.');
      const typeOfImage = imageLink[imageLink.length - 1];
      const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
      if (!image) return '';
      return attachment;
    }
