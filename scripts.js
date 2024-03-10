document.addEventListener("DOMContentLoaded", function () {
    const ranks = {
        'VIP': { price: 5, description: 'Access to VIP features' },
        'VIP+': { price: 7, description: 'Access to all VIP features and VIP+' },
        'ULTRA': { price: 10, description: 'Access to VIP+ and all ULTRA features' },
        'LEGEND': { price: 16, description: 'Access to ALL features and LEGEND Features' }
    };

    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const detailsForm = document.getElementById('details-form');
    const discordUsernameInput = document.getElementById('discord-username');
    const minecraftUsernameInput = document.getElementById('minecraft-username');
    const purchaseRankInput = document.getElementById('purchase-rank');
    const purchaseAmountInput = document.getElementById('purchase-amount');

     const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rank = this.dataset.rank; // Get the rank associated with the button
            // Redirect to the payment site based on the rank
            if (rank === 'VIP') {
                window.location.href = 'https://example.com/payment/vip';
            } else if (rank === 'VIP+') {
                window.location.href = 'https://example.com/payment/vip-plus';
            } else if (rank === 'ULTRA') {
                window.location.href = 'https://example.com/payment/ultra';
            } else if (rank === 'LEGEND') {
                window.location.href = 'https://example.com/payment/legend';
            }
        });
    });
});

    detailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const discordUsername = discordUsernameInput.value;
        const minecraftUsername = minecraftUsernameInput.value;
        const rank = purchaseRankInput.value;
        const amount = purchaseAmountInput.value;

        const purchaseData = {
            discordUsername,
            minecraftUsername,
            rank,
            amount
        };

        fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error making purchase');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            alert('Purchase successful!'); // You can customize this part later
            overlay.classList.remove('active');
        })
        .catch(error => {
            console.error('Error making purchase:', error);
            alert('Error making purchase. Please try again.');
        });
    });

    // Load PayPal buttons
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: purchaseAmountInput.value
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                console.log('Transaction completed by ' + details.payer.name.given_name);
                sendPurchaseInfo(details);
            });
        }
    }).render('#paypal-button-container');

    // Function to send purchase information to the backend
    function sendPurchaseInfo(details) {
        const purchaseData = {
            rank: purchaseRankInput.value,
            amount: details.purchase_units[0].amount.value,
            discordUsername: discordUsernameInput.value,
            minecraftUsername: minecraftUsernameInput.value
        };
         // Function to enable Buy button functionality
    function enableBuyButtons() {
        const buyButtons = document.querySelectorAll('.buy-btn');
        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuy);
        });
    }

    // Function to handle Buy button click
    function handleBuy(event) {
        const rank = event.target.getAttribute('data-rank');
        const price = parseFloat(event.target.parentNode.getAttribute('data-price'));

        // Redirect to payment page or perform other actions as needed
        // Here, you can open a payment modal or redirect to a payment gateway
        alert(`You clicked Buy for ${rank} rank. Price: $${price}`);
    }

    // Fetch server information when the page loads
    fetchServerInfo();
});

        fetch('/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error sending purchase data to the server');
            }
            // Handle successful response from the server
            alert('Purchase successful!');
            overlay.classList.remove('active');
        })
        .catch(error => {
            console.error('Error sending purchase data:', error);
            alert('Error making purchase. Please try again.');
        });
    }
});
