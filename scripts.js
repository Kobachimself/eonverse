document.addEventListener("DOMContentLoaded", async function () {
    // Fetch the Stripe public key from the server
    const response = await fetch('/config');
    const { publicKey } = await response.json();
    const stripe = Stripe(publicKey);

    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const price = parseInt(button.getAttribute('data-price'));
            const name = button.getAttribute('data-name');

            try {
                // Check if the user is logged in
                const isLoggedIn = await checkLoginStatus();
                if (!isLoggedIn) {
                    // Redirect to login page if not logged in
                    window.location.href = '/login.html';
                    return;
                }

                // Proceed with checkout if user is logged in
                const { sessionId } = await createCheckoutSession(price);
                const { error } = await stripe.redirectToCheckout({ sessionId });

                if (error) {
                    throw new Error(error.message);
                }
            } catch (error) {
                console.error('Error redirecting to checkout:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    });

    // Function to create a checkout session
    async function createCheckoutSession(price) {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price }),
        });
        return await response.json();
    }

    // Function to check login status
    async function checkLoginStatus() {
        try {
            const response = await fetch('/check-login-status');
            const { loggedIn } = await response.json();
            return loggedIn;
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    }
});
