const { Discord, MessageEmbed } = require('discord.js')

module.exports = {
    name: "PingCommand",
    aliases: ['ping'],

    run: async(client, message, args) => {
        let colorEmber = "#ff000d"   
        let messagePing = client.ws.ping;
        let embedOne = new MessageEmbed()
        .setColor(colorEmber)
        .setDescription("Calculando ping...")

        let embedTwo = new MessageEmbed()
        .setColor(colorEmber)
        .setDescription(`Meu ping: ${messagePing}`)
        

        let foudasi = await message.reply({ content: `${message.author}`, embeds: [embedOne] }).then(msg => {
            setTimeout( () => {
                msg.edit({ content: `${message.author}`, embeds: [embedTwo] })
            }, 3000)
        })
    }
}