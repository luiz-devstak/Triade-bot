const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }   

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


    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
