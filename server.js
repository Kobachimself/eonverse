const express = require('express');
const stripeWebhook = require('./functions/stripeWebhook');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for handling Stripe webhook events
app.post('/stripe-webhook', stripeWebhook.handler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
