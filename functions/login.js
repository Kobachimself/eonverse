// functions/login.js

exports.handler = async function(event, context) {
  try {
    const { username, discordUsername, minecraftUsername } = JSON.parse(event.body);
    
    // Perform authentication logic here (e.g., verify credentials)
    // For demonstration purposes, let's just check if the username is "user", discordUsername is "discord_user", and minecraftUsername is "minecraft_user"
    if (username === "user" && discordUsername === "discord_user" && minecraftUsername === "minecraft_user") {
      // Return a successful response with appropriate status code and data
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', username, discordUsername, minecraftUsername })
      };
    } else {
      // Return a response indicating login failure
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username, discordUsername, or minecraftUsername' })
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
