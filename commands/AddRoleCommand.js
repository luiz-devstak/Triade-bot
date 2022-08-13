const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
    name: "AddRoleCommand", // Coloque o nome do comando do arquivo
    aliases: ["addcargo"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.delete()
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if (!user || !role) {
                message.reply({ embeds: [new MessageEmbed()
                .setColor("#ff000d")
                .setDescription(`\`t!addcargo [usuário] [cargo]\``)] });
            } else if (user && role) {
                message.reply(`✅ | O usuário ${user} recebeu o cargo \`${role.name}\`.`).then(msg=> {
                user.roles.add(role.id).catch(e => { msg.edit(`:x: | Não foi possível adicionar o cargo \`${role.name}\` no usuário ${user}!`) })
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
                            name: "✅・Cargo adicionado:",
                            value: `${role}`,
                            inline: false,
                        },
                    )
                message.guild.channels.cache.get(`1005821867828990003`).send({ embeds: [logCargos] })
            }
        }        
    }
}