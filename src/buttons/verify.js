module.exports = {
    data: {
        customId: 'verify',
    },
    async execute(interaction) {
        const member = interaction.member;
        const role = interaction.guild.roles.cache.find(role => role.name === 'member');
        
        if (!role) {
            return interaction.reply({ content: 'The member role does not exist.', ephemeral: true });
        }

        if (member.roles.cache.has(role.id)) {
            return interaction.reply({ content: 'You are already verified!', ephemeral: true });
        }


        try {
            await member.roles.add(role);
            await interaction.reply({ content: 'You have been verified!', ephemeral: true });
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: 'There was an error verifying you. Please try again later.', ephemeral: true });
        }
    }
}