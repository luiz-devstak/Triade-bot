const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "clear",
  aliases: ["clear", "limpar"],

  run: async (client, message, args) => {
    try {
      let user = message.author;

      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send(
          `Você não possui a permissão \`Gerenciar Mensagens\``
        );

      const deleteAcount = parseInt(args[0], 10);

      if (!deleteAcount || deleteAcount < 1 || deleteAcount > 99)
        return message.channel.send({
          content: `Insira um número entre 1-99.`,
        });

      const deletemsg = await message.channel.messages.fetch({
        limit: deleteAcount + 1,
      });
      await message.channel
        .bulkDelete(deletemsg)
        .then((m) => {
          let embed = new MessageEmbed()
            .setColor("#ff000d")
            .setDescription(`${user} apagou \`${args[0]}\` mensagens!`)
            .setFooter({
              text: `Limpeza realizada`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            });
          message.channel.send({ embeds: [embed] });
        })
        .catch((err) => {
          message.channel.send({
            content: `Não encontrei nenhuma mensagem para ser exluida! Não consigo apagar menssagens que tenham mais de 2 semanas :P`,
          });
          console.log(`Erro encontrado: ` + err);
        });
    } catch (error) {
      console.log(`Erro encontrado ` + error);
    }
  },
};