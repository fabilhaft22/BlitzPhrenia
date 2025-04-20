const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");

function makeJsonDataUsable(pJsonData, pPlayerId) {
    return JSON.parse(JSON.stringify(pJsonData).replace(`${pPlayerId}`, "player"));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("findplayer")
        .setDescription("tries to find a player in the database")
        .addSubcommand(subcommand =>
            subcommand
                .setName("ign")
                .setDescription("the ign to search for")
                .addStringOption(option => option.setName('ign').setDescription("the ign").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playerid')
                .setDescription("the player id so search for")
                .addIntegerOption(option => option.setName('playerid').setDescription("the player id").setRequired(true))
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const database = JSON.parse(fs.readFileSync("src/data/nicknames.json", "utf-8"));
        const players = database.players;

        if (interaction.options.getSubcommand() === "playerid") {
            const playerId = interaction.options.getInteger('playerid');
            for (let i = 0; i < players.length; i++) {
                if (players[i].playerId == playerId) {
                    buildResponse(players, i, interaction);
                    return;
                }
            }
            addPlayerByPlayerId(database, playerId, interaction);
            return;
        }
        if (interaction.options.getSubcommand() === "ign") {
            const ign = interaction.options.getString('ign');
            for (let i = 0; i < players.length; i++) {
                if (players[i].ign.toLowerCase() === ign.toLowerCase()) {
                    buildResponse(players, i, interaction);
                    return;
                }
                for (let j = 0; j < players[i].previousNicknames.length; j++) {
                    if (players[i].previousNicknames[j].toLowerCase().trim() === ign.toLowerCase()) {
                        buildResponse(players, i, interaction);
                        return;
                    }
                }
            }
            addPlayerByIgn(database, ign, interaction);
            return;
        }
    }
}

async function buildResponse(pPlayers, i, interaction) {
    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Player info!")
        .addFields({ name: "Current Ingame name", value: "```" + pPlayers[i].ign + "```" })
        .addFields({ name: "Player ID", value: "```" + pPlayers[i].playerId + "```" })
        .setTimestamp();
    if (pPlayers[i].previousNicknames.length > 0) {
        let previousNicknameString = "";
        for (let j = 0; j < pPlayers[i].previousNicknames.length - 1; j++) {
            previousNicknameString += `${pPlayers[i].previousNicknames[j].trim()}, `;
        }
        previousNicknameString = "```" + previousNicknameString + pPlayers[i].previousNicknames[pPlayers[i].previousNicknames.length - 1].trim() + "```";
        embed.addFields({ name: "Previous Ingame Names", value: `${previousNicknameString}` });
    }
    if (!(pPlayers[i].discordUsername === "N/A")) embed.addFields({ name: "Their Discord Username", value: "```" + pPlayers[i].discordUsername + "```" });
    if (!(pPlayers[i].discordId === -1)) embed.addFields({ name: "Their Discord ID", value: "```" + pPlayers[i].discordId + "```" });
    await interaction.editReply({ embeds: [embed] });
    return;
}

async function addPlayerByIgn(database, ign, interaction) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=2c0cd9675ab32362391523973b878cab&search=${ign}`);
    const data = await response.json();
    let playerId = 0;
    try {
        playerId = data.data[0].account_id;
    } catch (error) {
        interaction.editReply("Couldn't find a player with the ign " + "```" + ign + "```");
        return;
    }
    for (let i = 0; i < database.players.length; i++) {
        if (database.players[i].playerId === playerId) {
            database.players[i].previousNicknames.push(database.players[i].ign);
            database.players[i].ign = data.data[0].nickname;
            fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
            buildResponse(database.players, i, interaction);
            return;
        }
    }
    if (data.data[0].nickname.toLowerCase() === ign.toLowerCase()) addPlayerByPlayerId(database, playerId, interaction);
    else interaction.editReply("Couldn't find a player with the ign " + "```" + ign + "```");
}

async function addPlayerByPlayerId(database, playerId, interaction) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=2c0cd9675ab32362391523973b878cab&account_id=${playerId}`);
    const data = makeJsonDataUsable(await response.json(), playerId);

    try {
        let testValue = data.data.player.nickname;
    } catch {
        interaction.editReply("No valid player has been found!");
        return;
    }

    database.players.push({
        "ign": data.data.player.nickname,
        "playerId": data.data.player.account_id,
        "previousNicknames": [],
        "discordUsername": "N/A",
        "discordId": -1
    });
    fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
    await interaction.editReply(`The Player you searched for wasn't a part of the database before, so I added it` + "```+ " + data.data.player.nickname + "```");

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Player info!")
        .addFields({ name: "Current Ingame name", value: "```" + data.data.player.nickname + "```" })
        .addFields({ name: "Player ID", value: "```" + data.data.player.account_id + "```" })
        .setTimestamp();
    await interaction.followUp({ embeds: [embed] });
}
