const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const { LinkedPlayers } = require('../../schemas/players');
const { fetchPlayerIdByIgn } = require('../../functions/wotbUtils');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your WoT Blitz account to your Discord account')
        .addStringOption(option =>
            option.setName('ign')
                .setDescription('Your in-game name')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        const ign = interaction.options.getString('ign');
        const discordId = interaction.user.id;

        const playerId = await fetchPlayerIdByIgn(ign);

        if (!playerId) {
            return interaction.editReply("❌ Player not found. Please check the IGN and try again.");
        }

        // Check if this WoT Blitz player is already linked to someone else
        const existingPlayer = await LinkedPlayers.findOne({ playerId });
        if (existingPlayer && existingPlayer.discordId !== discordId) {
            return interaction.editReply("❌ This player is already linked to another Discord account.");
        }

        // Remove any previous link for this Discord user
        await LinkedPlayers.deleteMany({ discordId });

        // Create a new link
        const newPlayer = new LinkedPlayers({
            ign,
            playerId,
            discordId,
            access_token: "N/A",
        });

        await newPlayer.save();

        return interaction.editReply(`✅ Player **${ign}** linked successfully!\n(Previous link, if any, has been replaced)\nUse \`/verify\` to verify your account.`);
    },
}
