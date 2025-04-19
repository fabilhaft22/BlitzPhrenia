const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.inGuild()) {
            return interaction.reply({
                content: "❌ The commands of this bot cannot be used in DMs",
                ephemeral: true
            });
        }

        // Slash command
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`❌ No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`❌ Error executing slash command:`, error);
                const reply = { content: 'There was an error while executing this command!', ephemeral: true };
                interaction.replied || interaction.deferred
                    ? await interaction.followUp(reply)
                    : await interaction.reply(reply);
            }
        }

        // Autocomplete
        else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(`❌ Error in autocomplete for ${interaction.commandName}:`, error);
            }
        }

        // Button interaction
        else if (interaction.isButton()) {
            const customId = interaction.customId;
            const buttonHandler = interaction.client.buttons.get(customId); // or from another map, like `buttons.get(customId)`

            if (!buttonHandler) {
                console.error(`❌ No button handler for ID: ${customId}`);
                console.log('Received interaction:', interaction);
                return;
            }

            try {
                await buttonHandler.execute(interaction);
            } catch (error) {
                console.error(`❌ Error executing button handler for ID ${customId}:`, error);
            }
        }
    }
};
