// loginFunction.js
const mysql = require('mysql2');

exports.handler = async (event, context) => {
  // Parse the incoming request body
  const requestBody = JSON.parse(event.body);
  const { username, password } = requestBody;

  // Create a MySQL connection
  const connection = mysql.createConnection({
    host: 'b5qr92bncfhw5gsnuz3b-mysql.services.clever-cloud.com',
    user: 'uulkeempqmal8d36',
    database: 'b5qr92bncfhw5gsnuz3b',
    password: '8p0vt4LQ7zS5o04gKQeZ',
    port: 3306
  });

  try {
    // Connect to the database
    connection.connect();

    // Execute a query to check if the user exists
    const [rows, fields] = await connection.promise().query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    // Close the connection
    connection.end();

    // Check if the user was found
    if (rows.length === 1) {
      // User found, return success response
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', user: rows[0] })
      };
    } else {
      // User not found, return error response
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username or password' })
      };
    }
  } catch (error) {
    // Handle any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while processing your request' })
    };
  }
};
