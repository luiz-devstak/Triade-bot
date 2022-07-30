// ----------------------------------------------------------------------- setmsgedit.js (COMANDO) ------------------------------------------------------------------------------------------ //


const Discord = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "setmsgedit",
    aliases: ["setedit"],
    author: "luizao",

    run: async(client, message, args) => {

        let luizao_canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let luizao_author = message.author;
        let luizao_err = "Mencione um canal";

        let luizao_perm = "**Gerenciar Servidor**";
        let luizao_msg_error_perm = `:x: | ${luizao_author} Você não possui de ${luizao_perm}.`

        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${luizao_msg_error_perm}`);
        if (!luizao_canal) return message.channel.send(`:x: | ${luizao_author} ${luizao_err}.`);

        db.set(`luizao_msg_edit_${message.guild.id}`, luizao_canal.id);

        let luizao_confirm_pt1 = "O canal";
        let luizao_confirm_pt2 = "foi configurado com sucesso.";
        message.channel.send(`✅ ${luizao_author} ${luizao_confirm_pt1} ${luizao_canal} ${luizao_confirm_pt2}`)
        
    }
}

// ----------------------------------------------------------------------------- PARTE NA INDEX ------------------------------------------------------------------------------------ //

// 1 - coloque isso nas constantes: const db = require("quick.db");
// 2- script:



/*
Ficou com alguma dúvida ou erro??
Entre no servidor suporte https://discord.gg/PEdmSZzCAv
*/