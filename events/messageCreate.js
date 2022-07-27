const client = require("../index");
const { QuickDB } = require('quick.db');
const { MessageEmbed } = require("discord.js");
const db = new QuickDB({ filePath: "json.sqlite" });

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

        console.log
        
    if(db.get(`blacklist_${message.author.id}`) === true) {
        return message.channel.send({ embed: [
            new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Você está na blacklist!`)
            .setDescription(`Enquanto estiver na blacklist não poderá usar nenhum comando meu. :sob: \n\n**Foi engano?** Contate um staff para rever sua blacklist`)
            .setFooter(`Discord`, client.user.avatarURL)
            .setTimestamp()
            .setColor("random")
        ]})
    }    
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
