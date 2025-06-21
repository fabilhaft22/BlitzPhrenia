require('dotenv').config()
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI) //you need to put your own mongoDB connection string in here
    .then(() => console.log("Connected to MongoDB PlayerNicknames collection"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const playerSchema = new mongoose.Schema({
    currentIgn: { type: String, required: true, unique: true },
    playerId: { type: String, required: true, unique: true },
    previousNicknames: { type: [String], default: [] },
    discordUsername: { type: String, required: true, unique: true },
    discordId: { type: String, required: true, unique: true },
})


const PlayerNicknames = mongoose.model('nicknames', playerSchema);

module.exports = { 
    PlayerNicknames 
};