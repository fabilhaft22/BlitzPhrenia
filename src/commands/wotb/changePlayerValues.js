const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

function findPlayer(JSON, ign) {
    for (let i = 0; i < JSON.players.length; i++) {
        if (JSON.players[i].ign.toLowerCase() === ign.toLowerCase()) return i;
    }
    return null;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editplayer')
        .setDescription("edits a player afterwards")
        .addSubcommand(subcommand => subcommand.setName('previousnicknames').setDescription("add previously known igns (add a comma between each nickname to properly separate them) (optional)")
            .addStringOption(option => option.setName('ign').setDescription("the player to edit").setRequired(true))
            .addStringOption(option => option.setName('previousnicknames').setDescription("the previous nicknames").setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('discordusername').setDescription("edit the player's discord username")
            .addStringOption(option => option.setName('ign').setDescription("the player to edit").setRequired(true))
            .addStringOption(option => option.setName('discordusername').setDescription("the new discord username").setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('discordid').setDescription("edit the player's discord id")
            .addStringOption(option => option.setName('ign').setDescription("the player to edit").setRequired(true))
            .addIntegerOption(option => option.setName('discordid').setDescription("the new discord id").setRequired(true))),
    async execute(interaction) {
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();
        const ign = interaction.options.getString('ign');
        const database = JSON.parse(fs.readFileSync("src/data/nicknames.json", "utf-8"));

        const index = findPlayer(database, ign);

        if (index == null) {
            await interaction.editReply(`Couldn't find the player ${ign}`);
            return;
        }

        if (subcommand === "previousnicknames") {
            const previousNicknames = interaction.options.getString('previousnicknames').split(",");
            let updated = false;

            for (let i = 0; i < previousNicknames.length; i++) {
                const nickname = previousNicknames[i].trim();
                if (database.players[index].previousNicknames.includes(nickname)) {
                    console.log(`Skipping already existing nickname: ${nickname}`);
                    continue; // Skip if nickname already exists
                }
                database.players[index].previousNicknames.push(nickname);
                updated = true;
            }

            if (updated) {
                fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
                await interaction.editReply(`Updated the player's previous nicknames.`);
            } else {
                await interaction.editReply(`No new previous nicknames were added.`);
            }
            return;
        } else if (subcommand === 'discordusername') {
            const newDiscordUsername = interaction.options.getString('discordusername');
            database.players[index].discordUsername = newDiscordUsername;
            fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
            await interaction.editReply(`Updated the player's discord username to ${newDiscordUsername}`);
            return;
        } else if (subcommand === 'discordid') {
            const newDiscordId = interaction.options.getInteger('discordid');
            database.players[index].discordId = newDiscordId;
            fs.writeFileSync("src/data/nicknames.json", JSON.stringify(database, null, 4));
            await interaction.editReply(`Updated the player's discord ID to ${newDiscordId}`);
            return;
        }
    }
}
