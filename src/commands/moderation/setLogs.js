const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const { LogGuilds } = require("../../schemas/logConfig");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setlog")
        .setDescription("Set a log channel for this server")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub.setName("messagelog")
                .setDescription("Set the message log channel")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(sub =>
            sub.setName("memberlog")
                .setDescription("Set the member log channel")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(sub =>
            sub.setName("serverlog")
                .setDescription("Set the server log channel")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(sub =>
            sub.setName("voicelog")
                .setDescription("Set the voice log channel")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(sub =>
            sub.setName("all")
                .setDescription("Set all logs to the same channel")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel").setRequired(true).addChannelTypes(ChannelType.GuildText))
        ),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const subcommand = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");

        const guildLogs = await LogGuilds.findOne({ guildId });
        if (!guildLogs) {
            return interaction.reply({
                content: "❌ Run `/setuplog` first to initialize logging.",
                ephemeral: true
            });
        }

        // Ensure the subdocument exists
        if (!guildLogs[subcommand]) guildLogs[subcommand] = {};

        // map subcommand names to schema keys
        const logMap = {
            messagelog: "messageLog",
            memberlog: "memberLog",
            serverlog: "serverLog",
            voicelog: "voiceLog",
            welcomechannel: "welcomeChannel",
            all: "all"
        };

        const schemaKey = logMap[subcommand];
        if (!schemaKey) return interaction.reply({ content: "Invalid log type.", ephemeral: true });

        // now safely update
        if (schemaKey === "all") {
            for (const key of Object.keys(guildLogs.toObject())) {
                if (key !== "guildId") { // skip guildId
                    guildLogs[key].channelId = channel.id;
                    guildLogs[key].enabled = true;
                }
            }
        }
        else {
            guildLogs[schemaKey].channelId = channel.id;
            guildLogs[schemaKey].enabled = true;
        }
        await guildLogs.save();
        await interaction.reply({
            content: `✅ ${schemaKey} channel set to ${channel}. Logging enabled.`,
            ephemeral: true
        });
    }
};
