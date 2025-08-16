const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { LogGuilds } = require("../../schemas/logConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("togglelog")
        .setDescription("Enable or disable logging")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub.setName("enable")
                .setDescription("Enable a log type")
                .addStringOption(opt => opt.setName("type").setDescription("Log type").setRequired(true).addChoices(
                    { name: "Message Log", value: "messageLog" },
                    { name: "Member Log", value: "memberLog" },
                    { name: "Server Log", value: "serverLog" },
                    { name: "Voice Log", value: "voiceLog" },
                    { name: "All", value: "all" }
                ))
        )
        .addSubcommand(sub =>
            sub.setName("disable")
                .setDescription("Disable a log type")
                .addStringOption(opt => opt.setName("type").setDescription("Log type").setRequired(true).addChoices(
                    { name: "Message Log", value: "messageLog" },
                    { name: "Member Log", value: "memberLog" },
                    { name: "Server Log", value: "serverLog" },
                    { name: "Voice Log", value: "voiceLog" },
                    { name: "All", value: "all" }
                ))
        ),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const subcommand = interaction.options.getSubcommand();
        const type = interaction.options.getString("type");
        const enable = subcommand === "enable";

        let guildLogs = await LogGuilds.findOne({ guildId });
        if (!guildLogs) {
            return interaction.reply({ content: "❌ Run `/setuplog` first to initialize logging.", ephemeral: true });
        }

        if (type === "all") {
            guildLogs.messageLog.enabled = enable;
            guildLogs.memberLog.enabled = enable;
            guildLogs.serverLog.enabled = enable;
            guildLogs.voiceLog.enabled = enable;
        } else {
            guildLogs[type].enabled = enable;
        }

        await guildLogs.save();

        await interaction.reply({ content: `✅ ${type === "all" ? "All logs have" : `${type} has`} been ${enable ? "enabled" : "disabled"}.`, ephemeral: true });
    }
};
