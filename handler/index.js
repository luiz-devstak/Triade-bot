const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");


const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    client.on("message", (message) => {
        if (message.content == ".") {
            message.channel.send(
                "<@&993821889589948416> Alguem quer ser verificado!"
            );
        }
    });
    const db = require('quick.db');
const Discord = require("discord.js")

client.on("voiceStateUpdate", (oldMember, newMember) => {
      
    const canal_logs = db.get(`config.${oldMember.guild.id}.tempocall`);
    
    let usuario = newMember.guild.members.cache.get(newMember.id)

  let oldVoice = oldMember.channel; 
  let newVoice = newMember.channel; 
  let canal_logs2 = client.channels.cache.find(channel => channel.id == canal_logs)
  if (oldVoice == null) {
            let embed = new Discord.MessageEmbed()
      .setTitle('Entrou no Canal de Voz')
      .setDescription(`O usuário <@${newMember.id}> entrou no canal de voz ${newMember.channel}.`)
      .setColor("RANDOM")
      canal_logs2.send({ embeds: [embed] })
      
      
        if (db.get(`contando_${newMember.id}`) === false) {
          db.set(`contando_${newMember.id}`, true)
      db.set(`call_${newMember.id}`, new Date().getTime())
          db.set(`contando_${newMember.id}`, true)
        }
  } else if (newVoice == null) {
          let embed = new Discord.MessageEmbed()
      .setTitle('Saiu do Canal de Voz')
      .setDescription(`O usuário <@${newMember.id}> saiu do canal de voz ${oldMember.channel}.`)
      .setColor("RANDOM")
      canal_logs2.send({ embeds: [embed] })
      
      
        if (db.get(`contando_${newMember.id}`) === true) {
      const tempo =  db.get(`call_${newMember.id}`)
      
      const start = new Date().getTime();
     
      const diff = Math.abs(tempo - start);
      
      const tempo2 = Math.ceil(diff / 1000)

      db.add(`tempocall_${newMember.id}`, tempo2)
          db.set(`contando_${newMember.id}`, false)
      }
  } else {
      let embed = new Discord.MessageEmbed()
      .setTitle('Mudou de Canal de Voz')
      .setDescription(`O usuário <@${newMember.id}> mudou de canal de voz.`)
      .addField('Saiu de', `${oldMember.channel}.`, true)
      .addField('Entrou em', `${newMember.channel}.`, true)
      .setColor("RANDOM")
      canal_logs2.send({ embeds: [embed] })

  }
      if (newMember.selfMute === true) {
        if (usuario.voice.channel) {
            if (db.get(`contando_${newMember.id}`) === true) {
              const tempo =  db.get(`call_${newMember.id}`) 
          const start = new Date().getTime(); 
     
          const diff = Math.abs(tempo - start);
          const tempo2 = Math.ceil(diff / 1000)

          db.add(`tempocall_${newMember.id}`, tempo2)
              db.set(`contando_${newMember.id}`, false)
              return;
            } else {
                return;
            }
       }
     } else {
         if (usuario.voice.channel) {
           db.set(`call_${newMember.id}`, new Date().getTime())
           db.set(`contando_${newMember.id}`, true)
       }
       return;
      }
  })

    
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};
