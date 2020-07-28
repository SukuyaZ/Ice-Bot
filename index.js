// Load up the discord.js library
const Discord = require("discord.js");
const ms = require('ms');
const fs = require('fs');
const moment = require('moment');
const os = require('os');
const config2 = require('dotenv')
/*
 DISCORD.JS VERSION 12 CODE
*/
const flags = {
  DISCORD_EMPLOYEE: 'Discord Employee',
  DISCORD_PARTNER: 'Discord Partner',
  BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
  BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
  HYPESQUAD_EVENTS: 'HypeSquad Events',
  HOUSE_BRAVERY: 'House of Bravery',
  HOUSE_BRILLIANCE: 'House of Brilliance',
  HOUSE_BALANCE: 'House of Balance',
  EARLY_SUPPORTER: 'Early Supporter',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: 'Verified Bot',
  VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
const filterLevels = {
  DISABLED: 'Off',
  MEMBERS_WITHOUT_ROLES: 'No Role',
  ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '(╯°□°）╯︵ ┻━┻',
  VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
  brazil: 'Brazil',
  europe: 'Europe',
  hongkong: 'Hong Kong',
  india: 'India',
  japan: 'Japan',
  russia: 'Russia',
  singapore: 'Singapore',
  southafrica: 'South Africa',
  sydeny: 'Sydeny',
  'us-central': 'US Central',
  'us-east': 'US East',
  'us-west': 'US West',
  'us-south': 'US South'
};


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})



// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
const prefix = config.prefix

client.on("ready", () => {
  console.log(prefix)
  const activities_list = [
    "with the #help command.",
    "Minecraft",
    "I'm watching you",
    "helping pink fix his bots",
    "Terrabot is amazing",
    "Hello World!",
    "Not as Good as Ruby :(",
    "generating command ideas",
    "with the developers console",
    "with some code", 
    "with JavaScript"
    ];
     setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 20000); // Runs this every 20 seconds.
  // This event will run if the bot starts, and logs in, successfully.
  
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot || !message.content.startsWith(config.prefix)) return;
  
  if(message.channel.type == "dm") {
    if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
      await message.channel.send(`Hello, ${message.author}. `) //what should happen on a dm
   }
   else if (message.content.startsWith("Help") || message.content.startsWith("help")){
    await message.channel.send("Can't send help command in DM")
   }
   else if (message.content.includes("you suck") || message.content.includes("You Suck") || message.content.includes("You suck")) {
     message.channel.send("Be nice! <:sad:737024711535362079>")
   }
   else if (message.content.includes("Yay!") || message.content.includes("yay!")) {
     message.channel.send("Yay! Glad you're happy!")
   }
   else if (message.content.includes("You're awesome") || message.content.includes("you're awesome")) {
     message.channel.send("Why thank you! <:cheer:737026488301518958>")
   }
   else if (message.content.includes("your code") || message.content.includes("Your Code") || message.content.includes("Your code")) {
     message.channel.send("I'm not sending everything, but here is my help command: ", { files: ["./commands/info/help.js"] })
   }
   else{
    await message.channel.send("I do not respond to that phrase.")
   }
 }
 let blacklist = JSON.parse(fs.readFileSync("C:/Users/Owen Royaol/Desktop/IceBot/commands/moderator/blacklist.json", "utf8"));
 if (!blacklist[message.author.id]) {
  blacklist[message.author.id] = {state: false}
};

if (blacklist[message.author.id].state === true) return await message.reply("NOPE. YOU'RE BLACKLISTED");
 // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) {
        command.run(client, message, args);
    }
  // which is set in the configuration file.
  
  
});

client.login(config.token);