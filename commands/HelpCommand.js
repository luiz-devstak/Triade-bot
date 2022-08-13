const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "HelpCommand",
    aliases: ['help'],

    run: async(client, message, args) => {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor("#ff000d")
                .setTimestamp()
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL(),
                })
                .setAuthor({
                    name: message.author.username,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setDescription(`
                    
                `)
            ]
        })   
    }
}