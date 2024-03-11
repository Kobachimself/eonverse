const stripe = require('stripe')('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');
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (optional)
app.use(express.static(resolve(__dirname, 'public')));

// Define serverless function for handling Stripe webhook events
exports.handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    let eventObj;

    try {
        eventObj = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`
        };
    }

    // Handle the event
    switch (eventObj.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = eventObj.data.object;
            // Handle successful payment event
            console.log('PaymentIntent was successful:', paymentIntent);
            break;
        case 'payment_intent.payment_failed':
            const paymentFailedIntent = eventObj.data.object;
            // Handle failed payment event
            console.log('PaymentIntent failed:', paymentFailedIntent);
            break;
        // Handle other event types as needed
        default:
            console.log(`Unhandled event type: ${eventObj.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return {
        statusCode: 200,
        body: JSON.stringify({ received: true })
    };
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
