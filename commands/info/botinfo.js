const Discord = require("discord.js");

module.exports = {
  name: "botinfo", // Coloque o nome do comando do arquivo
  aliases: ["botinfo"], // Coloque sinônimos aqui

  run: async (client, message, args) => {
    let servidor = client.guilds.cache.size;
    let usuarios = client.users.cache.size;
    let canais = client.channels.cache.size;
    let ping = client.ws.ping;
    let dono_id = "947998194141388831"; // Seu ID
    let dono = client.users.cache.get(dono_id);
    let prefixo = "t!";
    let versao = "^13.6.0";

    let embed = new Discord.MessageEmbed()
      .setColor("#ff000d")
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setFooter({
        text: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp(new Date())
      .setDescription(`\n<:sapo_milgrau:1001662313121718382> Olá ${message.author}, sou o \`${client.user.username}\`, meu prefixo é \`${prefixo}\`
      \n<a:pc:1001662375570706522> Veja meus comandos com \`${prefixo}help\`.
      \n<:staff:1001662428196655124> Atualmente estou gerenciando \`${servidor}\` servidores, \`${usuarios}\` usuários e \`${canais}\` canais de servidores.
      \n<:sapoping:1001662472069070948> Meu ping está em \`${ping}\`.
      \n<a:hacker:1001662510191083672> Fui criado pelo \`${dono.tag}\`, na linguagem JavaScript, utilizando NodeJs e a livraria Discord.Js na versão \`${versao}\`.`);

    message.reply({ embeds: [embed] });
  },
};
