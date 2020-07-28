const Discord = require("discord.js");
const fs = require('fs');
module.exports = {
  name: "blacklist",
  usage: "blacklist <userid>",
  description: "blacklist a user from the bot!",
  category: "moderator",
  run: async (client, message, args) => {
    if (message.author.id !== '466778567905116170') return message.reply("This command can only be used by the owner... :facepalm:");
      //message.delete();
      let blacklist = JSON.parse(fs.readFileSync("C:/Users/Owen Royaol/Desktop/IceBot/commands/moderator/blacklist.json", "utf8"));
      let user = args[0];
      const amount = parseInt(user);
  
      if (isNaN(amount)) {
          return message.reply('Please enter a valid UserID');
      }
      if (!user) {
        return message.reply('You need to imput a User ID');
      }
  
      if (!blacklist[user]) {
          blacklist[user] = {
            id: user,
            state: true
          }
          message.reply(`<@${user}> is now Blacklisted!`);    
          fs.writeFile("C:/Users/Owen Royaol/Desktop/IceBot/commands/moderator/blacklist.json", JSON.stringify(blacklist), err => {
              if(err) throw err;
            });
  
      return;
      }
      if (blacklist[user].state === true) {
          message.reply("That user have already been blacklisted");
      return;
      };
}


}