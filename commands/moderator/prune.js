module.exports = {
    run: async(client, message, args) => {
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
    },

    aliases: ['purge'],
    name: "prune",
    category: "Moderator",
    usage: "prune <num of messages>",
    description: 'Deletes a number of messages from a user in a channel.'
}