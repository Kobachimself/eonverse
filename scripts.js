<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EonVerse Store</title>
    <!-- Add your stylesheets and other meta tags as needed -->
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #2c2f33;
            color: #fff;
            margin: 0;
            padding: 0;
        }

        h1 {
            margin-top: 50px;
        }

        .ip-address,
        .online-count {
            color: #7289da;
        }

        .rank-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        .rank {
            text-align: center;
            padding: 10px;
            background-color: #7289da;
            border-radius: 5px;
            cursor: pointer;
        }

        .rank p {
            margin: 0;
        }

        .rank:hover {
            background-color: #3a4d9a;
        }

        #paypal-button-container {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Welcome to EonVerse Store</h1>

    <div class="rank-container">
        <!-- Add Ranks with data-rank and data-price attributes -->
        <div class="rank" data-rank="VIP" data-price="5" data-points="500">
            <p>VIP - $5</p>
        </div>
        <div class="rank" data-rank="VIP+" data-price="7" data-points="700">
            <p>VIP+ - $7</p>
        </div>
        <div class="rank" data-rank="ULTRA" data-price="10" data-points="1000">
            <p>ULTRA - $10</p>
        </div>
        <div class="rank" data-rank="LEGEND" data-price="16" data-points="1600">
            <p>LEGEND - $16</p>
        </div>
        <!-- Repeat similar blocks for other ranks -->
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
            const ip = "eonverse.club"; // Your server's IP

            fetch(`https://api.mcsrvstat.us/2/${ip}`)
                .then(response => response.json())
                .then(data => {
                    const onlineCount = data.players.online || 0;
                    const ipElement = document.querySelector(".ip-address");
                    const onlineCountElement = document.querySelector(".online-count");

                    ipElement.textContent = ip;
                    onlineCountElement.textContent = onlineCount;

                    // Add event listener for Buy Now button
                    const buyNowBtn = document.getElementById("buyNowBtn");
                    buyNowBtn.addEventListener("click", function () {
                        // Use PayPal Smart Payment Buttons
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
                                    // You can add logic here to notify the server about the successful payment
                                });
                            }
                        }).render('#paypal-button-container');
                    });
                })
                .catch(error => {
                    console.error("Error fetching server information:", error);
                });
        });
    </script>
</body>
</html>
