const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlock",
  category: "Moderação",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    //         <----------- Permissão do usuário -------->

    let perm = message.member.permissions.has("MANAGE_GUILD");

    let msgPerm = new MessageEmbed()
      .setDescription(
        `❗・${message.author} Você não possui permissão para \`Gerenciar Servidor!\``
      )
      .setColor("#ff000d");

    if (!perm)
      return message.channel
        .send({ content: `${message.author}`, embeds: [msgPerm] })
        .then((message) => {
          setTimeout(function () {
            message.delete();
          }, 10000);
        });

    //         <----------- Permissão de bloquear channel -------->

    const InvalidChannelEmbed = new MessageEmbed()
      .setColor("#ff000d")
      .setDescription(
        `❗・Mencione um canal válido para bloquear.`
      );

    if (!message.mentions.channels.first())
      return message.channel
        .send({ embeds: [InvalidChannelEmbed] })
        .then((message) => {
          setTimeout(function () {
            message.delete();
          }, 10000);
        });

    await message.mentions.channels.forEach(async (channel) => {
      const AlreadyLockedEmbed = new MessageEmbed()
        .setColor("#ff000d")
        .setDescription(`<#${channel.id}> O canal já está desbloqueado`);
      if (channel.name.startsWith(`🔒`))
        return message.channel
          .send({ embeds: [AlreadyLockedEmbed] })
          .then((message) => {
            setTimeout(function () {
              message.delete();
            }, 10000);
          });

      try {
        await message.channel.permissionOverwrites.edit(
          message.guild.roles.cache.find(
            (lock) => lock.name.toLowerCase().trim() == "@everyone"
          ),
          {
            SEND_MESSAGES: true,
          }
        );

        const SuccessfulLockedEmbed = new MessageEmbed()
          .setColor("#ff000d")
          .setDescription(
            `✅・<#${channel.id}> foi desbloqueado com sucesso.`
          );

        message.channel.send({ embeds: [SuccessfulLockedEmbed] });
      } catch (err) {
        const errorEmbed = new MessageEmbed()
          .setTitle("Ops, um erro inesperado aconteceu")
          .setDescription(`\`\`\`${err}\`\`\``)
          .setColor("#ff000d");
        message.channel.send({ embeds: [errorEmbed] });
      }
    });
  },
};
