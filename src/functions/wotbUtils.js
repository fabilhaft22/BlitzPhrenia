require("dotenv").config();

async function fetchPlayerInfo(playerId) {
    try {
        const res = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${process.env.WOTB_APPLICATION_ID}&account_id=${playerId}`);
        if (!res.ok) throw new Error(`API returned status ${res.status}`);
        const data = await res.json();
        return data?.data?.[playerId] || null;
    } catch (err) {
        console.error(`❌ Failed to fetch data for player ${playerId}:`, err);
        return null;
    }
}

async function fetchPlayerIdByIgn(ign) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${process.env.WOTB_APPLICATION_ID}&search=${ign.toLowerCase()}`);
    const data = await response.json();

    if (data.status === "ok" && data.meta.count > 0 && data.data[0].nickname.toLowerCase() === ign.toLowerCase()) {
        return data.data[0].account_id;
    } else {
        return null;
    }
}

async function fetchByIgn(ign) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${process.env.WOTB_APPLICATION_ID}&search=${ign}`);
        if (!response.ok) console.error("❌ API response not ok (IGN search)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching IGN:", error);
        return null;
    }
}

async function fetchPlayerById(pPlayerId) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${process.env.WOTB_APPLICATION_ID}&account_id=${pPlayerId}`);
        if (!response.ok) console.error("❌ API response not ok (Player ID)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching by Player ID:", error);
        return null;
    }
}

const { LinkedPlayers } = require("../schemas/players");
const { PlayerNicknames } = require("../schemas/playerNicknames");

/**
 * Fetches all unique playerIds from both the LinkedPlayers and PlayerNicknames collections.
 * @returns {Promise<string[]>} Array of player IDs
 */
async function getAllPlayerIds() {
    try {
        const linkedPlayers = await LinkedPlayers.find({}, 'playerId');
        const nicknamedPlayers = await PlayerNicknames.find({}, 'playerId');

        const ids = [
            ...linkedPlayers.map(p => p.playerId),
            ...nicknamedPlayers.map(p => p.playerId)
        ];

        // Remove duplicates using Set
        const uniquePlayerIds = [...new Set(ids)];

        return uniquePlayerIds;
    } catch (error) {
        console.error("❌ Error fetching player IDs:", error);
        return [];
    }
}

module.exports = {
    fetchPlayerInfo,
    fetchPlayerIdByIgn,
    fetchByIgn,
    fetchPlayerById,
    getAllPlayerIds
}