// paymentConfirmation.js

exports.handler = async (event) => {
    // Extract Minecraft and Discord usernames from the request body
    const { minecraftUsername, discordUsername } = JSON.parse(event.body);

    // Process the payment confirmation and handle accordingly
    // Here, you can perform actions like updating the user's rank in your database

    console.log(`Received payment confirmation for Minecraft username: ${minecraftUsername}, Discord username: ${discordUsername}`);
    
    // Respond with a success message
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment confirmed successfully.' })
    };
};
