const { Discord, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "marry",
    aliases: ["marry", "casar"],

    run: async (client, message, args) => {
        let usuario = await db.get(message.author.id);

        let buttonaceitar = new MessageButton()
            .setCustomId("Aceitar")
            .setStyle("SUCCESS")
            .setLabel("Aceitar")

        let buttonrecusar = new MessageButton()
            .setCustomId("Recusar")
            .setStyle("DANGER")
            .setLabel("Recusar")

        let row = new MessageActionRow()

        row.addComponents([buttonaceitar, buttonrecusar])

        if (usuario) {
            let casadocom = usuario.casado
            if (casadocom != null) {
                let msg = new MessageEmbed()
                    .setDescription(`${message.author} | Você esta solteiro, para pedir alguem em casamento use:\n \`t!casar [@pessoa]\``)
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
                message.channel.send({ embeds: [msg] })
            } else {
                let msg = new MessageEmbed()
                    .setDescription(`${message.author} | Você esta casado(a) com <@${casadocom}>`)
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
                message.channel.send({ embeds: [msg] })
            }
        } else {
            if (args[0]) {
                let pessoamention = message.mentions.members.first() || message.guild.members.get(args[0])

                if (pessoamention) {
                    let msg = new MessageEmbed()
                        .setDescription(`${message.author} pediu ${pessoamention} em casamento, clique no botão verde para aceitar ou clique no botão vermelho para recusar!`)
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
                    message.channel.send({ embeds: [msg], components: [row] })

                    const filter = i => i.user.id === pessoamention.id;

                    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000, max: 1 });

                    collector.on('collect', async i => {
                        if (i.customId === "Aceitar") {
                            db.set(message.author.id, { casado: pessoamention.id })
                            i.update({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("#ff000d")
                                        .setDescription(`${pessoamention} **Agora esta casado com** ${message.author} 💑`)
                                        .setTimestamp()
                                        .setAuthor({
                                            name: message.author.username,
                                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                                        })
                                        .setFooter({
                                            text: `${message.author.username}`,
                                            iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
                                        })
                                ], components: []
                            })
                        } else if (i.customId === "Recusar") {
                            i.update({
                                embeds: [
                                    new MessageEmbed()
                                        .setColor("#ff000d")
                                        .setDescription(`${pessoamention} **Recusou o pedido de casamento de** ${message.author}`)
                                        .setTimestamp()
                                        .setAuthor({
                                            name: message.author.username,
                                            iconURL: message.author.displayAvatarURL({ dynamic: true }),
                                        })
                                        .setFooter({
                                            text: `${message.author.username}`,
                                            iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
                                        })
                                ], components: []
                            })
                        } else {
                            console.log(`${i.customId}`)
                        }
                        await i.update({ content: `Button ${i.customId}!`, components: [] });
                    });

                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                }
            } else {
                let msg = new MessageEmbed()
                    .setDescription(`${message.author} **| Você esta solteiro, para pedir alguem em casamento use:**\n \`t!casar [@pessoa]\``)
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
                message.channel.send({ embeds: [msg] })
            }
        }
    }
}