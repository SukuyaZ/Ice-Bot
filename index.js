// Load up the discord.js library
const Discord = require("discord.js");

/*
 DISCORD.JS VERSION 12 CODE
*/


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
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
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
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
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
    message.channel.send(`Successfully muted ${user}.`);
  }
  if (command === "unmute") {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    let guild = Discord.Guild
    let role = message.guild.roles.cache.find(r => r.name == 'Muted');
    user.roles.remove(role);
    message.channel.send(`Successfully unmuted ${user}.`);
  }
  if (command === "help") {
    var botcommands = ["help", " mute", " unmute", " purge", " ban", " kick", " say", " ping", " userinfo", " guildinfo", " dm", " warn", " report", " newadmin"]
    message.channel.send(`My commands are: ${botcommands}`);
  }
  if (command === "unban") {
    let reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;
    let user = args[0];
    let modlog = client.channels.cache.get('728634462124113990');
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.members.unban(user);
    await message.channel.send(`${user} was unbanned for ${reason}.`)
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
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    // var errorprevention = user.roles.map(r => `${r}`).join(' | ')
    await message.channel.send(`userinfo for ${user.user.tag}:\nID: ${user.user.id}\nName: ${user.user.username}\nStatus: ${user.user.presence.status}\nCreated At: ${user.user.createdAt}\nAvatar: ${user.user.avatarURL()}\nBot: ${user.user.bot}\nJoined this guild at: ${user.joinedAt}\nNick: ${user.nickname}\nLast Message: ${user.lastMessage}`)
  }
  if (command === "guildinfo") {
    let guild = Discord.Guild
    await message.channel.send(`guildinfo for: ${message.guild}\nName: ${message.guild.name}\nOwner: ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\nID: ${message.guild.id}\nTotal | Humans | Bots: ${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}\nAvatar: ${message.guild.iconURL()}\n# of Roles: ${message.guild.roles.cache.size}\nCreated At: ${message.channel.guild.createdAt}\nVerification: ${message.guild.verificationLevel}`)
  }
  if (command === "dm") {
    let text = args.slice(1).join(' ');
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    await member.send(text)
    await message.channel.send(`Message sent to ${member.user.username}`)
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
    const channel = message.guild.channels.cache.get("731213331033227397")
    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    const role = message.guild.roles.cache.get("728634440481243177");
    /*console.log(role)*/
    await member.roles.add(role).catch(console.error);
    
    await message.channel.send(`Role ${role.name} added to ${member.user.tag}.`)
    await channel.send(`Added ${role.name} to ${member.user.tag}.`)
  }
  if (command === "warn") {
    let channel = message.guild.channels.cache.get("731213331033227397")
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
  	if (!member.roles.cache.some(role => role.name === 'Admins')) {
  		return await message.reply("This command is for admins only!")
  	}
  	await member.roles.add(role).catch(console.error)
  	await message.channel.send(`Role ${role} added to ${member}.`)
  }
});

client.login(config.token);