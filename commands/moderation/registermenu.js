const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "clear",
  aliases: ["clear", "limpar"],

  run: async (client, message, args) => {
    message.delete();
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
            .setColor("RANDOM")
            .setDescription(`${user} apagou \`${args[0]}\` mensagens!`)
            .setFooter({
              text: `Limpeza realizada`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            });
          message.channel.send({ embeds: [embed] });
        })
        .catch((err) => {
          message.channel
            .send({
              embeds: [
                new MessageEmbed()
                  .setDescription(
                    `Você só pode excluir em massa mensagens com menos de **14** dias.`
                  )
                  .setColor(`#ff000d`),
              ],
            })
            .then((msg) => {
              setTimeout(
                () =>
                  msg.delete().catch((err) => {
                    console.log(`Erro encontrado: ` + err);
                  }),
                1000 * 12
              );
            });
          console.log(`Erro encontrado: ` + err);
        });
    } catch (error) {
      console.log(`Erro encontrado ` + error);
    }
  },
};