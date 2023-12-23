<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Save the registration data in your database (this is just an example)
    // You should use proper database interaction here
    
    // Send a webhook notification
    $channelId = "1142606647689236610"; // Replace with your channel ID
    $webhookUrl = "https://discord.com/api/webhooks/1142606839234691123/TYv_qOpY3zGWq5Dw9QtxALtb_eVVwODYscTMUMmW5osogE4D5_LcO5urK9DtfQXXi1-J"; // Replace with your webhook URL
    
    $data = array(
        "content" => "New registration:\nUsername: $username"
    );
    
    $options = array(
        "http" => array(
            "header" => "Content-Type: application/json",
            "method" => "POST",
            "content" => json_encode($data)
        )
    );
    
    $context = stream_context_create($options);
    file_get_contents($webhookUrl, false, $context);
    
    // Redirect back to the registration page with a success message
    header("Location: event-register.html?success=true");
    exit();
}
?>
