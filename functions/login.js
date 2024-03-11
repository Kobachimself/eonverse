// functions/login.js
const mysql = require('mysql2/promise');

exports.handler = async function(event, context) {
  try {
    const { username, discordUsername } = JSON.parse(event.body);

    // Connect to MySQL database (using your existing configuration)
    const connection = await mysql.createConnection({
      host: 'b5qr92bncfhw5gsnuz3b-mysql.services.clever-cloud.com',
      user: 'uulkeempqmal8d36',
      password: '8p0vt4LQ7zS5o04gKQeZ',
      database: 'b5qr92bncfhw5gsnuz3b'
    });

    // Query database to check if the provided usernames exist and match
    const [rows] = await connection.execute('SELECT * FROM users WHERE discord_username = ? AND minecraft_username = ?', [discordUsername, username]);
    
    // Close database connection
    await connection.end();

    // Check if any rows were returned
    if (rows.length > 0) {
      // Return a successful response with appropriate status code and data
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', discordUsername, username })
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

// Client-side JavaScript code
document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const username = formData.get('username');
        const discordUsername = formData.get('discord_username');

        try {
            const response = await fetch('/.netlify/functions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, discordUsername })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            window.location.href = '/store.html'; // Redirect to store page after successful login
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    });
});
