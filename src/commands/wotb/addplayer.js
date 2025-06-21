const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch"); // ensure installed
const { PlayerNicknames } = require("../../schemas/playerNicknames"); // Adjust path if needed
const { fetchByIgn, fetchPlayerIdByIgn, fetchPlayerById } = require("../../functions/wotbUtils");

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
        let discordUsername = interaction.options.getString('discordusername') || "N/A";
        let discordId = interaction.options.getInteger('discordid') || -1;
        const prevNickOpt = interaction.options.getString('previousnicknames');
        const previousNicknames = prevNickOpt ? prevNickOpt.split(",").map(n => n.trim()).filter(n => n) : [];

        let playerId;

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

        if(discordUsername === "N/A") {
            discordUsername = `N/A_${player.account_id}`; // Use the player's current IGN as Discord username if not provided
        }

        if(discordId === -1) {
            discordId = `NO_DISCORD_${player.account_id}`; // Use the command invoker's ID if not provided
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
