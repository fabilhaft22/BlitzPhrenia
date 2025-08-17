# Blitzphrenia

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📖 What is Blitzphrenia?  
**Blitzphrenia** is a Discord bot that provides useful features related to the game *World of Tanks Blitz*.  

It allows you to link, track, and analyze WoTB accounts directly through Discord.

---

## ⚙️ Requirements  

Before using Blitzphrenia, make sure you have:  

- ✅ Proper crediting (see the second bullet point in the license).  
- ✅ A **MongoDB database**. (Ask ChatGPT for setup help or refer to YouTube tutorials.)  
- ✅ A **World of Tanks Blitz application** ([create one here](https://developers.wargaming.net/applications)).  
- ✅ A `.env` file with the following values:  

```env
TOKEN=DISCORD_BOT_TOKEN
CLIENTID=DISCORD_BOT_CLIENT_ID
MONGODB_URI=MONGODB_CONNECTION_STRING
WOTB_APPLICATION_ID=WOTB_APPLICATION_ID
````

📌 [Info on WoTB Application ID](https://developers.wargaming.net/documentation/guide/getting-started/#using_application_id)

* ✅ A **Node.js environment** with the following packages installed:

```bash
npm install canvas discord.js mongoose sharp node-fetch@2 dotenv
```

---

## 🚀 Features

* 🛠️ Standard Discord bot features
* 🔗 **Manual WoTB account integration** using `/addplayer`
* 📊 Account tracking:

  * Detect name changes → `/checknamechanges`
  * View previous nicknames → `/findplayer`
  * Check Tank statistics → `/tank-characteristics`
  * Generate a player leaderboard of all stored accounts → `/wotb-leaderboard`
* 🏆 Retrieve all current and upcoming tournaments → `/tournament`
* 📈 Custom **BP rating system** for more accurate player evaluation

---

## ⚠️ Important Notice  

Blitzphrenia currently supports **only the EU server**.  
There are no plans at this time to extend support to APAC or NA servers.  

---

## 📌 License  

This project is licensed under the MIT License. Please review the [license](./LICENSE) file for details on usage and attribution.  

---

## 📜 Legal  

- [Terms of Service](./TOS.md)  
- [Privacy Policy](./PRIVACY.md)  