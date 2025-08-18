const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { tanks, shellMapping } = require('../../data/tanks');
const { fetchTankDetails, getTopModulesFromVehicle, fetchTankDetailsSingleModules } = require("../../functions/wotbUtils");
const { createCanvas, loadImage } = require("canvas")
const fetch = require('node-fetch'); // Use 'require' for node-fetch 2.x
const sharp = require('sharp'); // Use 'require' for sharp

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tank-characteristics')
        .setDescription('Fetches characteristics of a specific tank')
        .addStringOption(option =>
            option
                .setName('tank')
                .setDescription('The tank to fetch characteristics for')
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused(); // user input
        const entries = Object.entries(tanks); // [id, {name, nation, tier}, ...]

        const filtered = entries.filter(([id, tank]) =>
            tank.name.toLowerCase().includes(focusedValue.toLowerCase())
        );

        await interaction.respond(
            filtered.slice(0, 25).map(([id, tank]) => ({
                name: tank.name, // what the user sees
                value: id        // what gets passed to execute()
            }))
        );
    },

    async execute(interaction) {
        await interaction.deferReply()
        const tankId = interaction.options.getString('tank'); // the ID from autocomplete
        const tank = tanks[tankId];

        if (!tank) {
            return interaction.editReply({ content: `Tank "${tankId}" not found.`, ephemeral: true });
        }

        const allDetails = (await fetchTankDetails(tankId)).data[tankId];

        if (allDetails === null) {
            return interaction.editReply({ content: "The tank " + "``" + `${tank.name} (Tier ${tank.tier}, ${tank.nation})` + "``" + ` is not in the official Wargaming Tankopedia (encyclopedia), so I can´t provide any info on this tank.` })
        }

        const topModules = await getTopModulesFromVehicle(allDetails);
        const details = (await fetchTankDetailsSingleModules(
            tankId, topModules?.vehicleGun, topModules?.vehicleEngine, topModules?.vehicleChassis, topModules?.vehicleTurret)
        ).data[tankId];

        const survivability = {
            TANK_IMG: allDetails.images.normal,
            HP: details.hp,
            Armor: {
                Turret: [details.armor.turret.front, details.armor.turret.sides, details.armor.turret.rear],
                Hull: [details.armor.hull.front, details.armor.hull.sides, details.armor.hull.rear]
            },
            firechance: `${details.engine.fire_chance * 100}%`,
            view_range: details.turret.view_range + "m",
            //i cant find concealment values, look into this later
        }

        const firepower = {
            Caliber: details.gun.caliber + "mm",
            DPM: (details.gun.fire_rate * details.shells[0].damage).toFixed(0),
            Reload_time: (60 / details.gun.fire_rate).toFixed(2) + "s",
            Shell_reload_time: (details.gun.clip_reload_time.toFixed(2) + "s"),
            Shell_capacity: details.gun.clip_capacity,
            Average_Penetration: [
                [shellMapping[details.shells[0].type], details.shells[0].penetration + "mm"],
                [shellMapping[details.shells[1]?.type] || null, details.shells[1]?.penetration + "mm" || null],
                [shellMapping[details.shells[2]?.type] || null, details.shells[2]?.penetration + "mm" || null]
            ],
            Average_Damage: [
                [shellMapping[details.shells[0].type], details.shells[0].damage],
                [shellMapping[details.shells[1]?.type] || null, details.shells[1]?.damage || null],
                [shellMapping[details.shells[2]?.type] || null, details.shells[2]?.damage || null]
            ],
            Aiming_Time: details.gun.aim_time.toFixed(1) + "s",
            Dispersion: details.gun.dispersion.toFixed(2) + "m",
            Gun_Turn_Limits: [
                ["Elevation", details.gun.move_up_arc],
                ["Depression", details.gun.move_down_arc],
                ["Turret turning left", details.turret.traverse_left_arc],
                ["Turret turning right", details.turret.traverse_right_arc]
            ]
        }

        const manueverability = {
            Max_Speed: details.speed_forward + " km/h",
            Reverse_Speed: details.speed_backward + " km/h",
            Power_to_Weight_Ratio: (details.engine.power / (details.weight / 1000)).toFixed(2) + " hp/t",
            Weight: (details.weight / 1000) + " t",
            Turret_Traverse_Speed: details.turret.traverse_speed.toFixed(2) + " deg/s",
            Hull_Traverse_Speed: details.suspension.traverse_speed.toFixed(2) + " deg/s",
        }

        const canvasBuffer = await generateTankCanvas(
            `${tank.name} (Tier ${tank.tier}, ${tank.nation})`,
            "images/aurora.png", // replace with your local image path
            survivability,
            firepower,
            manueverability
        );

        const attachment = new AttachmentBuilder(canvasBuffer, { name: "tank.png" });

        return interaction.editReply({ files: [attachment] });
    }
};


async function generateTankCanvas(tankName, backgroundPath, survivability, firepower, manueverability) {
    const width = 850;
    const height = 650;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const background = await loadImage(backgroundPath);
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    let yOffset = 60;
    const padding = 20;
    const lineHeight = 24; // slightly smaller text
    ctx.font = "bold 28px Arial";
    ctx.fillText(tankName, 175, yOffset);
    yOffset += 60;
    ctx.font = "px Arial";

    // Get the tank icon
    const pfpUrl = survivability.TANK_IMG;

    // Fetch the avatar image (webp or png)
    const response = await fetch(pfpUrl);
    const buffer = await response.buffer();

    // Convert the image to PNG using sharp (to ensure it's in a supported format)
    const image = await sharp(buffer).toFormat("png").toBuffer();

    // Load the tankIcon from the buffer (not from the URL)
    const tankIcon = await loadImage(image);


    const tankIconWidth = 110;
    ctx.drawImage(tankIcon, 65, 10, tankIconWidth, tankIconWidth * 0.73)


    function drawCategoryBox(title, startX, startY, stats) {
        // calculate height based on lines
        let lines = 0;
        stats.forEach(stat => {
            if (Array.isArray(stat.value)) lines += stat.value.length + 1;
            else lines += 1;
        });
        const boxHeight = lines * lineHeight + 60;

        // calculate width dynamically based on content (approximate)
        const boxWidth = 350;

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(startX - padding / 2, startY - 30, boxWidth, boxHeight);

        ctx.fillStyle = "white";
        ctx.font = "bold 22px Arial";
        ctx.fillText(title, startX + 10, startY);

        ctx.font = "oblique 16px Arial";
        let statY = startY + 30;
        stats.forEach(stat => {
            if (Array.isArray(stat.value)) {
                if (Number.isInteger(stat.value[0])) {
                    ctx.fillText(`${stat.name}:`, startX + 20, statY);
                    statY += lineHeight;
                    stat.value.forEach((val, i) => {
                        const label = i === 0 ? "Front" : i === 1 ? "Sides" : "Rear";
                        ctx.fillText(`- ${label}: ${val}`, startX + 40, statY);
                        statY += lineHeight;
                    });
                }
                else {
                    ctx.fillText(`${stat.name}:`, startX + 20, statY);
                    statY += lineHeight;
                    stat.value.forEach((val, i) => {
                        if (!((val[0] === "Turret turning left" && val[1] === 180) || val[0] === "Turret turning right" && val[1] === 180)) {
                            const label = i === 0 ? `${val[0]}` : i === 1 ? `${val[0]}` : `${val[0]}`;
                            if (val[0]) {
                                ctx.fillText(`- ${label}: ${val[1]}`, startX + 40, statY);
                                statY += lineHeight;
                            }
                        }
                    });
                }
            } else {
                ctx.fillText(`${stat.name}: ${stat.value}`, startX + 20, statY);
                statY += lineHeight;
            }
        });

        return startY + boxHeight + 20;
    }

    // Two-column layout: Survivability left, Maneuverability right
    const leftX = 75;
    const rightX = 460;

    // Survivability
    let nextY = drawCategoryBox("Survivability", leftX, yOffset, [
        { name: "HP", value: survivability.HP },
        { name: "Turret Armour", value: survivability.Armor.Turret },
        { name: "Hull Armour", value: survivability.Armor.Hull },
        { name: "Chance to be set on fire", value: survivability.firechance },
        { name: "View Range", value: survivability.view_range }
    ]);

    const maneuverabilityY = Math.max(rightX, yOffset + 0);
    // Maneuverability
    drawCategoryBox("Maneuverability", leftX, maneuverabilityY, [
        { name: "Max Speed", value: manueverability.Max_Speed },
        { name: "Reverse Speed", value: manueverability.Reverse_Speed },
        { name: "Power/Weight", value: manueverability.Power_to_Weight_Ratio },
        { name: "Turret Traverse", value: manueverability.Turret_Traverse_Speed },
        { name: "Hull Traverse", value: manueverability.Hull_Traverse_Speed }
    ]);


    firepowerArray = [
        { name: "Caliber", value: firepower.Caliber },
        { name: "DPM", value: firepower.DPM }
    ]


    if (firepower.Shell_capacity > 1) {
        firepowerArray.push(
            { name: "Magazine Reload Time", value: firepower.Reload_time },
            { name: "Shell Reload Time", value: firepower.Shell_reload_time },
            { name: "Shells in Magazine", value: firepower.Shell_capacity }
        );
    }
    else {
        firepowerArray.push(
            { name: "Reload Time", value: firepower.Reload_time }
        );
    }

    firepowerArray.push(
        { name: "Average Penetration", value: firepower.Average_Penetration },
        { name: "Average Damage", value: firepower.Average_Damage },
        { name: "Aiming Time", value: firepower.Aiming_Time },
        { name: "Dispersion", value: firepower.Dispersion },
        { name: "Gun Turn Limits", value: firepower.Gun_Turn_Limits }
    );

    // Firepower to the right
    drawCategoryBox("Firepower", nextY, yOffset, firepowerArray);

    return canvas.toBuffer();
}
