const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['help'],

    run: async(client, message, args) => {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL(),
                })
                .setAuthor({
                    name: message.author.username,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                })
                .setTitle(
                    "***__MEUS COMANDOS!__***"
                )
                .setDescription(`
                    <:staff:1001662428196655124> ***| MODERAÇÃO*** - (*Apenas moderadores podem usar esses comandos!!*)
                    *------------------------------------------------------------------------------------------*
                    **t!ban** - (*Esse comando vai banir o usuário, mostrando o motivo de seu ban!!*)
                    **t!expulsar** - (*Esse comando vai expulsar o usuario, deixando com que ele possa voltar ao server!*)
                    **t!lock** - (*Esse comando vai trancar qualquer canal de texto!*)
                    **t!unban** - (*Esse comando vai desbanir o membro do servidor!*)
                    **t!unlock** - (*Esse comando vai destrancar qualquer canal trancado!*)
                    **t!removecargo** - (*Esse comando vai retirar qualquer cargo do usuário!*)
                    **t!addcargo** - (*Esse comando vai adicionar qualquer cargo do usuário!*)
                    **t!clear / t!limpar** - (*Esse comando vai limpar mensagens da quantidade escolhida!*)
                    **t!r / t!registrar** - (*Esse comando vai registrar membros sem identidade!*)
                    *------------------------------------------------------------------------------------------*
                    <:sapoping:1001662472069070948> ***| INFORMAÇÕES*** - (*Qualquer um consegue usar esses comandos a baixo!!*)
                    *------------------------------------------------------------------------------------------*
                    **t!botinfo** - (*Esse comando vai mostrar todas as minhas informações!*)
                    **t!serverinfo** - (*Esse comando vai mostrar todas as informações do servidor!*)
                    **t!userinfo** - (*Esse comando vai mostrar todas as suas informações dentro do servidor!*)
                    *------------------------------------------------------------------------------------------*
                    <:sapo_milgrau:1001662313121718382> ***| DIVERÇÃO*** - (*Comandos para a diverção e interação no servidor!!*)
                    *------------------------------------------------------------------------------------------*
                    **t!jogaraki** - (*Esse comando permite que vc jogue um jogo de adivinhação!*)
                `)
            ]
        })   
    }
}