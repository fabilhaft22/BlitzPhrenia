require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { REST, Routes } = require('discord.js');

process.on('unhandledRejection', console.error);

const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;

const client = new Client({
	intents: [
		131071,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.User
	]
});

console.log("Trying to log in with token:", token ? "[OK]" : "[MISSING]");
console.log("Client ID:", clientId || "[MISSING]");


//Push slash commands to the bot and handle their execution
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//Register and find events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Reload Slash commands

const commands = [];

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Skip files that don't have .data.toJSON() (e.g., button handlers)
		if ('data' in command && 'execute' in command && typeof command.data.toJSON === 'function') {
			const commandJSON = command.data.toJSON();
			commandJSON.dmPermission = false;
			commands.push(commandJSON);
		} else {
			console.log(`[WARNING] Skipping file at ${filePath}: Missing "data.toJSON()" or "execute".`);
		}
	}
}

client.buttons = new Map();

// Absolute path to your buttons folder
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	
	if (button.data?.customId && typeof button.execute === 'function') {
		client.buttons.set(button.data.customId, button);
		console.log(`✅ Loaded button: ${button.data.customId}`);
	} else {
		console.warn(`[WARNING] The button file "${file}" is missing a valid "data.customId" or "execute".`);
	}
}



// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})()

client.login(token);