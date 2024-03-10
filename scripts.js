<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EonVerse Store</title>
    <!-- Add your stylesheets and other meta tags as needed -->
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #2c2f33;
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }

        .container {
            text-align: center;
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #7289da;
        }

        .rank-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }

        .rank {
            padding: 15px 25px;
            background-color: #7289da;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 0 20px #7289da;
            animation: glow 1.5s ease-in-out infinite alternate;
        }

        .rank p {
            margin: 0;
            font-size: 1.5rem;
        }

        .rank:hover {
            background-color: #3a4d9a;
            box-shadow: 0 0 30px #3a4d9a;
        }

        @keyframes glow {
            from {
                box-shadow: 0 0 20px #7289da;
            }
            to {
                box-shadow: 0 0 30px #7289da;
            }
        }

        .server-info {
            margin-bottom: 20px;
        }

        .server-info p {
            font-size: 1.2rem;
        }

        #paypal-button-container {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
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
    </div>

    <!-- Include PayPal SDK -->
    <script src="https://www.paypal.com/sdk/js?client-id=ARZxtkO-ZJt4Dn_UNzfdc55JgmcjFEcpY_l8f7mseo2EiqWayxLjXWgnyl8hiQEPoWXMr7lwEiTh997h"></script>
    <script>
        // Your JavaScript code here
    </script>
</body>
</html>
