// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const content = message.content.split(' ').slice(1).join(' ');
  const result = new Promise((resolve, reject) => resolve(eval(content)));
  
  return result.then(output => {
   if (typeof output !== 'string') output = require('util').inspect(output, {
   depth: 0
   });
   if (output.includes(client.token)) output = output.replace(client.token, 'No token');
  
   return message.channel.send(output, {code: 'js', split: true});
  }).catch(err => {
   err = err.toString();
  
   if (err.includes(client.token)) err = err.replace(client.token, 'no token');
  
   return message.channel.send(err, {code: 'js', split: true});
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
