const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { LogGuilds } = require("../../schemas/logConfig");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcome")
        .setDescription("Set the welcome channel for new members")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt =>
            opt.setName("channel")
                .setDescription("Select a channel for welcomes")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        let guildLogs = await LogGuilds.findOne({ guildId: channel.guild.id });
        if (!guildLogs) {
            // Initialize if it doesn't exist yet
            guildLogs = await LogGuilds.create({ guildId: channel.guild.id });
        }

        guildLogs.welcomeChannel.channelId = channel.id;
        guildLogs.welcomeChannel.enabled = true;

        await guildLogs.save();

        await interaction.reply({ content: `✅ Welcome channel set to ${channel}.`, ephemeral: true });
    }
};
