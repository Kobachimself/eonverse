document.addEventListener("DOMContentLoaded", async function() {
    const statusIndicator = document.querySelector(".status-indicator");
    const onlineCount = document.querySelector(".online-count");

    try {
        const response = await fetch("server-status.py");
        const data = await response.json();

        if (data.onlinePlayers > 0) {
            statusIndicator.textContent = "Online";
            statusIndicator.classList.add("online");
        } else {
            statusIndicator.textContent = "Offline";
            statusIndicator.classList.add("offline");
        }

        onlineCount.textContent = data.onlinePlayers;
    } catch (error) {
        statusIndicator.textContent = "Error";
        statusIndicator.classList.add("error");
        onlineCount.textContent = "N/A";
    }
});
