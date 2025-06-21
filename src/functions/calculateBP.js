async function calculateBP(player) {
    const winrateNorm = player.winrate / 100;
    const dmgNorm = player.averageDamage / 3000;
    const survivalNorm = player.survivalRate / 100;

    const battleWeight = await getBattleWeight(player.battles);

    const weightWin = battleWeight * 0.6;      // increase winrate weight a bit
    const weightDmg = battleWeight * 0.25;     // decrease damage weight a bit
    const weightSurvival = battleWeight * 0.15;

    // Reduced penalty: max 20% penalty for lowest battles, less harsh curve
    const penalty = (1 - battleWeight) ** 1.5 * 0.2;

    const rating = (
        winrateNorm * weightWin +
        dmgNorm * weightDmg +
        survivalNorm * weightSurvival
    ) * 1000 * (1 - penalty);

    return Math.round(rating);
}

async function getBattleWeight(battles) {
    return Math.min(1, Math.log10(battles + 1) / Math.log10(5000));
}


module.exports = {
    calculateBP
};