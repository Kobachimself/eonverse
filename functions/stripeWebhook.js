const stripe = require('stripe')('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');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'b5qr92bncfhw5gsnuz3b-mysql.services.clever-cloud.com',
  user: 'uulkeempqmal8d36',
  password: '8p0vt4LQ7zS5o04gKQeZ',
  database: 'b5qr92bncfhw5gsnuz3b'
});

// Handle Stripe webhook events
async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_oGctvojR4zFNMsq3Pv06LemflNhjT0Nr');
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Process the payment intent and store relevant data in the database
      savePaymentIntent(paymentIntent);
      break;
    // Add more cases to handle other types of events as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}

// Function to save payment intent data to the database
function savePaymentIntent(paymentIntent) {
  connection.query('INSERT INTO payment_intents SET ?', paymentIntent, (error, results, fields) => {
    if (error) {
      console.error('Error saving payment intent to database:', error);
    } else {
      console.log('Payment intent saved to database:', paymentIntent.id);
    }
  });
}

module.exports = {
  handler
};


