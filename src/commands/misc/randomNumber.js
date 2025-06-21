const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomnumber')
        .setDescription('Generate a random number between two values')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('Minimum value (inclusive)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Maximum value (inclusive)')
                .setRequired(true)),
    async execute(interaction) {
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');
        if (min >= max) {
            return interaction.reply({ content: 'The minimum value must be less than the maximum value.', ephemeral: true });
        }
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return interaction.reply({ content: `Random number between ${min} and ${max}: **${randomNumber}**`, ephemeral: false });
    }
};