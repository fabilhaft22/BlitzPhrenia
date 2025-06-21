const { SlashCommandBuilder } = require("discord.js");
const { getAllPlayerIds, fetchPlayerInfo } = require("../../functions/wotbUtils");
const { calculateBP } = require("../../functions/calculateBP");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wotb-leaderboard")
        .setDescription("Leaderboard for WOTB players related to this server."),

    async execute(interaction) {
        await interaction.deferReply();

        const playerIds = await getAllPlayerIds();
        const BPRatings = [];

        for (const playerId of playerIds) {
            const player = await fetchPlayerInfo(playerId);
            const stats = player?.statistics?.all;

            if (!stats || stats.battles < 100) continue; // Skip invalid or very low battle players

            const properties = {
                battles: stats.battles,
                winrate: (stats.wins / stats.battles) * 100,
                averageDamage: stats.damage_dealt / stats.battles,
                survivalRate: (stats.survived_battles / stats.battles) * 100
            };

            const bp = await calculateBP(properties);

            BPRatings.push({
                playerId,
                ign: player.nickname,
                bp
            });
        }

        // Sort and trim to top 25
        const top25 = BPRatings
            .sort((a, b) => b.bp - a.bp)
            .slice(0, 25);

        const leaderboard = top25
            .map((p, i) => {
                const safeIgn = p.ign.replace(/_/g, '\\_'); // Escape underscores
                return `**${i + 1}.** ${safeIgn} — **${p.bp} BP**`;
            })
            .join("\n");


        await interaction.editReply({
            content: `**Top 25 best players of the apes (with my custom BP-Rating, now piss off)**\n\n${leaderboard}`
        });
    }
};
