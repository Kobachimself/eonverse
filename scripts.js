document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const detailsForm = document.getElementById('details-form');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    detailsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const discordUsername = document.getElementById('discord-username').value;
        const minecraftUsername = document.getElementById('minecraft-username').value;
        const purchaseRank = document.getElementById('purchase-rank').value;
        const purchaseAmount = document.getElementById('purchase-amount').value;

        const purchaseData = {
            discordUsername,
            minecraftUsername,
            rank: purchaseRank,
            amount: purchaseAmount
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
            alert('Purchase successful!');
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
                        value: document.getElementById('purchase-amount').value
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
    }).render(paypalButtonContainer);

    function openPopup(rank) {
        overlay.classList.add('active');
        document.getElementById('purchase-rank').value = rank;
    }

    function closePopup() {
        overlay.classList.remove('active');
    }

    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const rank = this.getAttribute('data-rank');
            openPopup(rank);
        });
    });

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

    function sendPurchaseInfo(details) {
        const purchaseData = {
            rank: document.getElementById('purchase-rank').value,
            amount: details.purchase_units[0].amount.value,
            discordUsername: document.getElementById('discord-username').value,
            minecraftUsername: document.getElementById('minecraft-username').value
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
                throw new Error('Error sending purchase data to the server');
            }
            alert('Purchase successful!');
            closePopup();
        })
        .catch(error => {
            console.error('Error sending purchase data:', error);
            alert('Error making purchase. Please try again.');
        });
    }

    function fetchServerInfo() {
        // Implement logic to fetch server information
    }

    fetchServerInfo();
});
