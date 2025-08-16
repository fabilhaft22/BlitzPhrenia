require("dotenv").config();
const { Events, EmbedBuilder } = require("discord.js");
const { getLogChannel } = require("../functions/getLogChannel")

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage) {
        const logChannel = await getLogChannel(newMessage.guild, "messageLog");
        if (!logChannel) return

        if (newMessage.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle(`Message edited in #${newMessage.channel.name}`)
            .setURL(newMessage.url)
            .setAuthor({
                name: newMessage.author.username,
                iconURL: newMessage.author.displayAvatarURL()
            })
            .setColor("Blue")
            .setFooter({ text: `ID: ${newMessage.author.id}` })
            .setTimestamp();

        let fields = [];

        // Handle message content changes
        if (oldMessage.content || newMessage.content) {
            let beforeText = oldMessage.content || "*No text*";
            let afterText = newMessage.content || "*No text*";

            let contentChunks = splitLongText(`**Before:** ${beforeText}\n**+After:** ${afterText}`, 1024);
            fields.push({ name: "Message Content", value: contentChunks.shift() });

            contentChunks.forEach(chunk => fields.push({ name: " ", value: chunk }));
        }

        // Handle attachments
        let oldAttachments = oldMessage.attachments.map(att => `[${att.name}](${att.url})`);
        let newAttachments = newMessage.attachments.map(att => `[${att.name}](${att.url})`);

        if (oldAttachments.length > 0 || newAttachments.length > 0) {
            let attachmentText = `**Before:** ${oldAttachments.join(", ") || "No attachments"}\n**+After:** ${newAttachments.join(", ") || "No attachments"}`;
            let attachmentChunks = splitLongText(attachmentText, 1024);

            fields.push({ name: "Attachments", value: attachmentChunks.shift() });
            attachmentChunks.forEach(chunk => fields.push({ name: " ", value: chunk }));
        }

        embed.addFields(fields.slice(0, 25));

        if(oldMessage.content === newMessage.content && oldMessage.attachments.length === newMessage.attachments.length) {
            return console.log("Discord API bug: MessageUpdate event triggered without changes. Probably because of a gif.");
        }	

        logChannel.send({ embeds: [embed] }).catch(console.error);
    }
};

// Function to split long text into chunks of max 1024 characters
function splitLongText(text, maxLength) {
    let chunks = [];
    while (text.length > maxLength) {
        let splitIndex = text.lastIndexOf(" ", maxLength);
        if (splitIndex === -1) splitIndex = maxLength;
        chunks.push(text.slice(0, splitIndex));
        text = text.slice(splitIndex + 1);
    }
    if (text.length > 0) chunks.push(text);
    return chunks;
}
