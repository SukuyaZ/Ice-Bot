// Load up the discord.js library
const Intents = require("discord.js");
const config = require("./config.json");
const ms = require('ms');
const Canvas = require('canvas');
const fs = require('fs')
const MusicClient = require('C:/Users/owenr/Desktop/Ice-Bot/src/struct/Client.js');
const { Collection } = require('discord.js');
const Discord = require("discord.js")
const client = new MusicClient({ ws: { intents: Intents.ALL }, token: config.token, prefix: config.prefix });
const path = require("path");
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

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})



// Here we load the config.json file that contains our token and our prefix values. 
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
    "Why am I here",
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
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'logs');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});
client.on("error", error => {
  console.error(`An error has occured: ${error}`)
});
client.once('reconnecting', () => {
  console.log('Reconnecting!');
 });
 client.once('disconnect', () => {
  console.log('Disconnect!');
 });
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  
    if(message.author.bot || !message.content.startsWith(config.prefix)) return;
  let blacklist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "commands/moderator/blacklist.json")));
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