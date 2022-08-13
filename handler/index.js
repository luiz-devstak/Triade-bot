const { Discord, MessageButton, MessageActionRow, MessageEmbed } = require("discord.js")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client, Message } = require("discord.js");
const mongoose = require("mongoose");
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { joinVoiceChannel } = require('@discordjs/voice');
const { ActivityType } = require('discord.js');
const config = require("../config.json")


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

    client.on('interactionCreate', interaction => {

        let cargo = interaction.guild.roles.cache.get("993635015520952420"); // Coloque o ID do cargo de verificação.
    
        if (interaction.isButton()) {
            if (interaction.customId.startsWith("botao_cargo")) {
                try {
    
                if (interaction.member.roles.cache.get(cargo.id)) {
    
                    interaction.reply({ content: `\\❌ Você já está verificado no servidor.`, ephemeral: true })
    
                } else {
    
                interaction.member.roles.add(cargo)
                interaction.reply({ content: `\\✅ Você foi verificado com sucesso.`, ephemeral: true })
    
                }
                } catch (er) { console.log(er) }
            } else {}    
        }  
    });

    client.on("messageCreate", async (message) => {
        if (message.channel.type == "dm") return;
        let user = message.mentions.users.first();
        let info = {
          emojis: {
            emoji01: `<a:blackgatoPDT:982656310929666148>`,
            emoji02: `<a:p_foguinho:982657801136517120>`, 
            emoji03: `<a:z_sakura:982506391241621534>`,
            emoji04: `<:black_pitbullpdt:982143304386891776>`,
            emoji05: `<a:z_sitchdance3:982506974216351754>`, // Emoji que você quer que o bot reaja
          },
          user: {
            luiz: `947998194141388831`, 
            cherry: `972870312452579338`,
            henrii: `386953968556965891`,
            jao: `986468871970119760`,
            lizy: `936014544348778496`, // Id da pessoa que você deseja reagir
          },

        };
      
        if (user) {
          // PRIMEIRA REAÇÃO
          try {
            if (user.id == info.user.luiz || "") {
              message.react(info.emojis.emoji01).catch((err) => {
                console.log(`Erro encontrado: ` + err);
              });
            }
          } catch (error) {
            console.log(`Erro detectado ` + error);
          }
      
          // SEGUNDA REAÇÃO
          
          try {
            if (user.id == info.user.cherry || "") {
              message.react(info.emojis.emoji02).catch((err) => {
                console.log(`Erro encontrado: ` + err);
              });
            }
          } catch (error) {
      
            console.log(`Erro detectado ` + error);
          
          }
          
          // TERCEIRA REAÇÃO

          try {
            if (user.id == info.user.henrii || "") {
              message.react(info.emojis.emoji03).catch((err) => {
                console.log(`Erro encontrado: ` + err);
              });
            }
          } catch (error) {
      
            console.log(`Erro detectado ` + error);
          
          }

          // QUARTA REAÇÃO

          try {
            if (user.id == info.user.jao || "") {
              message.react(info.emojis.emoji04).catch((err) => {
                console.log(`Erro encontrado: ` + err);
              });
            }
          } catch (error) {
      
            console.log(`Erro detectado ` + error);
          
          }

          // QUINTA REAÇÃO
          
          try {
            if (user.id == info.user.lizy || "") {
              message.react(info.emojis.emoji05).catch((err) => {
                console.log(`Erro encontrado: ` + err);
              });
            }
          } catch (error) {
      
            console.log(`Erro detectado ` + error);
          
          }
        }
      });

      client.on("messageCreate", (message) => {
        if (message.content == "eu sou legal?") {
            var list = [
                `${message.author} Sim <3`,
                `${message.author} Não kkkkjj`,
                `${message.author} Talvez...`,
              ];
            
              var rand = list[Math.floor(Math.random() * list.length)];
              message.channel.send({ content: rand });
        }
      })

      client.on("messageCreate", (message) => {
        if (message.content == "melhor time?") {
          var list = [
            `${message.author} VASCO!`,
            `${message.author} FLAMENGO!`,
            `${message.author} CRUZEIRO!`,
            `${message.author} PALMEIRAS!`,
            `${message.author} CORINTIANS!`,
            `${message.author} ATLETICO MINEIRO!`,
            `${message.author} FLUMINENSE!`,
            `${message.author} BOTAFOGO!`,
            `${message.author} GREMIO!`,
            ];

            var rand = list[Math.floor(Math.random() * list.length)];
            message.channel.send({ content: rand });
          }
      })

      client.on("guildMemberAdd",  async (member) => {
        let autorole = await db.get(`autorole_${member.guild.id}`);
        if (!autorole === null) return;
        member.roles.add(await member.guild.roles.fetch(autorole))
      });



client.on("ready", () => {

    let channel = client.channels.cache.get("993635020143087637");

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    console.log("✅ - Entrei no canal de vóz [" + channel.name + "] com sucesso.")
});

client.on("messageCreate", (mesasge) => {

    let channel = client.channels.cache.get("993635020143087637");

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

});

  client.on("messageCreate", (message) => {
      if (message.content == "add") {
        let adds = new MessageEmbed()
        .setColor("#ff000d")
        .setTimestamp()
        .setDescription(`***__SEJA MEMBRO - TRÍADE. <:trde_gotinha:993310092969652254> __***

        *Caso queira ser um membro oficial da tríade, você deve usar o nosso nome em seu perfil, seja em status ou no sobre mim.*
        
        <:v_seta_fdl:1005938317751234580> - 𝐓𝐫𝐢𝐚𝐝𝐞
        <:v_seta_fdl:1005938317751234580> /tríade
        
        <a:red_seta:1005938369911599236> *Para se tornar um membro, basta enviar um "." nesse chat, após isso aguarde até que um administrador chegue até você o responda.*
        
        <a:red_verificado_pdt:981414915745148928> **Responsáveis:**
          <:red_ponto:1005942061364695061> <@947998194141388831>
          <:red_ponto:1005942061364695061> <@972870312452579338> 
          <:red_ponto:1005942061364695061> <@386953968556965891>
          <:red_ponto:1005942061364695061> <@936014544348778496>
          <:red_ponto:1005942061364695061> <@986468871970119760>
        `)
      .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })        
      .setFooter({
          text: `${client.user.username}`,
          iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
      })

      message.guild.channels.cache.get(`993635042817474671`).send({ embeds: [adds] })
      }
  })

  client.on("messageCreate", (message) => {
      if (message.content == ".") {
        let rec = "<@&1005952855628337152> Tem gente querendo se tornar um Triade!"

        message.guild.channels.cache.get(`993635042817474671`).send(`${rec}`)
        .then((msg) => {
          setTimeout(
            () =>
              msg.delete().catch(() => {
                console.log(`ta funfando`);
              }),
            1000 * 8
          );
        });
      console.log("ta funfando");
  }});

  client.on("messageCreate", (message) => {
      if (message.content == "Opa") {
          message.channel.send(`Opa meu lindo, como vai? ${message.author}`)
      }
  })

  client.on("messageCreate", (message) => {
    if (message.content == "opa") {
        message.channel.send(`Opa meu lindo, como vai? ${message.author}`)
    }
})

 client.on("messageCreate", (message) => {
   if (message.content == "Bem") {
       message.channel.send(`Que bom meu cria! ${message.author}`)
   }
 })

 client.on("messageCreate", (message) => {
   if (message.content == "bem") {
       message.channel.send(`Que bom meu cria! ${message.author}`)
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
    client.on("ready",  () => {
        console.log(`O cliente [ ${client.user.username} ] ficou online com sucesso!`)

    });

    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));
};
