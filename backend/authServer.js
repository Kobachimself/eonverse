const jwt = require('jsonwebtoken');

// Dummy database to simulate user data (replace with actual database integration)
const users = [
    { username: 'user1', discordUsername: 'discord_user1' },
    { username: 'user2', discordUsername: 'discord_user2' }
];

exports.handler = async (event) => {
    try {
        const { username, discordUsername } = JSON.parse(event.body);

        // Check if username and discordUsername are provided
        if (!username || !discordUsername) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Minecraft username and Discord username are required' })
            };
        }

        // Check if the user exists in the database
        const user = users.find(user => user.username === username && user.discordUsername === discordUsername);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid Minecraft or Discord username' })
            };
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.username, discordUsername: user.discordUsername }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send the token as a response
        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
