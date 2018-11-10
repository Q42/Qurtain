var express = require('express');
var http = require('http');
var WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

app.use(express.static('public'))

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
      processReceivedMessage(message);
    });
});

//start our server

var receiveMessageListeners = [];

function start() {
  server.listen(process.env.PORT || 4242, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
}

function send(message) {
  wss.clients.forEach(function each(client) {
    client.send( message );
  });
}

function onReceive(receiveMessageListener) {
  if (receiveMessageListener) receiveMessageListeners.push(receiveMessageListener);
}

function processReceivedMessage(message) {
  for (var i=0; i<receiveMessageListeners.length; i++) {
    try {
      receiveMessageListeners[i](message);
    } catch (e) {
      console.warn("could not send message to listener", e, message);
    }
  }

}

module.exports.start = start;
module.exports.send = send;
module.exports.onReceive = onReceive;