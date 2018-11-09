//pixelData = new Uint32Array(NUM_LEDS);
var express = require('express');
var http = require('http');
var WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    console.log("client connected.");

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 4242, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
    screen = new Uint32Array(NUM_LEDS);


function render(pixelData) {
  if (pixelData) screen = pixelData;

  //sendToSceens();
}


