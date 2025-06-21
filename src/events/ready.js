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

    const activity2 = {
        name: `stalking ${c.guilds.cache.get('1358895730110238933')?.memberCount || 'some'} server members.`,
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
