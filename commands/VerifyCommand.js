const Discord = require("discord.js")
const botao = new Discord.MessageButton().setCustomId("botao_cargo").setLabel("").setStyle("SUCCESS").setEmoji("✅")

module.exports = {
    name: "VerifyCommand", // Coloque o nome do comando do arquivo
    aliases: ["setverificar"], // Coloque sinônimos aqui

    run: async(client, message, args) => {
        

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão \`Administrador\` para utilizar este comando.`)
        } else {
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) { 
                message.reply({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff000d")
                    .setDescription(`\`!setbotao [canal]\``)
                ] })
            } else {
                message.reply(`O canal de texto ${canal} foi configurado.`);
                canal.send({ embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff000d")
                    .setDescription(`**Para você visualizar os outros canais, você precisa fazer o seu registro em  <#993820461358129252>! Mas o principal e fazer a sua verificação clicando no botão a baixo!**`)
                ], components: [
                    new Discord.MessageActionRow().addComponents(botao)
                ] })
            }
        }

       
        
    }
}