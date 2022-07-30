const discord = require("discord.js")
const akinator = require("discord.js-akinator")

module.exports = {
    name: "adivinhacao",
    aliases: ["jogaraki"],
    run: async (client, message, args) => {

        const language = "pt"; // Coloque a língua do seu país (en, fr, es)
        const childMode = true; // Modo frio ?
        const gameType = "character";
        const useButtons = true; // Utilizar botões [true | false]
        const embedColor = "RED"; // Cor da embed

        akinator(message, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons, 
            embedColor: embedColor
        });
}}