const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

function makeJsonDataUsable(pJsonData, pPlayerId) {
    return JSON.parse(JSON.stringify(pJsonData).replace(`${pPlayerId}`, "player"));
}

async function fetchByIgn(pIgn) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=2c0cd9675ab32362391523973b878cab&search=${pIgn}`);
        if (!response.ok) {
            console.log("error occurred fetching the request, response code isn't ok");
        }
        return await response.json();
    } catch (error) {
        console.log("an error occurred while fetching the request");
        console.log(error);
        return null;
    }
}

async function fetchPlayerIdByIgn(pIgn) {
    const response = await fetchByIgn(pIgn);
    try {
        return response.data[0].account_id;
    } catch (error) {
        return null;
    }
}

async function fetchPlayerById(pPlayerId) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=2c0cd9675ab32362391523973b878cab&account_id=${pPlayerId}`);
        if (!response.ok) {
            console.log("error occurred fetching the request, response code isn't ok");
        }
        return await response.json();
    } catch (error) {
        console.log("an error occurred while fetching the request");
        console.log(error);
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addplayer")
        .setDescription("adds a player to the database")
        .addSubcommand(subcommand =>
            subcommand
                .setName('ign')
                .setDescription('add player by ign')
                .addStringOption(option =>
                    option
                        .setName("ign")
                        .setDescription("the user's current ign")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("discordusername")
                        .setDescription("their discord username (optional)")
                )
                .addIntegerOption(option =>
                    option
                        .setName("discordid")
                        .setDescription("their discord id (optional)")
                )
                .addStringOption(option =>
                    option
                        .setName('previousnicknames')
                        .setDescription('add previously known igns (add a comma between each nickname to properly separate them) (optional)')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playerid')
                .setDescription('if you somehow have the playerid, add the player by their player id')
                .addIntegerOption(option =>
                    option
                        .setName("playerid")
                        .setDescription("the player's playerid")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("discordusername")
                        .setDescription("their discord username (optional)")
                )
                .addIntegerOption(option =>
                    option
                        .setName("discordid")
                        .setDescription("their discord id (optional)")
                )
                .addStringOption(option =>
                    option
                        .setName('previousnicknames')
                        .setDescription('add previously known igns (add a comma between each nickname to properly separate them) (optional)')
                )
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const database = JSON.parse(fs.readFileSync("src/data/nicknames.json", "utf-8"));
        const ign = interaction.options.getString('ign');
        const playerId = await fetchPlayerIdByIgn(ign);
        const discordUsername = interaction.options.getString('discordusername') || "N/A";
        const discordId = interaction.options.getInteger('discordid') || -1;
        const previousNicknames = interaction.options.getString('previousnicknames') ? interaction.options.getString('previousnicknames').split(",") : [];

        if (interaction.options.getSubcommand() === "playerid") {
            const playerId = interaction.options.getInteger('playerid');
            const playerData = await fetchPlayerById(playerId);
            if (playerData) {
                addPlayerByPlayerId(database, playerData, discordUsername, discordId, previousNicknames, interaction);
            } else {
                interaction.editReply("Player not found with the provided Player ID.");
            }
            return;
        }

        if (interaction.options.getSubcommand() === "ign") {
            if (playerId) {
                const playerData = await fetchPlayerById(playerId);
                if (playerData) {
                    addPlayerByPlayerId(database, playerData, discordUsername, discordId, previousNicknames, interaction);
                }
            } else {
                interaction.editReply("No player found with the given IGN.");
            }
            return;
        }
    }
}

async function addPlayerByPlayerId(database, playerData, discordUsername, discordId, previousNicknames, interaction) {
    database.players.push({
        "ign": playerData.data.player.nickname,
        "playerId": playerData.data.player.account_id,
        "previousNicknames": previousNicknames,
        "discordUsername": discordUsername,
        "discordId": discordId
    });

    fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
    await interaction.editReply(`Added player ${playerData.data.player.nickname} to the database.`);
}
