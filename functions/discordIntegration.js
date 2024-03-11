const { Client, Intents } = require('discord.js');
const { createServer } = require('http');

require('dotenv').config();

const { DISCORD_TOKEN, PREFIX } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Start the Discord bot
client.login(DISCORD_TOKEN);

// Handle buy command
client.on('messageCreate', async (message) => {
    // Ignore messages from bots or without the prefix
    if (message.author.bot || !message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;

    // Split the message content into command and arguments
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'buy') {
        // Your buy command logic here
        // This logic will be triggered when a user sends a message with the command !buy
    }
});

// Handle redeem command
client.on('messageCreate', async (message) => {
    // Ignore messages from bots or without the prefix
    if (message.author.bot || !message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'redeem') {
        // Your redeem command logic here
        // This logic will be triggered when a user sends a message with the command !redeem
    }
});

// Create an HTTP server to keep the function running
createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Discord bot server is running.');
}).listen(3000); // Change the port if needed

module.exports = {
    client
};
