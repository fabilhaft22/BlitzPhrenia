const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch"); // ensure installed
const { tanks } = require("../../data/tanks");
const { formatJSON } = require("../../functions/formatJSON");
const { LinkedPlayers } = require("../../schemas/players"); // Adjust path if needed
const { fetchPlayerIdByIgn } = require("../../functions/wotbUtils");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("ownedtanks")
        .setDescription("Get a list of owned tanks")
        .addStringOption(option =>
            option.setName("ign")
                .setDescription("The players ingame name")
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName("tier")
                .setDescription("The tier of the tanks to show")
                .setMinValue(1)
                .setMaxValue(10)
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName("accesstoken")
                .setDescription("If the bot should try using an access token. This ensures that it only shows tanks you actually own.")
                .setRequired(false)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        let ign = interaction.options.getString("ign") || null;
        const tier = interaction.options.getInteger("tier") || -1;
        const useAccessToken = interaction.options.getBoolean("accesstoken") || false;

        const linkedPlayer = await LinkedPlayers.findOne({ discordId: interaction.user.id });


        if(!ign) {
            ign = linkedPlayer.ign || "N/A"
        }


        const playerId = await fetchPlayerIdByIgn(ign);
        if (!playerId) {
            return interaction.editReply("Could not find the player. Please check the IGN and try again.");
        }

        let accessToken = null;

        if (useAccessToken) {
            if (linkedPlayer && linkedPlayer.access_token && linkedPlayer.access_token !== "N/A") {
                accessToken = linkedPlayer.access_token;
            }
        }

        let statsUrl = `https://api.wotblitz.eu/wotb/tanks/stats/?application_id=244eb09d25e047353297811743193e00&account_id=${playerId}`;
        if (accessToken) {
            statsUrl += `&access_token=${accessToken}`;
        }

        const response = await fetch(statsUrl);
        const data = await response.json();

        if (data.status !== "ok") {
            return interaction.editReply("Failed to fetch data. Please check the IGN and try again. If the IGN is correct, the WG API might be down.");
        }

        const tankData = formatJSON(data);

        const nationFlags = {
            ussr: ":flag_ru:",
            germany: ":flag_de:",
            usa: ":flag_us:",
            china: ":flag_cn:",
            uk: ":flag_gb:",
            france: ":flag_fr:",
            japan: ":flag_jp:",
            european: ":flag_eu:",
            other: ":flag_black:",
        };

        // Step 1: Filter and collect tanks
        let result = [];

        for (let i = 0; i < tankData.length; i++) {
            const tankEntry = tankData[i];
            const tankId = tankEntry.tank_id.toString();
            const tankInfo = tanks[tankId];

            if (!tankInfo) continue;
            if (tier !== -1 && tankInfo.tier !== tier) continue;

            if (accessToken && tankEntry.in_garage === false) continue;

            const flag = nationFlags[tankInfo.nation] || "🏳️";
            result.push({
                name: `${flag} ${tankInfo.name}`,
                tier: tankInfo.tier,
                nation: tankInfo.nation
            });
        }

        // Step 2: Sort tanks by tier (descending) and then nation (alphabetically)
        result.sort((a, b) => {
            if (b.tier !== a.tier) return b.tier - a.tier;
            return a.nation.localeCompare(b.nation);
        });

        // Step 3: Group sorted tanks by tier
        const grouped = {};
        for (const tank of result) {
            if (!grouped[tank.tier]) grouped[tank.tier] = [];
            grouped[tank.tier].push(tank.name);
        }

        // Step 4: Format output
        const sortedTiers = Object.keys(grouped).map(Number).sort((a, b) => b - a);
        let finalString = "";
        for (const t of sortedTiers) {
            finalString += `**Tier ${t}:**\n`;
            finalString += grouped[t].join("\n") + "\n\n";
        }

        splitStringIntoChunks(interaction, ign, finalString, 1950);
    }
};

async function splitStringIntoChunks(interaction, ign, str, chunkSize) {
    const lines = str.split("\n");
    const chunks = [];
    let currentChunk = "";

    for (const line of lines) {
        // +1 accounts for the newline character
        if ((currentChunk + line + "\n").length > chunkSize) {
            chunks.push(currentChunk.trimEnd());
            currentChunk = "";
        }
        currentChunk += line + "\n";
    }

    if (currentChunk) {
        chunks.push(currentChunk.trimEnd());
    }

    // Send first chunk as main reply
    if (chunks.length > 0) {
        await interaction.editReply(`**The tanks of ${ign} :**\n${chunks[0]}`);
        // Send remaining as follow-ups
        for (let i = 1; i < chunks.length; i++) {
            await interaction.followUp(chunks[i]);
        }
    } else {
        await interaction.editReply("No tank data found.");
    }
}


// not actually useful in here but storing it here for later
function trimTankStats(apiResponse) {
    const rawStats = apiResponse.data;
    const trimmed = {};

    for (const accountId in rawStats) {
        trimmed[accountId] = rawStats[accountId].map(entry => ({
            tank_id: entry.tank_id,
            last_battle_time: entry.last_battle_time,
            battles: entry.all.battles,
            spotted: entry.all.spotted,
            shots: entry.all.shots,
            hits: entry.all.hits,
            wins: entry.all.wins,
            damage_dealt: entry.all.damage_dealt,
            damage_received: entry.all.damage_received,
            survived_battles: entry.all.survived_battles
        }));
    }

    return trimmed;
}