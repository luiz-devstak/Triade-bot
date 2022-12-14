const Discord = require("discord.js")

module.exports = {
    name: "DmCommand", // Coloque o nome do comando do arquivo
    aliases: ["dm"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.delete()
        } else {
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);
            let dm_msg = args.slice(1).join(" ");
            if (!user || !args[1]) {
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`\`t!dm [usuário] [mensagem]\``)
                ] })
            } else {
                    message.reply({ content: `A mensagem foi enviada com sucesso para \`${user.tag}\`.`, embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`Mensagem:`)
                        .setDescription(`||\n${dm_msg}\n||`)
                    ] }).then(m => {
                        user.send(dm_msg).catch(e => {m.edit({ content: `\\❌ Ops! A dm do usuário \`${user.tag}\` está bloqueada!`, embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`Mensagem que seria enviada:`)
                            .setDescription(`||\n${dm_msg}\n||`)
                        ] })})
                    })
                    
                }
            }  
        
    }
}