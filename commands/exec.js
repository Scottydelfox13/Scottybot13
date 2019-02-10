const { promisify } = require('util');
const cp = require('child_process');
const exec = promisify(cp.exec);

exports.run = async (client, message, args, level) => {
    try {
        const execute = await exec(args.join(' '));
        await message.channel.send(`\`\`\`\n${execute.stderr + execute.stdout}\n\`\`\``, {split: true});
    } catch (e) {
        message.channel.send(`Error: \`\`\`\n${e}\n\`\`\``, {split: true});
    }
}; 


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
  };
  
  exports.help = {
    name: "exec",
    category: "System",
    description: "executes a console command",
    usage: "exec [...code]"
  };
