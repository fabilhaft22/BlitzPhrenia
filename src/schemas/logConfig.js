require('dotenv').config()
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI) //you need to put your own mongoDB connection string in here
    .then(() => console.log("Connected to MongoDB logguilds collection"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const logSubSchema = new mongoose.Schema({
    channelId: { type: String, default: null },
    enabled: { type: Boolean, default: false }
}, { _id: false }); // no separate _id for each subdocument

const logGuildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    messageLog: { type: logSubSchema, default: () => ({}) },
    memberLog: { type: logSubSchema, default: () => ({}) },
    serverLog: { type: logSubSchema, default: () => ({}) },
    voiceLog: { type: logSubSchema, default: () => ({}) },
    welcomeChannel: { type: logSubSchema, default: () => ({}) }
});

const LogGuilds = mongoose.model("logguilds", logGuildSchema);

module.exports = { LogGuilds };
