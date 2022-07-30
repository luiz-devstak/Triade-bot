const Discord = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["clear", "limpar"],
    author: "luizao",

run: async(client, message, args) => {

    let author = message.author;
    let msg_erro_sem_perm = "Você não possui a permissão \`Gerenciar Mensagens\`";
    let numeros = args[0];

  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: | ${author} ${msg_erro_sem_perm}.`);

  const contador_msg_del = parseInt(args[0], 10);

  let msg_erro_msgs_del = "Insira um número entre 1-99.";

  if (!contador_msg_del || contador_msg_del < 1 || contador_msg_del > 99) return message.channel.send(`:x: | ${author} ${msg_erro_msgs_del}`);

  const apagando_msg = await message.channel.messages.fetch({
    limit: contador_msg_del + 1
  });
  const mensagens = await message.channel.bulkDelete(apagando_msg);
  let msg_nao_embed = `✅ | ${author} apagou \`${numeros}\` mensagens!`;
  let msg_embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${author} apagou \`${mensagens.size}\` mensagens!`)
    .setFooter(`Limpeza realizada`, "http://2.bp.blogspot.com/-dcLYYffAv2w/U1E3Un7Ie1I/AAAAAAAAAAw/uYYS4DWtJBk/s1600/1.gif")
  message.channel.send({ embeds: [msg_embed]})
}};