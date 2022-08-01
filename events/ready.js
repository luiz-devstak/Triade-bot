const client = require("../index");

client.on("ready", () => {
    console.log(`Loagado em [ ${client.user.username} ] com sucesso!`);
});
