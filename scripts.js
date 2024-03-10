document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const detailsForm = document.getElementById('details-form');

    buyButtons.forEach(button => {
        button.addEventListener('click', function () {
            overlay.style.display = 'block';
        });
    });

    detailsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const discordUsername = document.getElementById('discord-username').value;
        const minecraftUsername = document.getElementById('minecraft-username').value;
        console.log('Discord Username:', discordUsername);
        console.log('Minecraft Username:', minecraftUsername);
        overlay.style.display = 'none';
        // Call your backend API to handle the purchase with the entered details
    });
});
