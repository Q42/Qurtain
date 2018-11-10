var ws = null;

function send(msg) {
  console.log('send', msg);
  ws.send(msg);
}

function init() {
  connect();
}

function connect() {
  ws = new WebSocket('ws://' + location.hostname + ':4242');
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