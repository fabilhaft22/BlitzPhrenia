const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available slash commands with their descriptions'),
  async execute(interaction) {
    const commands = await interaction.client.application.commands.fetch();

    const modPerms = [
      PermissionsBitField.Flags.KickMembers,
      PermissionsBitField.Flags.BanMembers,
      PermissionsBitField.Flags.ManageGuild,
      PermissionsBitField.Flags.ManageMessages,
      PermissionsBitField.Flags.Administrator,
      PermissionsBitField.Flags.ModerateMembers
    ];

    // Convert to command info array
    const commandInfos = commands.map(cmd => {
      let isMod = false;
      if (cmd.defaultMemberPermissions !== null) {
        try {
          const perms = new PermissionsBitField(BigInt(cmd.defaultMemberPermissions));
          isMod = modPerms.some(perm => perms.has(perm));
        } catch (err) {}
      }
      return {
        name: `/${cmd.name} ${isMod ? '🔒' : ''}`,
        value: `${cmd.description || 'No description provided.'}${isMod ? '\n**Moderator only**' : ''}`
      };
    });

    const pageSize = 10;
    const totalPages = Math.ceil(commandInfos.length / pageSize);
    let page = 0;

    const buildEmbed = (page) => {
      const embed = new EmbedBuilder()
        .setTitle('📖 Help Menu')
        .setDescription(`Page ${page + 1} of ${totalPages}`)
        .setColor('Blue');

      commandInfos
        .slice(page * pageSize, (page + 1) * pageSize)
        .forEach(cmd => embed.addFields({ name: cmd.name, value: cmd.value }));

      return embed;
    };

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('prev')
        .setLabel('⬅️ Previous')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('Next ➡️')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === totalPages - 1)
    );

    const message = await interaction.reply({
      embeds: [buildEmbed(page)],
      components: [row],
      fetchReply: true
    });

    const collector = message.createMessageComponentCollector({
      time: 60_000 // 1 minute
    });

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({ content: 'Only the command user can change pages.', ephemeral: true });
      }

      if (i.customId === 'prev') page--;
      if (i.customId === 'next') page++;

      // Update buttons
      const updatedRow = ActionRowBuilder.from(row);
      updatedRow.components[0].setDisabled(page === 0);
      updatedRow.components[1].setDisabled(page === totalPages - 1);

      await i.update({
        embeds: [buildEmbed(page)],
        components: [updatedRow]
      });
    });

    collector.on('end', async () => {
      await message.edit({ components: [] }).catch(() => null);
    });
  }
};
