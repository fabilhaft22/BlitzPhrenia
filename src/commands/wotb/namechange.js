const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const API_URL = "https://api.wotblitz.eu/wotb/account/info/";
const APPLICATION_ID = "2c0cd9675ab32362391523973b878cab";
const DB_PATH = "src/data/nicknames.json";

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

        const database = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
        const players = database.players;

        const updatedPlayers = [];
        const batchSize = 5;
        let statusLines = [];

        for (let i = 0; i < players.length; i++) {
            const { playerId, ign } = players[i];

            statusLines.push(`**${i + 1}:** Checking on **${ign}**`);

            const info = await fetchPlayerInfo(playerId);
            if (!info || !info.nickname) continue;

            const currentName = info.nickname;

            if (currentName !== ign) {
                updatedPlayers.push({ playerId, oldName: ign, newName: currentName });
                players[i].previousNicknames.push(ign);
                players[i].ign = currentName;
            }

            // Update the message every batch or at the end
            if ((i + 1) % batchSize === 0 || i === players.length - 1) {
                await interaction.editReply(statusLines.join("\n"));
                statusLines = []; // reset for next batch
            }
        }

        fs.writeFileSync(DB_PATH, JSON.stringify(database, null, 4));

        if (updatedPlayers.length === 0) {
            return interaction.editReply("✅ No one has changed their nickname.");
        }

        const result = "✅ The following players have changed their names:\n```" +
            updatedPlayers.map(p => `${p.oldName} -> ${p.newName}`).join("\n") +
            "```";

        await interaction.editReply(result);
    }
};
