const copypastas = require("C:/Users/owenr/Desktop/Ice-Bot/data/copypastas.json")
module.exports = {
    name: "copypasta",
    category: "fun",
    run: async (client, message, args) => {
        message.channel.send(`${copypastas[Math.floor(Math.random() * copypastas.length)]}`);
    }
}