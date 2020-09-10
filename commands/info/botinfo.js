const os = require('os')
const ms = require("ms")
const Discord = require("discord.js")
module.exports = {
  name: "botinfo",
  category: 'info',
  usage: "botinfo",
  description: "info about bot",
  run: async (client, message, args) => {
        const core = os.cpus()[0];
    const embed = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || 'BLUE')
      .addField('General', [
        `**❯ Client:** ${client.user.tag} (${client.user.id})`,
        `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
        `**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
        `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
        `**❯ Creation Date:** ${client.user.createdTimestamp}`,
        `**❯ Node.js:** ${process.version}`,
        '\u200b'
      ])
      .addField('System', [
        `**❯ Platform:** ${process.platform}`,
        `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Speed: ${core.speed}MHz`,
        
      ])
      .setTimestamp();

    message.channel.send(embed);
  }
}