// loginConfirmation.js
exports.handler = async (event) => {
  try {
    // Parse the incoming request body if needed
    const requestBody = JSON.parse(event.body);
    const { username, discordUsername } = requestBody;

    // Process the confirmation logic here
    // For example, log the successful login
    console.log(`Successful login for username: ${username}, Discord username: ${discordUsername}`);

    // You can perform any other actions here, such as updating a database, sending notifications, etc.

    // Return a successful response with appropriate status code and data
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login confirmation received' })
    };
  } catch (error) {
    // Handle errors and return an appropriate response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
