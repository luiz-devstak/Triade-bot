const { Discord, MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
    name: "MuteCommand", // Coloque o nome do arquivo
    aliases: ["mute"], // Coloque os sinonimos do comando

    run: async(client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.delete()
        } else {
            if (!args[0]) {
                let messageError = new MessageEmbed()
                    .setDescription("**Ex:** \`t!mute [usuario] [tempo(s/m/h/d)] [motivo(opcional)]\`")
                    .setColor("#ff000d")
                return message.channel.send(
                    ({ embeds: [messageError] })
                )        
            } else {
                let member = await message.guild.members.fetch(args[0].slice(2, -1))
                let timeTypes = {
                    s: 1000, m: 60000, h: 3600000, d: 86400000, sm: 604800000, mes: 2592000000, an: 31536000000 
                }
                let contador = 0;

                for (letter in args[1]) {
                    if (Number(letter)) {
                        contador++
                    }
                }

                let type = args[1].slice(contador)

                let numericPartion = Number(args[1].slice(0, contador))
   
                let time = numericPartion * timeTypes[type]

                let reason = (args[2])
     
                member.timeout(time, reason).then(console.log).catch(console.error)

                let tempo = {
                    s: "segundos", m: "minutos", h: "horas", d: "dias", sm: "semanas", mes: "meses", an: "anos"
                }

                let messageMutado = new MessageEmbed()
                    .setColor("#ff000d")
                    .setDescription(`**O usuario ${member} foi mutado com sucesso!** 
                    *Tempo do mute:* ${numericPartion === 1? numericPartion.toString() + " " +tempo[type].slice(0, -1): numericPartion.toString() + " " + tempo[type]}
                    *Motivo do mute:* ${reason?? "A razão não foi determinada!"}`)
                message.channel.send({ embeds: [messageMutado] })

                let logMute = new MessageEmbed()
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
                        name: "🧑・Membro mutado:",
                        value: `${member}`,
                        inline: false,
                    },
                    {
                        name: "📂・Motivo do mute:",
                        value: `${reason}`,
                        inline: false,
                    },
                    {
                        name: "🕒・Tempo do mute:",
                        value: `${numericPartion === 1? numericPartion.toString() + " " +tempo[type].slice(0, -1): numericPartion.toString() + " " + tempo[type]}`,
                        inline: false,
                    },
                )
            message.guild.channels.cache.get(`993823910812463164`).send({ embeds: [logMute] })
            }
        }
    }
}