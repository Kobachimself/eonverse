// functions/login.js
const mysql = require('mysql2/promise');

exports.handler = async function(event, context) {
  try {
    const { discordUsername, minecraftUsername } = JSON.parse(event.body);

    // Connect to MySQL database
    const connection = await mysql.createConnection({
      host: 'b5qr92bncfhw5gsnuz3b-mysql.services.clever-cloud.com',
      user: 'uulkeempqmal8d36',
      password: '8p0vt4LQ7zS5o04gKQeZ',
      database: 'b5qr92bncfhw5gsnuz3b'
    });

    // Query database to check if the provided usernames exist and match
    const [rows] = await connection.execute('SELECT * FROM users WHERE discord_username = ? AND minecraft_username = ?', [discordUsername, minecraftUsername]);
    
    // Close database connection
    await connection.end();

    // Check if any rows were returned
    if (rows.length > 0) {
      // Return a successful response with appropriate status code and data
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', discordUsername, minecraftUsername })
      };
    } else {
      // Return a response indicating login failure
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid Discord username or Minecraft username' })
      };
    }
  } catch (error) {
    // Handle errors and return appropriate response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

