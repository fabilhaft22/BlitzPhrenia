require('dotenv').config();

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Begin verification by logging into Wargaming'),

    async execute(interaction) {

        const loginUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=${process.env.WOTB_APPLICATION_ID}&redirect_uri=https://blitzphrenia-server.onrender.com/callback`;


        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Login with Wargaming')
                .setStyle(ButtonStyle.Link)
                .setURL(loginUrl)
        );

        await interaction.reply({ content: 'Click the button below to verify your account:', components: [row], ephemeral: true });
    },
};
