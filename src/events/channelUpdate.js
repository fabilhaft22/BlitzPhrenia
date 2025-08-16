const { Events, EmbedBuilder } = require("discord.js");
const { getLogChannel } = require("../functions/getLogChannel");

module.exports = {
    name: Events.ChannelUpdate,
    async execute(oldChannel, newChannel) {
        const logChannel = await getLogChannel(newChannel.guild, "serverLog");
        if (!logChannel) return; // no config or channel not found

        let changes = [];

        if (oldChannel.name !== newChannel.name) {
            changes.push(`**Name:** \`${oldChannel.name}\` → \`${newChannel.name}\``);
        }

        if (oldChannel.parentId !== newChannel.parentId) {
            const oldCategory = oldChannel.parent ? oldChannel.parent.name : "None";
            const newCategory = newChannel.parent ? newChannel.parent.name : "None";
            changes.push(`**Category:** \`${oldCategory}\` → \`${newCategory}\``);
        }

        if (changes.length <= 0) return;

        const embed = new EmbedBuilder()
            .setTitle(`Channel "${newChannel.name}" updated`)
            .setDescription(changes.join("\n"))
            .setColor("Blue")
            .setFooter({ text: `Channel ID: ${newChannel.id}` })
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
};
