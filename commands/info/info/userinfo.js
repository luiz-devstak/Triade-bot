const { Message, Client, MessageEmbed } = require("discord.js");
const { set } = require("mongoose");

module.exports = {
    name: "userinfo",
    aliases: ['userinfo'],
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
                    .setTitle(`📋 **| Suas informações do servidor **\`${message.guild.name}\`!`)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL(),
                    })
                    .addFields(
                        { name: `👦 **Sua tag do discord!**`, value: `\`${message.author.tag}\``, inline: true },
                        { name: `👨‍💻 **Seu id do discord!**`, value: `\`${message.author.id}\``, inline: false },
                        { name: `🕒 **A data que você entrou no servidor!**`, value: `Você entrou em: ${message.member.joinedAt.getDate()} de ${meses [message.member.joinedAt.getMonth()]}, ${message.member.joinedAt.getFullYear()} às ${message.member.joinedAt.getHours()}:${message.member.joinedAt.getMinutes()}`, inline: false },
                        { name: `🌆 **Seu avatar do discord!**`, value: `${message.author}`, inline: true },
                    )
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: `${message.author.displayAvatarURL()}`,
                    })
                    .setImage(message.author.displayAvatarURL({ dynamic: true })),
            ]
        });
    },
};