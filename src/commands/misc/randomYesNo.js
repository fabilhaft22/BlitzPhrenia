const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yes-no')
        .setDescription('Generate a random yes or no answer'),
    async execute(interaction) {
        const answers = ['Yes', 'No'];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        return interaction.reply({ content: `# **${randomAnswer}**`, ephemeral: false });
    }
};