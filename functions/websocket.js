// websocket.js

const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Handle incoming WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('New WebSocket connection');

  // Handle messages received from clients
  ws.on('message', function incoming(message) {
    console.log('Received message:', message);

    // Process the message and send a response if needed
    // For example:
    // ws.send('Message received: ' + message);
  });

  // Handle WebSocket connection closing
  ws.on('close', function close() {
    console.log('WebSocket connection closed');
  });
});

console.log('WebSocket server is running');
