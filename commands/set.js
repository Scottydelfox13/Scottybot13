exports.run = async (client, message, args, level) => {

  const action = args[0];
  const key = args[1];
  const newValue = args.slice(2);

  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const defaults = client.config.defaultSettings;
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  // Edit an existing key value
  if (action === "edit") {
    // User must specify a key.
    if (!key) return message.reply("Please specify a key to edit. if you need help please ask in our support server https://discord.gg/8XqZ72w");
    // User must specify a key that actually exists!
    if (!defaults[key]) return message.reply("This key does not exist in the settings. if you need help please ask in our support server https://discord.gg/8XqZ72w");
    const joinedValue = newValue.join(" ");
    // User must specify a value to change.
    if (joinedValue.length < 1) return message.reply("Please specify a new value. if you need help please ask in our support server https://discord.gg/8XqZ72w");
    // User must specify a different value than the current one.
    if (joinedValue === settings[key].value) return message.reply("This setting already has that value!");

    if(key === 'prefix' && joinedValue.length > 7) return message.reply("maximum length for this setting is 7");

    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    if (defaults[key].type === "channel") {
      let chaan = message.guild.channels.find(c => c.name === joinedValue) || message.guild.channels.get(joinedValue) || message.mentions.channels.first();
      if (!chaan) return message.reply("invalid channel!\nPlease provide a channel mention, channel id, or channel name");
      if (!chaan.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return message.reply("i cannot send messages in that channel!");
      client.settings.set(message.guild.id, {
        value: `${chaan.name}`,
        type: "channel"
      }, key);
      message.reply(`${key} successfully edited to ${chaan.name}`);
    } else if (defaults[key].type === "role") {
      let rolE = message.guild.roles.find(r => r.name === joinedValue) || message.guild.roles.get(joinedValue) || message.mentions.roles.first();
      if (!rolE) return message.reply("invalid role!\nPlease provide a role mention, role id, or role name");
      client.settings.set(message.guild.id, {
        value: `${rolE.name}`,
        type: "role"
      }, key);
      message.reply(`${key} successfully edited to ${rolE.name}`);
    } else if (defaults[key].type === "channel" && defaults[key].hasOwnProperty('enabled')) {
      let chaan = message.guild.channels.find(c => c.name === joinedValue) || message.guild.channels.get(joinedValue) || message.mentions.channels.first();
      if (!chaan) return message.reply("invalid channel!\nPlease provide a channel mention, channel id, or channel name");
      if (!chaan.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return message.reply("i cannot send messages in that channel!");
      client.settings.set(message.guild.id, {
        value: `${chaan.name}`,
        type: "channel",
        enabled: true
      }, key);
      message.reply(`${key} successfully edited to ${chaan.name}`);
    } else if (defaults[key].type === "role" && defaults[key].hasOwnProperty('enabled')) {
      let rolE = message.guild.roles.find(r => r.name === joinedValue) || message.guild.roles.get(joinedValue) || message.mentions.roles.first();
      if (!rolE) return message.reply("invalid role!\nPlease provide a role mention, role id, or role name");
      client.settings.set(message.guild.id, {
        value: `${rolE.name}`,
        type: "role",
        enabled: true
      }, key);
      message.reply(`${key} successfully edited to ${rolE.name}`);
    } else if (defaults[key].hasOwnProperty('enabled')) {
      client.settings.set(message.guild.id, {
        value: `${joinedValue}`,
        enabled: true
      }, key);
      message.reply(`${key} successfully edited to ${joinedValue}`);
    } else {
      client.settings.set(message.guild.id, {
        value: `${joinedValue}`
      }, key);
      message.reply(`${key} successfully edited to ${joinedValue}`);
    }
  } else

    // Resets a key to the default value
    if (action === "del" || action === "reset") {
      if (!key) return message.reply("Please specify a key to reset.");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
      if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");

      // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
      const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response.toLowerCase())) {
        // We delete the `key` here.
        client.settings.delete(message.guild.id, key);
        message.reply(`${key} was successfully reset to default.`);
      } else
        // If they respond with n or no, we inform them that the action has been cancelled.
        if (["n", "no", "cancel"].includes(response)) {
          message.reply(`Your setting for \`${key}\` remains at \`${settings[key].value}\``);
        }
    } else

  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply(`The value of ${key} is currently \`${settings[key].value}\`${isDefault}`);
  } else if (action === "disable") {

    if (!key) return message.reply("Please specify a key to view");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    if (!defaults[key].hasOwnProperty('enabled')) return message.reply("this setting can not be disabled!");
    if (!settings[key].enabled) return message.reply("This setting is already disabled");
    let currentsetting = "";
    if (overrides[key]) {
      currentsetting = overrides[key].value;
    } else {
      currentsetting = defaults[key].value;
    }
    if (defaults[key].type === "channel") {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        type: "channel",
        enabled: false
      }, key);
      message.reply(`${key} has been disabled`);
    } else if (defaults[key].type === "role") {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        type: "role",
        enabled: false
      }, key);
      message.reply(`${key} has been disabled`);
    } else {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        enabled: false
      }, key);
      message.reply(`${key} successfully disabled!`);
    }

  } else if (action === "enable") {
    if (!key) return message.reply("Please specify a key to view");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    if (!defaults[key].hasOwnProperty('enabled')) return message.reply("this setting can not be enabled!");
    if (settings[key].enabled) return message.reply("This setting is already enabled");
    let currentsetting = "";
    if (overrides[key]) {
      currentsetting = overrides[key].value;
    } else {
      currentsetting = defaults[key].value;
    }

    if (defaults[key].type === "channel") {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        type: "channel",
        enabled: true
      }, key);
      message.reply(`${key} has been enabled`);
    } else if (defaults[key].type === "role") {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        type: "role",
        enabled: true
      }, key);
      message.reply(`${key} has been enabled`);
    } else {
      client.settings.set(message.guild.id, {
        value: `${currentsetting}`,
        enabled: true
      }, key);
      message.reply(`${key} successfully enabled!`);
    }
  } else {
    // Otherwise, the default action is to return the whole configuration;
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      let enabled = "";
      if (defaults[key].hasOwnProperty('enabled')) {
        if (value.enabled) {
          enabled = `, ENABLED`;
        } else {
          enabled = ", DISABLED";
        }
      }
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value.value}${enabled} `);
    });
    await message.channel.send(`= Current Guild Settings =\n${array.join("\n")}`, {
      code: "asciidoc"
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings"],
  permLevel: "Administrator"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit/enable/disable> <key> <value>"
};