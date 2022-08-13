const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
    name: "KickCommand", // Coloque o nome do comando do arquivo
    aliases: ["kick"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let motivo = args[1];

            if (!motivo) motivo = "Não definido.";

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("#ff000d")
                .setDescription(`\`t!kick [membro] [motivo]\``);

                message.reply({ embeds: [embed] })

            } else {

                    user.kick(motivo).then(() => message.reply(`O usuário \`${user.user.tag}\` foi expulso com sucesso.`)).catch(e => {
                        message.reply(`Não foi possível expulsar o usuário \`${user.user.tag}\`.`)
                    })

                    let logKick = new MessageEmbed()
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
                            name: "🧑・Membro expulso:",
                            value: `${user}`,
                            inline: false,
                        },
                        {
                            name: "📂・Motivo da expulsão:",
                            value: `${motivo}`,
                            inline: false,
                        },
                    )
                message.guild.channels.cache.get(`993823954005409843`).send({ embeds: [logKick] })
                    
            }
        }
        
    }
}