const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch"); // ensure installed
const { PlayerNicknames } = require("../../schemas/playerNicknames"); // Adjust path if needed

const APPLICATION_ID = "2c0cd9675ab32362391523973b878cab";

async function fetchByIgn(pIgn) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${APPLICATION_ID}&search=${pIgn}`);
        if (!response.ok) console.error("❌ API response not ok (IGN search)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching IGN:", error);
        return null;
    }
}

async function fetchPlayerIdByIgn(pIgn) {
    const response = await fetchByIgn(pIgn);
    try {
        return response?.data?.[0]?.account_id || null;
    } catch {
        return null;
    }
}

async function fetchPlayerById(pPlayerId) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${APPLICATION_ID}&account_id=${pPlayerId}`);
        if (!response.ok) console.error("❌ API response not ok (Player ID)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching by Player ID:", error);
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addplayer")
        .setDescription("Adds a player to the database")
        .addSubcommand(sub =>
            sub.setName('ign')
                .setDescription('Add player by IGN')
                .addStringOption(opt => opt.setName("ign").setDescription("Their in-game name").setRequired(true))
                .addStringOption(opt => opt.setName("discordusername").setDescription("Their Discord username (optional)"))
                .addIntegerOption(opt => opt.setName("discordid").setDescription("Their Discord ID (optional)"))
                .addStringOption(opt => opt.setName("previousnicknames").setDescription("Comma-separated previous IGNs (optional)"))
        )
        .addSubcommand(sub =>
            sub.setName('playerid')
                .setDescription('Add player by their player ID')
                .addIntegerOption(opt => opt.setName("playerid").setDescription("Player ID").setRequired(true))
                .addStringOption(opt => opt.setName("discordusername").setDescription("Their Discord username (optional)"))
                .addIntegerOption(opt => opt.setName("discordid").setDescription("Their Discord ID (optional)"))
                .addStringOption(opt => opt.setName("previousnicknames").setDescription("Comma-separated previous IGNs (optional)"))
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();
        const discordUsername = interaction.options.getString('discordusername') || "N/A";
        const discordId = interaction.options.getInteger('discordid') || -1;
        const prevNickOpt = interaction.options.getString('previousnicknames');
        const previousNicknames = prevNickOpt ? prevNickOpt.split(",").map(n => n.trim()).filter(n => n) : [];

        let playerId;
        let playerData;

        if (subcommand === "ign") {
            const ign = interaction.options.getString('ign');
            playerId = await fetchPlayerIdByIgn(ign);
            if (!playerId) {
                return interaction.editReply("❌ Could not find a player with that IGN.");
            }
        } else if (subcommand === "playerid") {
            playerId = interaction.options.getInteger('playerid');
        }

        const fullPlayerData = await fetchPlayerById(playerId);
        const player = fullPlayerData?.data?.[playerId];

        if (!player) {
            return interaction.editReply("❌ Could not retrieve data for that player.");
        }

        // Check if the player already exists
        const existing = await PlayerNicknames.findOne({ playerId });
        if (existing) {
            return interaction.editReply("⚠️ That player is already registered.");
        }

        const newPlayer = new PlayerNicknames({
            currentIgn: player.nickname,
            playerId: player.account_id,
            previousNicknames,
            discordUsername,
            discordId
        });

        await newPlayer.save();
        await interaction.editReply(`✅ Player **${player.nickname}** has been added to the database.`);
    }
};
