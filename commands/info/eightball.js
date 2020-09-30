const Discord = require("discord.js")
module.exports = {
  name: "eightball",
  usage: "eightball <question>",
  description: "Just a nice Magic 8 Ball",
  category: "info",
  run: async (client, message, args) => {
  var res = [
    "Yes",
    "No",
    "Maybe",
    "Unlikely",
    "Of course",
    "Ask again later",
    "Umm... No",
    "Sure why not",
    "It is decidedly so",
    "Very likely",
    "Probably",
    "Probably not"
  ]
  // Runs if user doesn't ask a question
  if(!args[0]){
    message.channel.send('Please ask a question.')
    return;
  }
  // Creates an ambed and picks a random answer from the answer array
    await message.channel.send("Question: " + args.toString())
    await message.channel.send("Answer: " + (res[Math.floor(Math.random() * res.length)]))
    return console.log(`> 8ball command used by ${message.author.username}`);
  // Displays a message in the console if the command was used
  }
}
