const axios = require("axios");

exports.handler = async (event) => {
  try {
    const formData = JSON.parse(event.body);
    const { username, password, confirmPassword } = formData;

    if (username === "" || password === "" || confirmPassword === "") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "All fields are required." }),
      };
    }

    if (password !== confirmPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Passwords do not match." }),
      };
    }

    // Replace 'YOUR_WEBHOOK_URL' with the actual webhook URL
    const webhookUrl = "YOUR_WEBHOOK_URL";

    // Create a payload for the webhook notification
    const payload = {
      text: `New event registration:\nUsername: ${username}`,
    };

    // Send the webhook notification
    await axios.post(webhookUrl, payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Registration successful." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error." }),
    };
  }
};
