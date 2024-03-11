const stripe = require('stripe')('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');

// Handle Stripe webhook events
async function handleStripeWebhook(req, res) {
    // Extract the signature from the request headers
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Construct the Stripe event using the raw request body and signature
        event = stripe.webhooks.constructEvent(req.rawBody, sig, 'your_stripe_webhook_secret');
    } catch (err) {
        // If there's an error, log it and return a 400 response with the error message
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the specific event type
    switch (event.type) {
        case 'checkout.session.completed':
            // If a checkout session is completed, extract the session object from the event data
            const session = event.data.object;
            // Log the completion of the checkout session
            console.log('Checkout session completed:', session.id);
            break;
        // Add more cases to handle other types of events as needed
        default:
            // Log any unhandled event types
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a JSON response to acknowledge receipt of the event
    res.json({ received: true });
}

// Export the function to make it available for use as a webhook handler
module.exports = {
    handleStripeWebhook
};
