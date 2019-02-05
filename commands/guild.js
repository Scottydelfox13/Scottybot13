exports.run = async (client, message, args, level) => {

  if(!message.flags[0]) return message.reply("must provide -create or -delete or -list or -invite");

switch (message.flags[0]) {
      
      case 'create': { 

 async function createGuild(client, message) {
  try {
    const guild = await client.user.createGuild('Example Guild', 'us-west');
    const dChan = guild.channels.find(channel => channel.name === "general");
    let invite = await dChan.createInvite().then(function(newInvite){
    message.author.send("https://discord.gg/" + newInvite.code);
  });
  } catch (e) {
    console.error(e);
  }
}
createGuild(client, message);
    }
break;

  
        
      case 'delete': {
    let delGuil = client.guilds.get(args[0]);
// Delete a guild
delGuil.delete()
  .then(g => console.log(`Deleted the guild ${g}`));
message.channel.send(`delet achieved`).catch(console.error);
  } 
break;

case 'list': { 

  
  const list = client.guilds.map(g => g.name + ": " + g.id + " | " + g.memberCount).join('\n');
  message.channel.send({embed: {
    title: `Server name: Server ID | Server member count`,
    description: `${list}`,
    footer: {
      text: `${client.guilds.size} servers.`
    }
  
  }});
}
break;
case 'invite': { 
  let guild = client.guilds.get(args[0]);
  if(!guild) return message.reply("must provide a guild ID");
  let invite = client.guilds.get(guild.id).channels.find(c => c.type === "text").createInvite({maxAge: 0}).then(function(newInvite){
    message.channel.send(`invite link to ${guild.name}: https://discord.gg/` + newInvite.code); });



}
break;
}


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "guild",
  category: "System",
  description: "create or delete a guild *will be deleted when bot becomes too big to make guilds*",
  usage: "guild <create/delete/invite/list> <guild id when using delete/invite>"
};
