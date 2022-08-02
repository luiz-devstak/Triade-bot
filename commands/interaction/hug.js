const { Discord, MessageEmbed } = require("discord.js")
const { set } = require("mongoose");
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    aliases: ["hug", "abraço", "abraçar"],

    run: async(client, message, args) => {
        if (!args[0]) {
            return message.delete()
        }

        let pessoahug = message.mentions.members.first() || message.guild.membres.get(args[0])

        if (!pessoahug) {
            return message.delete()
        }

        let Gif = await fetch(`https://waifu.pics/api/sfw/hug`).then(res => res.json());

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
                .setDescription(`🤗 ${message.author} Acabou de abraçar ${pessoahug}`)
                .setImage(`${Gif.url}`)
            ]
        })
    }
}