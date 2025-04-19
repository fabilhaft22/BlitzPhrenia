const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbutton')
        .setDescription('Adds a button to a message (interaction-based)')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('The ID of the message to edit')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('buttonlabel')
                .setDescription('The label of the button')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('buttonid')
                .setDescription('The custom ID for the button interaction')
                .setRequired(true)),

    async execute(interaction) {
        const messageId = interaction.options.getString('messageid');
        const buttonLabel = interaction.options.getString('buttonlabel');
        const buttonId = interaction.options.getString('buttonid');

        try {
            const message = await interaction.channel.messages.fetch(messageId);
            if (!message) {
                return interaction.reply({ content: 'Message not found.', ephemeral: true });
            }

            const button = new ButtonBuilder()
                .setCustomId(buttonId)
                .setLabel(buttonLabel)
                .setStyle(ButtonStyle.Primary); // or Secondary, Success, Danger

            const row = new ActionRowBuilder().addComponents(button);

            await message.edit({ components: [row] });

            return interaction.reply({ content: 'Button added to the message!', ephemeral: true });
        } catch (error) {
            return interaction.reply({ content: 'Error adding the button.', ephemeral: true });
        }
    },
};
