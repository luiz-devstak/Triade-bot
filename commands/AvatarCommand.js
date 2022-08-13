const { Discord, MessageEmbed, png } = require("discord.js")

module.exports = {
    name: "AvatarCommand", // Coloque o nome do arquivo
    aliases: ["avatar", "av"], // Coloque os sinonimos do comando

    run: async(client, message, args) => {
        if (!args[0]) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("#ff000d")
                    .setTimestamp()
                    .setAuthor({
                        name: message.author.username,
                        iconURL: message.author.displayAvatarURL({ dynamic: true }),
                    })        
                    .setFooter({
                        text: `${message.author.username}`,
                        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
                    })
                    .setDescription(`**Esse avatar pertence ao usuario:** ${message.author}`)        
                    .setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`)
                ]
            })
        } else {

        }
    }
}