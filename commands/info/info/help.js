const { Message, Client, MessageEmbed, GuildManager } = require("discord.js");
const { set } = require("mongoose");

module.exports = {
    name: "help",
    aliases: ['help'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const dono = await message.guild.fetchOwner()
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setTitle(`📋 **| Minhas informações ! **`)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL(),
                    })
                    .addFields(
                        { name: `👦 **Minha tag do discord:**`, value: `\`${client.user.tag}\``, inline: false },
                        { name: `👨‍💻 **Meu id do discord:**`, value: `\`${client.user.id}\``, inline: false },
                        { name: `👷‍♂️ **Meu desenvolvedor:**`, value: `${dono}`, inline: false },
                        { name: `🌆 **Meu avatar do discord:**`, value: `${client.user}`, inline: false },
                    )
                    .setDescription("💸 **Meu prefix: \`\`t!\`\`**", { inline: true })
                    .setAuthor({
                        name: `${message.author.tag}`,
                        iconURL: `${message.author.displayAvatarURL()}`,
                    })
                    .setImage(client.user.displayAvatarURL({ dynamic: true })),

            ]
        });
    },
};
