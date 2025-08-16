const {Events, EmbedBuilder} = require("discord.js")
const { getLogChannel } = require("../functions/getLogChannel");

module.exports = {
    name: Events.GuildRoleCreate,
    async execute(role){
        const logChannel = await getLogChannel(role.guild, "serverLog");

        if(!logChannel) return

        const embed = new EmbedBuilder()
            .setTitle("A new role was created")
            .addFields({
                name: "", value: `**Name:** ${role.name}\n **Color:** ${role.hexColor}\n**Mentionable**: ${role.mentionable}\n**Displayed seperately:** ${role.hoist}`
            })
            .setColor("Gold")
            .setFooter({
                text: `Role ID: ${role.id}`
            })
            .setTimestamp(Date.now())

            logChannel.send({embeds: [embed]})
    }
}