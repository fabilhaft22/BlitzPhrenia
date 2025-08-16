require('dotenv').config();

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { PlayerNicknames } = require("../../schemas/playerNicknames");

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

        // MongoDB: Find players collection
        if (interaction.options.getSubcommand() === "playerid") {
            const playerId = interaction.options.getInteger('playerid');
            const player = await PlayerNicknames.findOne({ playerId: playerId });

            if (player) {
                buildResponse(player, interaction);
            } else {
                addPlayerByPlayerId(playerId, interaction);
            }
            return;
        }

        if (interaction.options.getSubcommand() === "ign") {
            const ign = interaction.options.getString('ign').toLowerCase();

            // Try finding player by currentIgn (case-insensitive)
            let player = await PlayerNicknames.findOne({ currentIgn: new RegExp(`^${ign}$`, "i") });

            if (player) {
                buildResponse(player, interaction);
                return;
            }

            // Try finding player by previousNicknames (case-insensitive)
            player = await PlayerNicknames.findOne({
                previousNicknames: { $elemMatch: { $regex: `^${ign}$`, $options: 'i' } }
            });

            if (player) {
                buildResponse(player, interaction);
            } else {
                addPlayerByIgn(ign, interaction);
            }
        }
    }
}
async function buildResponse(player, interaction) {
    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Player info!")
        .addFields({ name: "Current Ingame name", value: "```" + player.currentIgn + "```" })
        .addFields({ name: "Player ID", value: "```" + player.playerId + "```" })
        .setTimestamp();

    if (player.previousNicknames.length > 0) {
        let previousNicknameString = player.previousNicknames.join(", ");
        embed.addFields({ name: "Previous Ingame Names", value: "```" + previousNicknameString + "```" });
    }

    if (!player.discordUsername.startsWith("N/A")) embed.addFields({ name: "Their Discord Username", value: "```" + player.discordUsername + "```" });
    if (!player.discordId.startsWith("NO_DISCORD")) embed.addFields({ name: "Their Discord ID", value: "```" + player.discordId + "```" });

    await interaction.editReply({ embeds: [embed] });
}

async function addPlayerByIgn(ign, interaction) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${process.env.WOTB_APPLICATION_ID}&search=${ign}`);
    const data = await response.json();
    let playerId = 0;

    try {
        playerId = data.data[0].account_id;
    } catch (error) {
        interaction.editReply("Couldn't find a player with the ign " + "```" + ign + "```");
        return;
    }

    const existingPlayer = await PlayerNicknames.findOne({ playerId: playerId });
    if (existingPlayer) {
        existingPlayer.previousNicknames.push(existingPlayer.currentIgn);
        existingPlayer.currentIgn = data.data[0].nickname;
        await existingPlayer.save();  // Save changes to MongoDB
        buildResponse(existingPlayer, interaction);
        return;
    }

    if (data.data[0].nickname.toLowerCase() === ign.toLowerCase()) {
        addPlayerByPlayerId(playerId, interaction);
    } else {
        interaction.editReply("Couldn't find a player with the ign " + "```" + ign + "```");
    }
}

async function addPlayerByPlayerId(playerId, interaction) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${process.env.WOTB_APPLICATION_ID}&account_id=${playerId}`);
    const data = makeJsonDataUsable(await response.json(), playerId);

    try {
        let testValue = data.data.player.nickname;
    } catch {
        return interaction.editReply("No valid player has been found!");
    }

    const newPlayer = new PlayerNicknames({
        currentIgn: data.data.player.nickname,
        playerId: data.data.player.account_id,
        previousNicknames: [],
        discordUsername: `N/A_${data.data.player.account_id}`,
        discordId: `NO_DISCORD_${data.data.player.account_id}`
    });

    await newPlayer.save(); // Save to MongoDB
    await interaction.editReply(`The Player you searched for wasn't a part of the database before, so I added it` + "```+ " + data.data.player.nickname + "```");

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Player info!")
        .addFields({ name: "Current Ingame name", value: "```" + data.data.player.nickname + "```" })
        .addFields({ name: "Player ID", value: "```" + data.data.player.account_id + "```" })
        .setTimestamp();

    await interaction.followUp({ embeds: [embed] });
}
