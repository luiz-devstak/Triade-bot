const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: 'registermenu',
    aliases: ['r', 'registrar'],
    run: async (client, message, args) => {

        let homem = "993635007627276389" // coloque o id do cargo homem
        let mulher = "993635008550010971" // coloque o id do cargo mulher
        let naobinario = "993635009539887185" // id do nao binario
        let menos18 = "993635013528670311" // id do cargo  -18
        let mais18 = "993635013042130954" // id do cargo +'8
        let hetero = "993635011246960671" // id do cargo hetero
        let lgbt = "993635010374541342"  // id do cargo lgbt
        let solteiro = "1001630568355737600"  // id do cargo solteiro
        let namorando = "1001630684126904400" // id do cargo namorando 
        let casado = "1001630807003242507" // id do cargo casado
        let enrolado = "1001630871733940255" // id do cargp enrolado 
        let equiperegistro = "993821722820223006" //Id do cargo da equipe de registro
        let registrado = "993635014212329474"// id do cargo registrado
        let naoregistrado = "993635016305283153"// id do cargo nao registrado
       
       if (!message.member.roles.cache.get(`${equiperegistro}`)) return message.reply(`Você precisa ser da equipe de registro para utilizar este comando.`);
       
        const membro = message.mentions.members.first()
        if (!membro) return message.reply({ embeds: [
                new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`\`!registrar [usuário]\``)
            ] });
        

        const genero = new Discord.MessageEmbed()
            .setTitle('Gênero')
            .setDescription('Escolha o genero do membro utilizando o menu abaixo')
            .setColor('RED')
            .setFooter({ text: `Registrador: ${message.author.username}`})

        const idade = new Discord.MessageEmbed()
            .setTitle('Idade')
            .setDescription('Escolha a idade do membro utilizando o menu abaixo')
            .setColor('RED')
            .setFooter({ text: `Registrador: ${message.author.username}`})

        const sexualidade = new Discord.MessageEmbed()
            .setTitle('Sexualidade')
            .setDescription('Escolha a Sexualidade  do membro utilizando o menu abaixo')
            .setColor('RED')
            .setFooter({ text: `Registrador: ${message.author.username}`})

        const estado = new Discord.MessageEmbed()
            .setTitle('Estado civil')
            .setDescription('Escolha o Estado civil do membro utilizando o menu abaixo')
            .setColor('RED')
            .setFooter({ text: `Registrador: ${message.author.username}`})

            const completo = new Discord.MessageEmbed()
            .setTitle('Registro completo!')
            .setDescription(`
> Registrador: ${message.author}
> Registrado: ${membro}`)
            .setColor('RED')

        const generodrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('generomenu')
                    .setPlaceholder('Genero!')
                    .addOptions([
                        {
                            label: 'Homem',
                            emoji: '♂️',
                            description: 'Genero masculino',
                            value: 'homem1'
                        },
                        {
                            label: 'Mulher',
                            emoji: '♀️',
                            description: 'Genero feminino',
                            value: 'mulher1'
                        },
                        {
                            label: 'Não binario',
                            emoji: '🌈',
                            description: 'Não binario',
                            value: 'outros1'
                        }
                    ])
            )

        const idadedrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('idademenu')
                    .setPlaceholder('Idade!')
                    .addOptions([
                        {
                            label: '-18',
                            emoji: '🔞',
                            description: 'Menos de 18 anos',
                            value: '-181'
                        },
                        {
                            label: '+18',
                            emoji: '🍺',
                            description: 'Maior de 18 anos',
                            value: '+181'
                        }
                    ])

            )
        const sexualidadedrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('sexualidademenu')
                    .setPlaceholder('Sexualidade!')
                    .addOptions([
                        {
                            label: 'Hetero',
                            emoji: '🏁',
                            description: 'Sexualidade hetero',
                            value: 'hetero1'
                        },
                        {
                            label: 'Lgbt',
                            emoji: '🏳️‍🌈',
                            description: 'Sexualidade Lgbt',
                            value: 'lgbt1'
                        }
                    ])
            )
        const Estadodrop = new Discord.MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('estadomenu')
                    .setPlaceholder('Estado civil!')
                    .addOptions([
                        {
                            label: 'Solteiro',
                            emoji: '🍻',
                            description: 'Estado solteiro',
                            value: 'solteiro1'
                        },
                        {
                            label: 'Namorando',
                            emoji: '💋',
                            description: 'Estado namorando',
                            value: 'namorando1'
                        },
                        {
                            label: 'Casado',
                            emoji: '❤️',
                            description: 'Estado Casado',
                            value: 'Casado1'
                        },
                        {
                            label: 'Enrolado',
                            emoji: '💫',
                            description: 'Estado Enrolado',
                            value: 'Enrolado1'
                        }
                    ])
            )

        const generocoletor = await message.channel.send({ embeds: [genero], components: [generodrop] })

        const filtro = (interaction) =>
            interaction.isSelectMenu()

        const coletor = generocoletor.createMessageComponentCollector({
            filtro
        });
        coletor.on('collect', async (collected) => {
            let ticket = collected.values[0]
            collected.deferUpdate()

            if (ticket === 'homem1') {



                membro.roles.add(homem)
            }

            if (ticket === 'mulher1') {



                membro.roles.add(mulher)

            }

            if (ticket === 'outros1') {



                membro.roles.add(naobinario)

            }

            const proxidadeh = await generocoletor.channel.send({ embeds: [idade], components: [idadedrop] })

            generocoletor.delete()

            const filtro = (interaction) =>
                interaction.isSelectMenu()

            const coletor = proxidadeh.createMessageComponentCollector({
                filtro
            });
            coletor.on('collect', async (collected) => {
                let ticket = collected.values[0]
                collected.deferUpdate()

                if (ticket === '-181') {

                    membro.roles.add(menos18)
                }

                if (ticket === '+181') {
                    membro.roles.add(mais18)
                }

                const proximasexu = await proxidadeh.channel.send({ embeds: [sexualidade], components: [sexualidadedrop] })
                proxidadeh.delete()
                

                const filtro = (interaction) =>
                    interaction.isSelectMenu()

                const coletor = proximasexu.createMessageComponentCollector({
                    filtro
                });
                coletor.on('collect', async (collected) => {
                    let ticket = collected.values[0]
                    collected.deferUpdate()

                    if (ticket === 'hetero1') {
                        membro.roles.add(hetero)
                    }

                    if (ticket === 'lgbt1') {
                        membro.roles.add(lgbt)
                    }

                    const proximaestadu = await proximasexu.channel.send({embeds: [estado], components: [Estadodrop]})
                    proximasexu.delete()

                    const filtro = (interaction) =>
                    interaction.isSelectMenu()
    
                const coletor = proximaestadu.createMessageComponentCollector({
                    filtro
                });
                coletor.on('collect', async (collected) => {
                    let ticket = collected.values[0]
                    collected.deferUpdate()
    
                    if (ticket === 'solteiro1') {
    
    
                       membro.roles.add(solteiro)
                        membro.roles.add(registrado)
                        membro.roles.remove(naoregistrado)
                       
                       message.channel.send({embeds: [completo]})

                       proximaestadu.delete()
                    }

                    if (ticket === 'namorando1') {
    
    
                        membro.roles.add(namorando)
                         membro.roles.add(registrado)
                         membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                     if (ticket === 'Casado1') {
    
    
                        membro.roles.add(casado)
                         membro.roles.add(registrado)
                         membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                     if (ticket === 'Enrolado1') {
    
    
                        membro.roles.add(enrolado)
                        membro.roles.add(registrado)
                        membro.roles.remove(naoregistrado)
                        
                        message.channel.send({embeds: [completo]})
 
                        proximaestadu.delete()
                     }

                })
                })
            })
        })

    }
}