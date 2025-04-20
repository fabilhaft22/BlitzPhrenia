const { SlashCommandBuilder } = require("discord.js");
const { PlayerNicknames } = require("../../schemas/playerNicknames"); // adjust if necessary

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editplayer')
        .setDescription("Edits a player afterwards")
        .addSubcommand(sub =>
            sub.setName('previousnicknames')
                .setDescription("Add previously known IGNs (comma-separated)")
                .addStringOption(opt => opt.setName('ign').setDescription("The current IGN").setRequired(true))
                .addStringOption(opt => opt.setName('previousnicknames').setDescription("The previous nicknames").setRequired(true))
        )
        .addSubcommand(sub =>
            sub.setName('discordusername')
                .setDescription("Edit the player's Discord username")
                .addStringOption(opt => opt.setName('ign').setDescription("The current IGN").setRequired(true))
                .addStringOption(opt => opt.setName('discordusername').setDescription("The new Discord username").setRequired(true))
        )
        .addSubcommand(sub =>
            sub.setName('discordid')
                .setDescription("Edit the player's Discord ID")
                .addStringOption(opt => opt.setName('ign').setDescription("The current IGN").setRequired(true))
                .addIntegerOption(opt => opt.setName('discordid').setDescription("The new Discord ID").setRequired(true))
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();
        const ign = interaction.options.getString('ign');

        const player = await PlayerNicknames.findOne({ currentIgn: { $regex: new RegExp(`^${ign}$`, 'i') } });

        if (!player) {
            return interaction.editReply(`❌ Could not find a player with IGN **${ign}**.`);
        }

        if (subcommand === "previousnicknames") {
            const input = interaction.options.getString('previousnicknames');
            const newNicknames = input.split(',').map(n => n.trim()).filter(n => n.length > 0);

            const addedNicknames = [];
            for (const nick of newNicknames) {
                if (!player.previousNicknames.includes(nick)) {
                    player.previousNicknames.push(nick);
                    addedNicknames.push(nick);
                }
            }

            if (addedNicknames.length > 0) {
                await player.save();
                return interaction.editReply(`✅ Added the following previous nicknames: ${addedNicknames.join(', ')}`);
            } else {
                return interaction.editReply("⚠️ No new nicknames were added (they already exist).");
            }

        } else if (subcommand === "discordusername") {
            const newUsername = interaction.options.getString('discordusername');
            player.discordUsername = newUsername;
            await player.save();
            return interaction.editReply(`✅ Updated Discord username to **${newUsername}**.`);

        } else if (subcommand === "discordid") {
            const newId = interaction.options.getInteger('discordid');
            player.discordId = newId;
            await player.save();
            return interaction.editReply(`✅ Updated Discord ID to **${newId}**.`);
        }
    }
};
