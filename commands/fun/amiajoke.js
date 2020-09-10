const Discord = require('discord.js');
const AlexAPI = require('alexflipnote.js')
const AlexClient = new AlexAPI()

module.exports = {
	name: "amiajoke",
	description: "Am I a joke to you?",
	usage: "amiajoke",
	category: "fun",
	run: async (client, message, args) => {
	let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
	let link = await AlexClient.image.amiajoke({image: avatar})
	const embed = new Discord.MessageEmbed()
	.setColor("#ff9900")
	.setImage(link) 
	.setFooter(`© Ice Bot by Pinkalicious21902`);
	message.channel.send({embed});
	}
}