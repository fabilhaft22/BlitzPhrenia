const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch"); // Make sure this is installed
const { PlayerNicknames } = require("../../schemas/playerNicknames"); // Adjust path if needed

const API_URL = "https://api.wotblitz.eu/wotb/account/info/";
const APPLICATION_ID = "2c0cd9675ab32362391523973b878cab";

async function fetchPlayerInfo(playerId) {
    try {
        const res = await fetch(`${API_URL}?application_id=${APPLICATION_ID}&account_id=${playerId}`);
        if (!res.ok) throw new Error(`API returned status ${res.status}`);
        const data = await res.json();
        return data?.data?.[playerId] || null;
    } catch (err) {
        console.error(`❌ Failed to fetch data for player ${playerId}:`, err);
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("checknamechanges")
        .setDescription("Checks for new name changes of registered members"),

    async execute(interaction) {
        await interaction.deferReply();

        const players = await PlayerNicknames.find();
        if (!players.length) {
            return interaction.editReply("❌ No players are currently registered.");
        }

        const updatedPlayers = [];
        const batchSize = 5;
        let statusLines = [];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const { playerId, currentIgn } = player;

            statusLines.push(`**${i + 1}:** Checking on **${currentIgn}**`);

            const info = await fetchPlayerInfo(playerId);
            if (!info || !info.nickname) continue;

            const currentName = info.nickname;

            if (currentName !== currentIgn) {
                updatedPlayers.push({ playerId, oldName: currentIgn, newName: currentName });

                // Update in database
                player.previousNicknames.push(currentIgn);
                player.currentIgn = currentName;
                await player.save();
            }

            if ((i + 1) % batchSize === 0 || i === players.length - 1) {
                await interaction.editReply(statusLines.join("\n"));
                statusLines = [];
            }
        }

        if (updatedPlayers.length === 0) {
            return interaction.editReply("✅ No one has changed their nickname.");
        }

        const result = "✅ The following players have changed their names:\n```" +
            updatedPlayers.map(p => `${p.oldName} -> ${p.newName}`).join("\n") +
            "```";

        await interaction.editReply(result);
    }
};
