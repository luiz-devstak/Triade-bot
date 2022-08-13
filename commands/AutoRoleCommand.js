const Discord = require("quick.db");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "AutoRoleCommand",
    aliases: ["autorole"],

    run: async(client, message, args) => {
        let user = message.author;
        let msg_error = "Lembre-se de mencionar um cargo";
        let msg_completo_error = `:x: ${user} ${msg_error}.`;
        if (!args[0]) return message.channel.send(msg_completo_error)

        let autorole_cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        db.set(`autorole_${message.guild.id}`, autorole_cargo.id);

        let msg_confirmação = `✅ | ${user} O cargo [${autorole_cargo}] foi definido como autorole com sucesso!`;

        message.channel.send(msg_confirmação)

    }
}