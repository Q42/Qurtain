//pixelData = new Uint32Array(NUM_LEDS);
var express = require('express');
var http = require('http');
var WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

app.use(express.static('public'))

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.binaryType = "ArrayBuffer";

wss.on('connection', (ws) => {

    ws.binaryType = "arraybuffer";

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        
        //log the received message and send it back to the client
        //console.log('received: %s', message);
        //ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    //ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 4242, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

var NUM_LEDS = null;
var lastScreen = [];

function init(num_leds) {
    NUM_LEDS = num_leds;        
}

function render(pixelData) {
  if (pixelData) {
      lastScreen = pixelData;
    //sendToSceens();

    //console.log("sending screen", pixelData.length);
    wss.clients.forEach(function each(client) {
        client.send( "[" + pixelData.join(',') + "]" );
    });
  }

}

function reset() {
    // clear screen
    render(lastScreen)
}

module.exports.init = init;
module.exports.render = render;
module.exports.reset = reset; 
