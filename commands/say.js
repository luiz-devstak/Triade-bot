const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  aliases: ['say'],
  run: async (client, message, args) => {
      
   let embed = new MessageEmbed()
       .setDescription('`ex: t!say [mensagem]`')
       .setColor("RANDOM")
       if (!args.join(' ')) return message.reply({embeds: [embed]})
      
     let don = new MessageEmbed()
      .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dyanmic: true })})
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor("RANDOM")
        message.delete().catch(O_o => {});
      
    message.channel.send({embeds: [don]})
  }
}