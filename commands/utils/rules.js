const Discord = require("discord.js");
module.exports = {
    name: "serverrules",
    category: "utils",
    description: "Sends server rules",
    run: async (client, message, args) => {
        let guild = message.guild
        const rulesEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setTitle("Server Rules")
            .setColor("#0099ff")
            .setThumbnail(guild.iconURL())
            .setTimestamp()
            .setImage(message.author.displayAvatarURL())
            .addFields(
                { name: 'Rule 1: ', value: 'No Advertising without Permission' },
                { name: 'Rule 2: ', value: 'No @mentioning spam' },
                { name: 'Rule 3: ', value: 'No Piracy/hacks/hacked clients/account hacking/mods', inline: true },
                { name: 'Rule 4: ', value: 'No ```@everyone/@here``` mentioning without permission.', inline: true },
                { name: "Rule 5: ", value: "No finding loopholes in rules", inline: true },
                { name: "Rule 6: ", value: "Sending/Linking any harmful material such as viruses or harmware results in an immediate ban.", inline: true },
                { name: "Rule 7: ", value: "Do not post graphic pictures of minors (<18yo).", inline: true },
                { name: "Rule 8: ", value: "Staff/admins have final say in all disputes. Do NOT argue with punishments given. Doing so will result in a ban/kick.", inline: true }
            )
            await message.channel.send(rulesEmbed)
    }
}