const { DiscordAPIError, MessageEmbed } = require("discord.js")
const { set } = require("mongoose");
const fetch = require("node-fetch");

module.exports = {
    name: "SlapCommand",
    aliases: ["slap", "tapa"],

    run: async(client, message, args) => {
        if (!args[0]) {
            return message.delete()
        }

        let pessoaslap = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!pessoaslap) {
            return message.delete()
        };

        let Gif = await fetch(`https://waifu.pics/api/sfw/slap`).then(res => res.json());

        message.channel.send({
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
                .setDescription(`🖐 ${message.author} Acabou de dar um tapa em ${pessoaslap}`)
                .setImage(`${Gif.url}`)
            ]
        })
    }
}