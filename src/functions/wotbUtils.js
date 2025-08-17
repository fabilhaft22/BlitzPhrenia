require("dotenv").config();


const APP_ID = process.env.WOTB_APPLICATION_ID;

async function fetchPlayerInfo(playerId) {
    try {
        const res = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${APP_ID}&account_id=${playerId}`);
        if (!res.ok) throw new Error(`API returned status ${res.status}`);
        const data = await res.json();
        return data?.data?.[playerId] || null;
    } catch (err) {
        console.error(`❌ Failed to fetch data for player ${playerId}:`, err);
        return null;
    }
}

async function fetchPlayerIdByIgn(ign) {
    const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${APP_ID}&search=${ign.toLowerCase()}`);
    const data = await response.json();

    if (data.status === "ok" && data.meta.count > 0 && data.data[0].nickname.toLowerCase() === ign.toLowerCase()) {
        return data.data[0].account_id;
    } else {
        return null;
    }
}

async function fetchByIgn(ign) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/list/?application_id=${APP_ID}&search=${ign}`);
        if (!response.ok) console.error("❌ API response not ok (IGN search)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching IGN:", error);
        return null;
    }
}

async function fetchPlayerById(pPlayerId) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/account/info/?application_id=${APP_ID}&account_id=${pPlayerId}`);
        if (!response.ok) console.error("❌ API response not ok (Player ID)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching by Player ID:", error);
        return null;
    }
}


async function fetchTankDetails(tankId) {
    try {
        const response = await fetch(`https://api.wotblitz.eu/wotb/encyclopedia/vehicles/?application_id=${APP_ID}&tank_id=${tankId}`);
        if (!response.ok) console.error("❌ API response not ok (Tank details)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching tank details:", error);
        return null;
    }
}

/**
 * 
 * @param {number} tankId 
 * @param {number} gunId
 * @param {number} engineId
 * @param {number} ChassisId
 * @param {number} turretId
 * @returns {Promise<JSON>} Returns the tank details with specified modules
 */
async function fetchTankDetailsSingleModules(tankId, gunId = null, engineId = null, ChassisId = null, turretId = null) {

    let API_CALL = `https://api.wotblitz.eu/wotb/encyclopedia/vehicleprofile/?application_id=${APP_ID}&tank_id=${tankId}`;

    if (gunId) API_CALL += `&gun_id=${gunId}`;
    if (engineId) API_CALL += `&engine_id=${engineId}`;
    if (ChassisId) API_CALL += `&chassis_id=${ChassisId}`;
    if (turretId) API_CALL += `&turret_id=${turretId}`;

    try {
        const response = await fetch(API_CALL);
        if (!response.ok) console.error("❌ API response not ok (Single modules)");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching tank details with single modules:", error);
        return null;
    }
}

/**
 * Take a tank object from the /vehicles API via the tank ID,
 * find the "top" module IDs by picking the one
 * with the highest XP price for each module type.
 */
async function getTopModulesFromVehicle(tankData) {

    const modulesTree = tankData.modules_tree;
    if (!modulesTree) return null;

    // Group modules by type
    const grouped = {};
    for (const moduleId in modulesTree) {
        const module = modulesTree[moduleId];
        const type = module.type; // e.g. "vehicleGun", "vehicleEngine"
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(module);
    }

    // Pick the most expensive XP module per type
    const topModules = {};
    for (const type in grouped) {
        const modules = grouped[type];
        const best = modules.reduce((prev, curr) =>
            curr.price_xp > prev.price_xp ? curr : prev
        );
        topModules[type] = best.module_id;
    }

    return topModules;
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
    fetchTankDetails,
    getTopModulesFromVehicle,
    fetchTankDetailsSingleModules,
    getAllPlayerIds
}