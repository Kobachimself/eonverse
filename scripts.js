document.addEventListener("DOMContentLoaded", function () {
    // Add Stripe configuration
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuy);
    });

    async function handleBuy(event) {
        const rank = event.target.getAttribute('data-rank');
        const price = parseFloat(event.target.parentNode.getAttribute('data-price'));

        try {
            // Create a Checkout Session
            const session = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rank, price }),
            }).then(response => response.json());

            // Redirect to Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error('Error redirecting to Checkout:', result.error);
                alert('An error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error handling purchase:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    // Function to fetch server information
    async function fetchServerInfo() {
        // Implement logic to fetch server information
    }

    fetchServerInfo();
});
