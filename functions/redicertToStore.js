// functions/redirectToStore.js

exports.handler = async function(event, context) {
  try {
    // Extract data from the request body (assuming it contains username, discordUsername, and minecraftUsername)
    const { username, discordUsername, minecraftUsername } = JSON.parse(event.body);
    
    // Perform any necessary validation or processing here
    
    // Redirect to the store page with query parameters containing the user's information
    return {
      statusCode: 302,
      headers: {
        Location: `/store.html?username=${username}&discordUsername=${discordUsername}&minecraftUsername=${minecraftUsername}`
      },
      body: '' // Empty body for redirect response
    };
  } catch (error) {
    // Handle errors and return appropriate response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
