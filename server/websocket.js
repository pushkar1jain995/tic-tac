const WebSocket = require('ws');
const Game = require('../components/ServerGame');

const wss = new WebSocket.Server({ port: 8080 });

const game = new Game();

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(game.getState()));

  ws.on('message', (message) => {
    const { index } = JSON.parse(message);
    const newState = game.handleMove(index);
    if (newState) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newState));
        }
      });
    }
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
