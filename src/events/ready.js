const { Events, ActivityType } = require("discord.js");
const { tanks } = require("../data/tanks");
const { LinkedPlayers } = require("../schemas/players");
const { PlayerNicknames } = require("../schemas/playerNicknames");

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(c) {
        console.log(`${c.user.tag} is online.`);

        await setActivity(c); // Set one immediately on start

        // Update randomly every 5 minutes (300,000 ms)
        setInterval(() => setActivity(c), 5 * 60 * 1000);
    }
};

const setActivity = async (c) => {
    const activity1 = {
        name: `storing ${Object.keys(tanks).length} tanks...`,
        type: ActivityType.Custom
    };

    const uniqueUserIds = new Set();

    // Loop through all guilds
    c.guilds.cache.forEach(guild => {
        // Add all non-bot members' IDs to the set
        guild.members.cache.forEach(member => {
            if (!member.user.bot) {
                uniqueUserIds.add(member.id);
            }
        });
    });

    // The total number of unique real users:
    const totalMembers = uniqueUserIds.size;

    const activity2 = {
        name: `stalking ${totalMembers} members across ${c.guilds.cache.size} servers.`,
        type: ActivityType.Custom
    };



    let linkedAccounts = 0;
    let nicknameAccounts = 0;

    try {
        linkedAccounts = await LinkedPlayers.countDocuments();
        nicknameAccounts = await PlayerNicknames.countDocuments();
    } catch (err) {
        console.error("Failed to count linked data:", err);
    }

    const totalAccounts = linkedAccounts + nicknameAccounts;

    const activity3 = {
        name: `stalking ${totalAccounts} ingame accounts.`,
        type: ActivityType.Custom
    };

    const activities = [activity1, activity2, activity3];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];

    c.user.setActivity(randomActivity);
};
