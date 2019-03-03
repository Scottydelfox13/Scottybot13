const Discord = require("discord.js");
module.exports = async (client, reaction, user) => {

      const message = reaction.message;
      if(!message.guild) return;
      const settings = client.getSettings(reaction.message.guild.id);
      if (reaction.emoji.name !== '⭐') return;
      if (!settings.starboardChannel.enabled) return;
      if(message.channel.nsfw) return message.channel.send("you cannot star messages in nsfw channels");
      if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);
      const starboardChannel = settings.starboardChannel.value;
      const starChannel = message.guild.channels.find(channel => channel.name === starboardChannel);
      if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`); 
      const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
      const stars = fetchedMessages.filter(m => m.embeds[0].type === 'rich').find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
      if (stars) {
        const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
        const foundStar = stars.embeds[0];
        const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
        const embed = new Discord.RichEmbed()
          .setColor(foundStar.color)
          .setDescription(foundStar.description)
          .setAuthor(message.author.tag, message.author.displayAvatarURL, message.url)
          .setThumbnail(message.author.displayAvatarURL)
          .setTimestamp()
          .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
          .setImage(image);
        const starMsg = await starChannel.fetchMessage(stars.id);
        await starMsg.edit(`⭐ ${parseInt(star[1])+1} <#${message.channel.id}>`,{ embed });
      }
      if (!stars) {
        const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
        if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
        const embed = new Discord.RichEmbed()
          .setColor(15844367)
          .setDescription(message.cleanContent)
          .setAuthor(message.author.tag, message.author.displayAvatarURL, message.url)
          .setThumbnail(message.author.displayAvatarURL)
          .setTimestamp(new Date())
          .setFooter(`⭐ 1 | ${message.id}`)
          .setImage(image);
        await starChannel.send(`⭐ 1 <#${message.channel.id}>`, { embed });
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
