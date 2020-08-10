const Discord = require("discord.js")
const botconfig = require("C:/Users/owenr/Desktop/Ice-Bot/config.json");
module.exports = {
    name: "reload",
    description: "reloads a bot command!",
    usage: "!reload",
    category: "owner",
    accessableby: "Bot Owner",
    aliases: ["creload"],
    run: async (client, message, args) => {

    if(message.author.id !== "466778567905116170") return message.channel.send("You're the bot the owner!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    
    delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
    client.commands.delete(commandName)
    const pull = require(`./${commandName}.js`)
    client.commands.set(commandName, pull)
    
    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)

}
}



