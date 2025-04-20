require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI) //you need to put your own mongoDB connection string in here
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const playerSchema = new mongoose.Schema({
    currentIgn: { type: String, required: true, unique: true },
    playerId: { type: String, required: true, unique: true },
    previousNicknames: { type: [String], default: [] },
    discordUsername: { type: String, required: true, unique: true, default: "N/A" },
    discordId: { type: String, required: true, unique: true, default: -1 },
})


const PlayerNicknames = mongoose.model('User', playerSchema);

module.exports = { PlayerNicknames };