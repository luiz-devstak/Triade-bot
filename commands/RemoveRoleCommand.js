const { Discord, MessageEmbed }= require("discord.js")

module.exports = {
    name: "RemoveRoleCommand", // Coloque o nome do comando do arquivo
    aliases: ["removecargo"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            message.reply(`Você não possui a permissão de \`Gerenciar Cargos\`.`)
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if (!user || !role) {
                message.reply({ embeds: [new Discord.MessageEmbed()
                
                .setColor("#ff000d")
                .setDescription(`\`t!removecargo [usuário] [cargo]\``)] });
            } else if (user && role) {
                message.reply(`✅ | O usuário ${user} teve o cargo \`${role.name}\` removido.`).then(msg=> {
                user.roles.remove(role.id).catch(e => { msg.edit(`:x: | Não foi possível retirar o cargo \`${role.name}\` do usuário ${user}!`) })
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
                            name: "🧑・Membro:",
                            value: `${user}`,
                            inline: false,
                        },
                        {
                            name: "🚮・Cargo removido:",
                            value: `${role}`,
                            inline: false,
                        },
                    )
                message.guild.channels.cache.get(`1005821867828990003`).send({ embeds: [logCargos] })
            }

        }        
    }
}