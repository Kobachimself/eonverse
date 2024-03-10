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
