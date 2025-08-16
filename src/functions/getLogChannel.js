const { LogGuilds } = require("../schemas/logConfig");
const { ChannelType } = require("discord.js");

/**
 * Gets the configured log channel for a guild if logging is enabled.
 * @param {Guild} guild - The Discord guild object.
 * @param {"messageLog" | "memberLog" | "serverLog" | "voiceLog" | "welcomeChannel"} logType - The type of log.
 * @returns {Promise<TextChannel|null>} The log channel or null if not set/enabled.
 */
async function getLogChannel(guild, logType) {
    const guildLogs = await LogGuilds.findOne({ guildId: guild.id });
    if (!guildLogs) return null;

    const logSettings = guildLogs[logType];
    if (!logSettings || !logSettings.enabled || !logSettings.channelId) return null;

    const channel = guild.channels.cache.get(logSettings.channelId);

    // ensure it is a text channel before returning
    if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) return null;

    return channel;
}

module.exports = { 
    getLogChannel 
};
