const Discord = require("discord.js")

module.exports = {
    name: "UnBanCommand", // Coloque o nome do comando do arquivo
    aliases: ["desbanir"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.delete()
        } else {

            let user = client.users.cache.get(args[0])

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("#ff000d")
                .setDescription(`\`t!desbanir [membro]\``);

                message.reply({ embeds: [embed] })

            } else {

                    message.guild.members.unban(user.id).then(() => message.reply(`O usuário \`${user.tag}\` foi desbanido com sucesso.`)).catch(e => {
                        message.reply(`Não foi possível desbanir o usuário \`${user.tag}\`.`)
                    })
                
                    let logCargos = new MessageEmbed()
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
                            name: "📁・Membro desbanido:",
                            value: `${user}`,
                            inline: false,
                        },
                    )
                message.guild.channels.cache.get(`1005854118616760350`).send({ embeds: [logCargos] })
            }
        }
        
    }
}