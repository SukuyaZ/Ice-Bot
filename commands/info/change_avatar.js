module.exports = {
    name: "change_avatar",
    category: "utils",
    run: async (client, message, args) => {
        var image = message.attachments.first().url;
        client.user.setAvatar(image);
        message.reply("You have changed the Avatar")
    }
}