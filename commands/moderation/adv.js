const { Discord, MessageEmbed } = require("discord.js")

module.exports = {
    name: "adv", // Coloque o nome do arquivo
    aliases: ["adv"], // Coloque os sinonimos do comando

    run: async(client, message, args) => {
        if (!message.member.permission.has("ADMINISTRATOR")) {
            return message.delete
        } else {
            
        }
    }
}