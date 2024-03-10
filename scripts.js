<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EonVerse Store</title>
    <!-- Add your stylesheets and other meta tags as needed -->
    <style>
        /* Your CSS styles here */
    </style>
</head>
<body>
    <h1>Welcome to EonVerse Store</h1>

    <div class="rank-container">
        <!-- VIP Rank -->
        <div class="rank" data-rank="VIP" data-price="5" data-points="500">
            <p>VIP - $5</p>
        </div>
        <!-- VIP+ Rank -->
        <div class="rank" data-rank="VIP+" data-price="7" data-points="700">
            <p>VIP+ - $7</p>
        </div>
        <!-- ULTRA Rank -->
        <div class="rank" data-rank="ULTRA" data-price="10" data-points="1000">
            <p>ULTRA - $10</p>
        </div>
        <!-- LEGEND Rank -->
        <div class="rank" data-rank="LEGEND" data-price="16" data-points="1600">
            <p>LEGEND - $16</p>
        </div>
    </div>

    <div class="server-info">
        <p>Server IP: <span class="ip-address">Loading...</span></p>
        <p>Players Online: <span class="online-count">Loading...</span></p>
    </div>

    <div id="paypal-button-container"></div>

    <!-- Include PayPal SDK -->
    <script src="https://www.paypal.com/sdk/js?client-id=ARZxtkO-ZJt4Dn_UNzfdc55JgmcjFEcpY_l8f7mseo2EiqWayxLjXWgnyl8hiQEPoWXMr7lwEiTh997h"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Function to fetch server information
            function fetchServerInfo() {
                const ip = "eonverse.club"; // Your server's IP

                fetch(`https://api.mcsrvstat.us/2/${ip}`)
                    .then(response => response.json())
                    .then(data => {
                        const onlineCount = data.players ? data.players.online || 0 : 0;
                        const ipElement = document.querySelector(".ip-address");
                        const onlineCountElement = document.querySelector(".online-count");

                        ipElement.textContent = ip;
                        onlineCountElement.textContent = onlineCount;

                        renderPayPalButton();
                    })
                    .catch(error => {
                        console.error("Error fetching server information:", error);
                        renderPayPalButton();
                    });
            }

            // Function to render PayPal Smart Payment Buttons
            function renderPayPalButton() {
                paypal.Buttons({
                    createOrder: function (data, actions) {
                        // Set up the transaction
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '10.00' // Set the amount based on your pricing
                                }
                            }]
                        });
                    },
                    onApprove: function (data, actions) {
                        // Capture the funds from the transaction
                        return actions.order.capture().then(function (details) {
                            // Handle a successful transaction
                            console.log('Transaction completed by ' + details.payer.name.given_name);
                            // Send purchase information to the backend
                            sendPurchaseInfo(details);
                        });
                    }
                }).render('#paypal-button-container');
            }

            // Function to send purchase information to the backend
            function sendPurchaseInfo(details) {
                const purchaseData = {
                    rank: 'VIP', // Change this to the purchased rank
                    amount: details.purchase_units[0].amount.value,
                    payer: details.payer.name.given_name,
                    // Add any other relevant data you want to send
                };

                // Send the purchase data to your backend server
                fetch('http://localhost:3000', {
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
                })
                .catch(error => {
                    console.error('Error sending purchase data:', error);
                });
            }

            // Fetch server information when the page loads
            fetchServerInfo();
        });
    </script>
</body>
</html>
