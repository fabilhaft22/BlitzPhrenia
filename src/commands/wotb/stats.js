const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { LinkedPlayers } = require("../../schemas/players");
const { fetchPlayerInfo, fetchPlayerIdByIgn, getAllPlayerIds } = require("../../functions/wotbUtils");
const { calculateBP } = require("../../functions/calculateBP");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wotb-stats")
        .setDescription("Get WOTB player stats")
        .addStringOption(option =>
            option.setName("player")
                .setDescription("Player name or ID")
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();


        const playerInput = interaction.options.getString("player");
        let player;

        if (!playerInput) {
            const databaseQuery = await LinkedPlayers.findOne({ discordId: interaction.user.id });
            player = await fetchPlayerInfo(databaseQuery.playerId);
        }
        else {
            if (isNaN(playerInput)) {
                const playerID = await fetchPlayerIdByIgn(playerInput.toLowerCase());
                player = await fetchPlayerInfo(playerID);
            }
            else {
                player = await fetchPlayerInfo(playerInput);
            }
        }

        if (!player || !player.statistics.all.battles) {
            return interaction.editReply("❌ Player not found or no battles recorded.");
        }

        const playerStatistics = player.statistics.all;

        const properties = {
            battles: playerStatistics.battles,
            winrate: (playerStatistics.wins / playerStatistics.battles) * 100,
            averageDamage: playerStatistics.damage_dealt / playerStatistics.battles,
            survivalRate: (playerStatistics.survived_battles / playerStatistics.battles) * 100
        }


        const BPRating = await calculateBP(properties);

        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`WOTB Stats for ${player.nickname}`)
            .addFields(

                { name: "BP Rating", value: BPRating.toString(), inline: true },
                { name: "BP Rank", value: "Loading...", inline: true }, // Will be updated later
                { name: "Battles", value: playerStatistics.battles.toString()},
                { name: "Winrate", value: `${properties.winrate.toFixed(2)}%`, inline: true },
                { name: "Survival Rate", value: `${properties.survivalRate.toFixed(2)}%`, inline: true },
                { name: "Average Damage", value: properties.averageDamage.toFixed(2).toString() },
            )
            .setThumbnail(player.avatar);

        await interaction.editReply({ embeds: [embed] });


        const playerIds = await getAllPlayerIds();
        const BPRatings = [];

        for (const playerId of playerIds) {
            const p = await fetchPlayerInfo(playerId);
            const s = p?.statistics?.all;

            if (!s || s.battles < 100) continue;

            const props = {
                battles: s.battles,
                winrate: (s.wins / s.battles) * 100,
                averageDamage: s.damage_dealt / s.battles,
                survivalRate: (s.survived_battles / s.battles) * 100
            };

            const bp = await calculateBP(props);

            BPRatings.push({
                playerId: p.account_id, // use correct identifier
                ign: p.nickname,
                bp
            });
        }

        // Sort and find rank
        BPRatings.sort((a, b) => b.bp - a.bp);

        const index = BPRatings.findIndex(p => p.playerId === player.account_id); // use correct identifier

        if (index !== -1) {
            embed.setFields(
                { name: "BP Rating", value: BPRating.toString(), inline: true },
                { name: "BP Rank", value: (index + 1).toString(), inline: true }, // Will be updated later
                { name: "Battles", value: playerStatistics.battles.toString()},
                { name: "Winrate", value: `${properties.winrate.toFixed(2)}%`, inline: true },
                { name: "Survival Rate", value: `${properties.survivalRate.toFixed(2)}%`, inline: true },
                { name: "Average Damage", value: properties.averageDamage.toFixed(2).toString() },
            );

            return interaction.editReply({ embeds: [embed] }); // update the message with the rank
        }
    }
}