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
            const response = await fetch('https://eonverse-store-44159183db87.herokuapp.com/api/login', {
                method: 'GET',
                credentials: 'same-origin', // Send cookies for authentication
            });
            const { loggedIn } = await response.json();
            return loggedIn;
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    }

    // Add event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const username = formData.get('username');
        const discordUsername = formData.get('discord_username');

        try {
            // Send login request to the server
            const response = await fetch('https://eonverse-store-44159183db87.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minecraftUsername: username, discordUsername })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            // Parse the response JSON
            const data = await response.json();

            // Check if login was successful
            if (data && data.redirectUrl) {
                // Redirect to the specified URL after successful login
                window.location.href = data.redirectUrl;
            } else {
                // Handle invalid response or missing redirect URL
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle login failure (e.g., display error message)
            alert('Login failed. Please try again.');
        }
    });

    // Add your jQuery code here
    $(document).ready(function(){
        $('.accordion-item').click(function(){
            $(this).toggleClass('active').next('.accordion-content').slideToggle();
            $('.accordion-content').not($(this).next()).slideUp();
            $('.accordion-item').not($(this)).removeClass('active');
        });
    });

});
