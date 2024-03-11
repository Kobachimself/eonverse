const stripe = require('stripe')('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');

// Handle Stripe webhook events
async function handleStripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, 'your_stripe_webhook_secret');
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Handle successful checkout session completion
            console.log('Checkout session completed:', session.id);
            break;
        // Add more cases to handle other types of events as needed
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}

module.exports = {
    handleStripeWebhook
};
