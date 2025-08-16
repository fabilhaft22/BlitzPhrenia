const { Events, EmbedBuilder } = require("discord.js")
const { getLogChannel } = require("../functions/getLogChannel")

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
        const logChannel = await getLogChannel(channel.guild, "serverLog");
        if (!logChannel) return; // no config or channel not found
        let category;

        if(channel.parent !== null) category = channel.parent.name;
        else category = "none"

        if(!logChannel) {console.log("failed to find logChannel (channelDelete.js line 6"); return;}
        if (channel.isVoiceBased()) {
            const embed = new EmbedBuilder()
                .setTitle("Voice channel deleted")
                .addFields({
                    name: "",
                    value: `
                    **Name:** ${channel.name}
                    **Category:** ${category}`
                })
                .setColor("Red")
                .setFooter({
                    text: `Channel ID: ${channel.id}`
                })
                .setTimestamp(Date.now())
            return logChannel.send({ embeds: [embed] })
        }
        else if (channel.isTextBased()) {
            const embed = new EmbedBuilder()
                .setTitle("Text channel deleted")
                .addFields({
                    name: "",
                    value: `
                    **Name:** ${channel.name}
                    **Category:** ${category}`
                })
                .setColor("Red")
                .setFooter({
                    text: `Channel ID: ${channel.id}`
                })
                .setTimestamp(Date.now())
            return logChannel.send({ embeds: [embed] })
        }
        //if all of these are true, its a category
        else if (!channel.isThread() && !channel.isThreadOnly() && !channel.isSendable() && !channel.isDMBased() && channel.parent === null) {
            const embed = new EmbedBuilder()
                .setTitle("Category deleted")
                .addFields({
                    name: "",
                    value: `
                    **Name:** ${channel.name}`
                })
                .setColor("Red")
                .setFooter({
                    text: `Category ID: ${channel.id}`
                })
                .setTimestamp(Date.now())
            return logChannel.send({ embeds: [embed] })
        }
    }
}