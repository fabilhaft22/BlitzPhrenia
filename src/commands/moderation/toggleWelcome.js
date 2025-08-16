const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { LogGuilds } = require("../../schemas/logConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("togglewelcome")
        .setDescription("Enable or disable welcome messages")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guildLogs = await LogGuilds.findOne({ guildId: interaction.guild.id });
        if (!guildLogs || !guildLogs.welcomeChannel.channelId) {
            return interaction.reply({ content: "❌ Set a welcome channel first using `/setwelcome`.", ephemeral: true });
        }

        guildLogs.welcomeChannel.enabled = !guildLogs.welcomeChannel.enabled;
        await guildLogs.save();

        await interaction.reply({ 
            content: `✅ Welcome messages are now **${guildLogs.welcomeChannel.enabled ? "enabled" : "disabled"}**.`, 
            ephemeral: true 
        });
    }
};
