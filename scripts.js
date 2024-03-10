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
                // Replace the URL with your actual payment link
                window.location.href = "https://eonverse.space/store";
            });
        })
        .catch(error => {
            console.error("Error fetching server information:", error);
        });
});
