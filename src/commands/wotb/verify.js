const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Begin verification by logging into Wargaming'),

    async execute(interaction) {
        const discordId = interaction.user.id;

        const loginUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=244eb09d25e047353297811743193e00&redirect_uri=https://blitzphrenia-server.onrender.com/callback`;


        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Login with Wargaming')
                .setStyle(ButtonStyle.Link)
                .setURL(loginUrl)
        );

        await interaction.reply({ content: 'Click the button below to verify your account:', components: [row], ephemeral: true });
    },
};
