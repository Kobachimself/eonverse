const stripe = require('stripe')('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');
const endpointSecret = 'whsec_oGctvojR4zFNMsq3Pv06LemflNhjT0Nr'; // Replace with your actual signing secret

// Handle Stripe webhook events
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

 try {
  event = stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_oGctvojR4zFNMsq3Pv06LemflNhjT0Nr');
} catch (err) {
  console.error('Webhook Error:', err.message);
  res.statusCode = 400; // Set the status code
  res.setHeader('Content-Type', 'application/json'); // Set the response content type
  res.end(JSON.stringify({ error: 'Webhook Error: ' + err.message }));
  return; // Exit the function
}


  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle payment intent succeeded event
      break;
    // Add more cases to handle other types of events as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}

module.exports.handler = handleStripeWebhook;

