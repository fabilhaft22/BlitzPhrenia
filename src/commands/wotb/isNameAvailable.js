const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("is-name-available")
        .setDescription("Check if a name is available")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("The name to check")
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString("name");

        
    }
}