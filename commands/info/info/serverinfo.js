const { Message, Client, MessageEmbed } = require("discord.js");
const { set } = require("mongoose");

module.exports = {
    name: "serverinfo",
    aliases: ['svinfo', 'serverinfo'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setTitle(`⭕ **| Informações do servidor!**`)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL(),
                    })
                    .addFields(
                        { name: `🏠 **Nome do servidor!**`, value: `\`${message.guild.name}\``, inline: true },
                        { name: `👨‍💻 **ID do servidor!**`, value: `\`${message.guild.id}\``, inline: false },
                        { name: `🕒 **A data que o servidor foi criado!**`, value: `Server criado em: ${message.guild.joinedAt.getDate()} de ${meses[message.guild.joinedAt.getMonth()]}, ${message.guild.joinedAt.getFullYear()} às ${message.guild.joinedAt.getHours()}:${message.guild.joinedAt.getMinutes()}:${message.guild.joinedAt.getSeconds()}`, inline: false },
                        { name: `🌆 **Avatar do servidor!**`, value: `${message.author}`, inline: true },
                    )
                    .setAuthor({
                        name: `${message.author.username}`,
                        iconURL: `${message.author.displayAvatarURL()}`,
                    })
                    .setImage(message.guild.iconURL({ dynamic: true })),
            ]
        });
    },
};