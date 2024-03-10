const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle payment confirmations
app.post('/payment-confirmations', (req, res) => {
    // Extract Minecraft and Discord usernames from the request body
    const { minecraftUsername, discordUsername } = req.body;

    // Process the payment confirmation and handle accordingly
    // Here, you can perform actions like updating the user's rank in your database

    console.log(`Received payment confirmation for Minecraft username: ${minecraftUsername}, Discord username: ${discordUsername}`);
    
    // Respond with a success message
    res.status(200).json({ message: 'Payment confirmed successfully.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
