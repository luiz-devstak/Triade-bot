const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
    name: "BanCommand", // Coloque o nome do comando do arquivo
    aliases: ["ban"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            message.delete()
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let motivo = args[1];

            if (!motivo) motivo = "A razão não foi determinada";

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("#ff000d")
                .setDescription(`\`t!ban [membro] [motivo]\``);

                message.reply({ embeds: [embed] })

            } else {

                    user.ban({ reason: motivo }).then(() => message.reply(`O usuário \`${user.user.tag}\` foi banido com sucesso.`)).catch(e => {
                        message.reply(`Você não pode banir usuários que estão acima de você! \`${user.user.tag}\`.`)
                    })

                    let logBan = new MessageEmbed()
                    .setColor("#ff000d")
                    .setTitle(`${message.guild.name}`)
                    .setTimestamp()
                    .setAuthor({
                        name: message.author.username,
                        iconURL: message.author.displayAvatarURL({ dynamic: true }),
                    })        
                    .setFooter({
                        text: `${message.author.username}`,
                        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,
                    })
                    .addFields(
                        {
                            name: "🔨・Moderador:",
                            value: `${message.author}`,
                            inline: false,
                        },
                        {
                            name: "🧑・Membro banido:",
                            value: `${user}`,
                            inline: false,
                        },
                        {
                            name: "📂・Motivo do ban:",
                            value: `${motivo}`,
                            inline: false,
                        },
                    )
                message.guild.channels.cache.get(`993823895239020545`).send({ embeds: [logBan] })
            }
        }
        
    }
}