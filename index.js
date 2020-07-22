// Load up the discord.js library
const Discord = require("discord.js");
const ms = require('ms');
const moment = require('moment');
const os = require('os');

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

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
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
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  if(message.channel.type == "dm") {
    if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
      await message.channel.send(`Hello, ${message.author}. `) //what should happen on a dm
   }
   else if (message.content.startsWith("Help") || message.content.startsWith("help")){
    await message.channel.send("Idk if I can send you my help command. Try joining a server with me in it and using the help command!")
   }
   else{
    await message.channel.send("The only words I respond to are Hello and Help. I'll respond to more in the future.")
   }
 }
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
   const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
    const response = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(client.ws.ping)}ms\``);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.send(`You've been kicked for ${reason}`)
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    const embed = new Discord.MessageEmbed()
      .setAuthor("Kicked User")
      .setDescription(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`)
      .setFooter("Powered By Ice Bot")
      .setColor("BLUE")
    message.channel.send(embed);
    channel.send(embed)
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    const embed = new Discord.MessageEmbed()
      .setAuthor("Success!")
      .setFooter("Made by Ice Bot")
      .setColor("BLACK")
      .setDescription(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`)
    message.channel.send(embed);
    channel.send(embed)
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    message.reply(`Successfully purged ${deleteCount} messages`)
  }
  if (command === 'mute') {
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let guild = Discord.Guild
     let role = message.guild.roles.cache.find(r => r.name == 'Muted');
     if(!role) {
        try {
            role =  message.guild.createRole({
                name: 'Muted',
                permissions: []
            });

            message.guild.channels.cache.overridePermissions(role, {
              SEND_MESSAGES: false,
              SEND_TTS_MESSAGES: false,
              ADD_REACTIONS: false,
              MANAGE_MESSAGES: false,
            })
    
            
        } catch(e) {
            
        }
    }
  

    user.roles.add(role);
    const embed = new Discord.MessageEmbed()
      .setDescription(`Successfully muted ${user}.`)
      .setFooter("Made by Ice Bot")
      .setAuthor("Ice Bot")
    message.channel.send(embed);
    channel.send(embed)
  }
  if (command === "botinfo") {
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
  if (command === "unmute") {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    let guild = Discord.Guild
    let role = message.guild.roles.cache.find(r => r.name == 'Muted');
    user.roles.remove(role);
    const embed = new Discord.MessageEmbed()
      .setAuthor("User Muted")
      .setFooter("Made by Ice Bot")
      .setColor("GREEN")
      .setDescription(`Successfully unmuted ${user}.`)
    message.channel.send(embed);
  }
  if (command === "help") {
    var botcommands = ["help", " mute", " unmute", " purge", " ban", " kick", " say", " ping", " userinfo", " guildinfo", " dm", " warn", " report", " newadmin", " addrole", " removerole", " newrole"]
    message.channel.send(`My commands are: ${botcommands}`);
  }
  if (command === "uptime") {
    message.channel.send(`My uptime is \`${ms(client.uptime, { long: true })}\``);
  }
  if (command === "unban") {
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    let reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;
    let user = args[0];
    let modlog = client.channels.cache.get('728634462124113990');
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.members.unban(user);
    const embed = new Discord.MessageEmbed()
      .setAuthor("Unban Successful")
      .setDescription(`${user} was unbanned for ${reason}.`)
      .setFooter("Powered by Ice Bot")
      .setColor(0xE118D2)
    await message.channel.send(embed)
    await channel.send(embed)
  }
  if (command === "spam") {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    var thing = true
    var x = 0
    while (x < 15) {
      await message.channel.send(`Hello, <@!${user.user.id}>!!`)
      x++;
    }
  }
  if (command === "userinfo") {
    const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
    const userFlags = member.user.flags.toArray();
    const embed = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor(member.displayHexColor || 'BLUE')
      .addField('User', [
        `**❯ Username:** ${member.user.username}`,
        `**❯ Discriminator:** ${member.user.discriminator}`,
        `**❯ ID:** ${member.id}`,
        `**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
        `**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
        `**❯ Status:** ${member.user.presence.status}`,
        `**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
        `\u200b`
      ])
      .addField('Member', [
        `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
        `**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
        `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
        `**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
        `\u200b`
      ]);
    return message.channel.send(embed);

  }
  if (command === "guildinfo") {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;

    const embed = new Discord.MessageEmbed()
      .setDescription(`**Guild information for __${message.guild.name}__**`)
      .setColor('BLUE')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('General', [
        `**❯ Name:** ${message.guild.name}`,
        `**❯ ID:** ${message.guild.id}`,
        `**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
        `**❯ Region:** ${regions[message.guild.region]}`,
        `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
        `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
        `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
        `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
        '\u200b'
      ])
      .addField('Statistics', [
        `**❯ Role Count:** ${roles.length}`,
        `**❯ Emoji Count:** ${emojis.size}`,
        `**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
        `**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
        `**❯ Member Count:** ${message.guild.memberCount}`,
        `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
        `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
        `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
        `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
        `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
        '\u200b'
      ])
      .addField('Presence', [
        `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
        `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
        `**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
        `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
        '\u200b'
      ])
      .setTimestamp();
    message.channel.send(embed);
  }
  if (command === "dm") {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        `You did not mention a user, or you gave an invalid id`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("You did not specify your message");
    user.user
      .send(args.slice(1).join(" "))
      .catch(() => message.channel.send("That user could not be DMed!"))
      .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
  }
  if (command === "report") {
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?");

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member");

        if (!args[1])
            return message.channel.send("Please provide a reason for the report");
        
        const channel = message.guild.channels.cache.find(c => c.name === "reports")
            
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` channel");

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor("Reported member", rMember.user.avatarURL())
            .setDescription(`Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.author}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);

        await channel.send(embed)
  } 
  if (command === "newadmin") {
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    const role = message.guild.roles.cache.get("728634440481243177");
    /*console.log(role)*/
    await member.roles.add(role).catch(console.error);
    
    await message.channel.send(`Role ${role.name} added to ${member.user.tag}.`)
    await channel.send(`Added ${role.name} to ${member.user.tag}.`)
  }
  if (command === "warn") {
    let channel = message.guild.channels.cache.find(c => c.name === 'logs')
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    const role = message.guild.roles.cache.get("728634450941837383");
    await member.roles.add(role).catch(console.error);
    const embed = new Discord.MessageEmbed()
      .setColor("#ed099a")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
      .setAuthor("Warned member", member.user.avatarURL())
      .setDescription(`Member:** ${member} (${member.user.id})
            **> Warned by:** ${message.author}
            **> Warned in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);
    await channel.send(embed)
  }
  if (command === "removerole") {
  	let member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
  	let roleid = args.slice(1).join(' ');
  	let role = message.guild.roles.cache.find(r => r.name === roleid)
  	await member.roles.remove(role).catch(console.error)
  	await message.channel.send(`Role ${role} removed from ${member}.`)
  }
  if (command === "addrole") {
  	let member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
  	let roleid = args.slice(1).join(' ');
  	let role = message.guild.roles.cache.find(r => r.name === roleid)
  	if (!message.guild.roles.cache.some(role => role.name === roleid)){
      return await message.reply("Role not found! Try again.")
    }
    if (!member.roles.cache.some(role => role.name === 'Admins')) {
  		return await message.reply("This command is for admins only!")
  	}
  	await member.roles.add(role).catch(console.error)
  	await message.channel.send(`Role ${role} added to ${member}.`)
  }
  if (command === "newrole") {
    let roleid = args.slice(0).join(' ');
    message.guild.roles.create({
      data: {
      name: roleid,
      hoist: true,
      color: 'BLUE'}
      }
      )
    
    let channel = message.guild.channels.cache.find(c => c.name === "logs")    
    const embed = new Discord.MessageEmbed()
      .setColor("#ed099a")
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTitle("New Role Created")
      .setDescription(`Role Created:
            **> Created by:** ${message.author}
            **> Created in:** ${message.channel}
            `);
    await channel.send(embed)
    await message.channel.send(embed)
    }
  if (command === "eightball") {
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
    let embed = new Discord.MessageEmbed()
    .addField("Question", args)
    .addField("Answer", (res[Math.floor(Math.random() * res.length)]))
    .setColor('42c2f4')
    message.channel.send(embed)
    return console.log(`> 8ball command used by ${message.author.username}`);
  // Displays a message in the console if the command was used
  }
  if (command === "delrole") {
    let channel = message.guild.channels.cache.find(c => c.name === "logs")
    var deletename =  args.slice(0).join(' ');
    deletedrole = message.guild.roles.cache.find(role => role.name === deletename).delete();
    console.log(deletedrole)
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Role deleted successfully`)
      .setFooter("Powered by Ice Bot")
      .setColor("GREEN")
      .setDescription(`${message.author} deleted the role ${deletename}.`)
    await message.channel.send(embed)
    await channel.send(embed)
  }
  if (command === "avatar") {
    // Using Discord.js Master
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    const embed = new Discord.MessageEmbed()
      .setImage(user.user.displayAvatarURL())
      .setAuthor(`${user.user.username}'s Avatar`)
      .setFooter("Powered by Ice Bot")
      .setColor("BLUE")

    await message.channel.send(embed)
  }


});

client.login(config.token);