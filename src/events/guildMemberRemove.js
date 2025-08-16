const { Events, AuditLogEvent, EmbedBuilder } = require("discord.js");
const { getLogChannel } = require("../functions/getLogChannel")

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        const guild = member.guild;
        const logChannel = await getLogChannel(guild, "memberLog"); // Log channel for server events
        const notificationChannel = await getLogChannel(member.guild, "welcomeChannel")  // Channel for notifying

        

        // Send a notification to a specific channel
        if (notificationChannel) {
            await notificationChannel.send(`${member.user.username}/<@${member.id}> just left the server.`);
        } else {
            console.log("Failed to find notification channel");
        }


        if (!logChannel) return
        
        const roles = member.roles.cache
            .filter(role => role.id !== member.guild.id) // Exclude @everyone role
            .map(role => `<@&${role.id}>`) // Format as mention
            .join(", ") || "No roles"; // Default text if no roles

        // Introduce a short delay to ensure audit logs update
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Step 1: Check if the user was banned (includes audit logs for reason & executor)
        const fetchedBanLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanAdd,
        });

        const banLog = fetchedBanLogs.entries.first();
        if (banLog) {
            const { target, executor, reason, createdTimestamp } = banLog;

            // Ensure the audit log entry is recent to prevent false positives
            const timeDiff = Date.now() - createdTimestamp;
            if (target.id === member.id && timeDiff < 5000) { // 5s threshold
                const embed = new EmbedBuilder()
                    .setTitle(`${executor.username} banned someone`)
                    .setAuthor({
                        name: member.user.username,
                        icon: member.displayAvatarURL()
                    })
                    .addFields(
                        { name: "The banned user", value: `<@${member.id}>` },
                        { name: "Reason", value: `${reason || "No reason provided."}` },
                        { name: "joined", value: formatJoinDate(member.joinedAt) },
                        { name: "roles:", value: `${roles}` }
                    )
                    .setColor("Red")
                    .setFooter({
                        text: `ID: ${member.user.id}`
                    })
                    .setTimestamp(Date.now());

                return logChannel.send({ embeds: [embed] });
            }
        }

        // Step 2: Check if the user was kicked
        const fetchedKickLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });

        const kickLog = fetchedKickLogs.entries.first();
        if (kickLog) {
            const { target, executor, reason, createdTimestamp } = kickLog;

            const timeDiff = Date.now() - createdTimestamp;
            if (target.id === member.id && timeDiff < 5000) { // 5s threshold
                const embed = new EmbedBuilder()
                    .setTitle(`${executor.username} kicked someone`)
                    .setAuthor({
                        name: member.user.username,
                        icon: member.displayAvatarURL()
                    })
                    .addFields(
                        { name: "The kicked user", value: `<@${member.id}>` },
                        { name: "Reason", value: `${reason || "No reason provided."}` },
                        { name: "joined", value: formatJoinDate(member.joinedAt) },
                        { name: "roles:", value: `${roles}` }
                    )
                    .setColor("Red")
                    .setFooter({
                        text: `ID: ${member.user.id}`
                    })
                    .setTimestamp(Date.now());

                return logChannel.send({ embeds: [embed] });
            }
        }

        // Step 3: If no ban and no recent kick, assume they left voluntarily
        const embed = new EmbedBuilder()
            .setTitle(`Someone left the server`)
            .setAuthor({
                name: member.user.username,
                icon: member.displayAvatarURL()
            })
            .addFields(
                { name: "User", value: `<@${member.id}>` },
                { name: "joined", value: formatJoinDate(member.joinedAt) },
                { name: "roles:", value: `${roles}` }
            )
            .setColor("Red")
            .setFooter({
                text: `ID: ${member.user.id}`
            })
            .setTimestamp(Date.now());

        return logChannel.send({ embeds: [embed] });
    }
};

// Helper function to format the "joined" field with singular/plural logic and "ago"
function formatJoinDate(joinedAt) {
    const now = Date.now();
    const diffInMs = now - joinedAt;

    // If the difference is less than a minute, return "Just now"
    if (diffInMs < 1000 * 60) {
        return "Just now";
    }

    // Calculate time difference in hours, minutes, and days
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    let formattedTime = "";

    if (days > 0) formattedTime += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return formattedTime.trim() + " ago";
}

