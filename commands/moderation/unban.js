const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban", // Coloque o nome do comando do arquivo
  aliases: ["desbanir"], // Coloque sinônimos aqui

  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.reply(`Você não possui permissão para utilizar este comando.`);
    } else {
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let motivo = args[1];

      if (!motivo) motivo = "Não definido.";

      if (!user) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`\`!unban [membro] [motivo]\``);

        message.reply({ embeds: [embed] });
      } else {
        let embedkick = new MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(
            `O usuário \`${user.user.tag}\` foi desbanido com sucesso.`
          );

        user
          .kick(motivo)
          .then(() => message.reply({ embeds: [embedkick] }))
          .catch((e) => {
            message.reply(
              `Não foi possível desbanir o usuário \`${user.user.tag}\`.`
            );
          });
      }
    }
  },
};