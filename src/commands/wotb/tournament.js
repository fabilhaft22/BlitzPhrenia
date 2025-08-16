require('dotenv').config();

const {SlashCommandBuilder, EmbedBuilder, Locale} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournament')
        .setDescription('Get information about the current tournaments'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await fetch(`https://api.wotblitz.eu/wotb/tournaments/list/?application_id=${process.env.WOTB_APPLICATION_ID}`);
            if (!response.ok) {
                return interaction.editReply('Failed to fetch tournament data. Please try again later.');
            }
            const data = await response.json();

            if (!data.data) {
                return interaction.editReply('No tournament found');
            }


            const embeds = [];

            for(let i = 0; i < data.data.length; i++) {
                if (data.data[i].status === 'finished') {
                    continue; // Skip tournaments that are not active or in registration
                }
                embeds.push(new EmbedBuilder()
                    .setTitle(data.data[i].title)
                    //.setDescription(data.data[i].description)
                    .setThumbnail(data.data[i].logo.original)
                    .addFields(
                        { name: 'Registration Start', value: new Date(data.data[i].registration_start_at * 1000).toLocaleString(Locale.German), inline: true },
                        { name: 'Registration End', value: new Date(data.data[i].registration_end_at * 1000).toLocaleString(Locale.German), inline: true },
                        { name: 'Status', value: data.data[i].status, inline: true }
                    )
                    .addFields(
                        { name: 'Start Date', value: new Date(data.data[i].start_at * 1000).toLocaleString(Locale.German), inline: true },
                        { name: 'End Date', value: new Date(data.data[i].end_at * 1000).toLocaleString(Locale.German), inline: true }
                    )
                    .setColor('#0099ff')
                    .setFooter({ text: `Tournament ID: ${data.data[i].tournament_id}` }));
                    
            }

            await interaction.editReply({ embeds: [embeds[0]] });
            for (let i = 1; i < embeds.length; i++) {
                await interaction.followUp({ embeds: [embeds[i]] });
            }
        } catch (error) {
            console.error(error);
            return interaction.editReply('An error occurred while fetching the tournament information.');
        }
    }
}