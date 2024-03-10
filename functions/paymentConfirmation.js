const Discord = require('discord.js');
const client = new Discord.Client();
const channelId = '1216095276834492548'; // Replace with your actual channel ID
const botToken = 'MTIxNjMxMzcwMDIyMzQxODQyOA.GTbXk_.l4NezhZ-a81Fs_RN6ZEsZ1pAGaNTeL8PAR-l2k'; // Replace with your actual bot token

client.once('ready', () => {
    // Handle ready event if needed
});

exports.handler = async (event) => {
    try {
        // Extract Minecraft and Discord usernames from the request body
        const { minecraftUsername, discordUsername } = JSON.parse(event.body);

        // Process the payment confirmation and handle accordingly
        // Here, you can perform actions like updating the user's rank in your database
        console.log(`Received payment confirmation for Minecraft username: ${minecraftUsername}, Discord username: ${discordUsername}`);

        // Notify Discord channel about the payment
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(`Payment confirmed for Minecraft username: ${minecraftUsername}, Discord username: ${discordUsername}`);
        } else {
            console.error(`Channel with ID ${channelId} not found.`);
        }

        // Respond with a success message
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Payment confirmed successfully.' })
        };
    } catch (error) {
        console.error('Error processing payment confirmation:', error);
        // Respond with an error message
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

// Login outside the Lambda handler
client.login(botToken);
