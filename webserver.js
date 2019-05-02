var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var WebSocket = require('ws');
var utils = require('./utils');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

app.use(bodyParser.json());

app.post('/api/send', (req, res) => {
  if (!req.header('Authorization') || req.header('Authorization') !== "p$2xZ}gJpWrM%saHz9H$qWHQrm]new2sKcQn*3/nd6QC9XQ6Y9B8,B^bwTXjDX}9") {
    res.status(401);
    res.send('Unauthorized');
    return;
  }
  if (!req.body.message) {
    res.status(400);
    res.send('Missing `message` key in body.');
    return;
  }
  processReceivedMessage(req.body.message);
  res.status(200);
  res.send('OK');
});

function localOnly(req, res, next) {
  var ip = req.ip ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  if (utils.isLocalIp(ip)) {
    return next();
  }
  res.status(401);
  res.send('Unauthorized');
}

// Make sure only local IPs can connect for all the other stuff
app.use(localOnly);

app.use(express.static('public'));

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const token = ws.protocol.replace('authorization_', '');
  if (token !== '928392') {
    return false;
  }
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

function unRegisterOnReceive(func) {
  for (var i=0; i<receiveMessageListeners.length; i++) {
    if (receiveMessageListeners[i] == func) {
      receiveMessageListeners[i] = function() {}; // todo: delete if from array
    }
  }
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
module.exports.unRegisterOnReceive = unRegisterOnReceive;
