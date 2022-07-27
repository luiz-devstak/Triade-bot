const Discord = require("discord.js")
const generator = require('generate-password');

module.exports = {
    name: "passwordgerator", // Coloque o nome do comando do arquivo
    aliases: ["gerarsenha"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let password = generator.generate({
            length: 18, // Número de caracteres da senha
            numbers: true // Pode conter números? [true | false]
        });

        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`> Sua senha gerada:\n\n\`\`\`\n${password}\n\`\`\``)
            .setAuthor({
                name: `${message.author.username}`,
                iconURL: `${message.author.displayAvatarURL()}`,
            })

        message.reply({ embeds: [embed] })
            .then((message) => {
                setTimeout(function () {
                    message.delete();
                }, 10000);
            });
    }
}