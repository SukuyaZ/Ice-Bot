const Discord = require("discord.js")

module.exports = {
    name: "shutdown",
    description: "shuts down the bot!",
    category: "owner",
    accessableby: "Bot Owner",
    aliases: ["botstop"],
    run: async(client, message, args) => {
        if(message.author.id != "466778567905116170") return message.channel.send("You're the bot the owner!")

        try {
            await message.channel.send("Bot is shutting down...")
            process.exit()
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    


}
    }