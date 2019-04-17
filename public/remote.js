var ws = null;

function send(msg) {
  console.log('send', msg);
  ws.send(msg);
}

function init() {
  connect();
}

function getConnectionString() {
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var host = protocol + '://' + location.hostname;
  if (parseInt(location.port, 10) !== 80) {
    host += ':' + location.port;
  }
  return host;
}

function connect() {
  ws = new WebSocket(getConnectionString());
  // event emmited when connected
  ws.onopen = function () {
    showStatus('connected');
  }
  // event emmited when receiving message 
  ws.onmessage = function (ev) {
   
  }

  ws.onclose = function (ev) {
    showStatus("reconnecting...");
    setTimeout(connect, 2000);
  }
}

function showStatus(msg) {
  console.log(msg);
}
