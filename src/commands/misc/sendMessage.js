const {SlashCommandBuilder, MessageFlags, EmbedBuilder, Colors} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendmessage')
        .setDescription("Sends a message")
        .addStringOption(option => option.setName('text').setDescription("the text").setRequired(true))
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('file (image, textfile, etc.)')
                .setRequired(false)),
    async execute( interaction ) {
        const text = interaction.options.getString('text')
        const attachment = interaction.options.getAttachment('file');
        

        //prevent @everyone and @here mentions
        if(text.includes("@everyone") || text.includes("@here")) {
            return interaction.reply({
                content: "You cannot mention everyone or here in the message."
            });
        }

        //prevent role mentions
        if (interaction.guild.roles.cache.find(role => text.includes(`<@&${role.id}>`) || text.includes(`@${role.name}`))) {
            return interaction.reply({
                content: "You cannot mention roles in this server."
            });
        }


        if (attachment) {
            // Send back the same attachment
            await interaction.channel.send({
                content: text,
                files: [attachment.url]  // Use the attachment URL to send it back
            });
        } else {
            await interaction.channel.send(text);
        }
        // find the message that was sent by the bot
        const messages = await interaction.channel.messages.fetch({ limit: 10 });
        const sentMessage = messages.find(msg => msg.author.id === interaction.client.user.id && msg.content === text && (attachment ? msg.attachments.size > 0 : true));

        logChannel = interaction.guild.channels.cache.find(channel => channel.id === process.env.messageLogChannel); 

        await interaction.reply({
            content: "Message sent successfully!",
            flags: MessageFlags.Ephemeral
        });


        const embed = new EmbedBuilder()
            .setColor(Colors.Red)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setURL(sentMessage.url)
            .setTitle(`${interaction.user.username} made me send a message!`)
            .addFields( 
                { name: "Message", value: text },
                attachment ? { name: "Attachment", value: attachment.name } : { name: "Attachment", value: "None" },
                { name: "Channel", value: interaction.channel.name }
            )
            .setFooter({ text: `Sent by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        

        return logChannel.send({
            embeds: [embed]
        });
    }
}