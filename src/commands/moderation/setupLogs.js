const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { LogGuilds } = require("../../schemas/logConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuplogs")
        .setDescription("Initialize the log configuration for this server")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guildId = interaction.guild.id;

        // Check if it already exists
        let existing = await LogGuilds.findOne({ guildId });
        if (existing) {
            return interaction.reply({ content: "❌ Logging is already initialized for this server. Use ``/setlog <Type>`` to edit log channels", ephemeral: true });
        }

        // Create document with all subdocuments initialized
        const guildLogs = new LogGuilds({
            guildId,
            messageLog: { channelId: null, enabled: false },
            memberLog: { channelId: null, enabled: false },
            serverLog: { channelId: null, enabled: false },
            voiceLog: { channelId: null, enabled: false },
            welcomeChannel: { channelId: null, enabled: false },
        });

        await guildLogs.save();
        await interaction.reply({ content: "✅ Logging setup initialized for this server. Use ``/setlog <Type>`` to edit log channels", ephemeral: true });
    }
};
