var ws = null;



var ROWS = 150, COLS = 5;
var DY = 5, DX = 15, WY=4, WX = 4;
var fps = 0;
var canvas, context;

function init() {
  canvas = document.getElementById('screen');
  canvas.height = ROWS * DY;
  canvas.width = COLS * DX;
  context = canvas.getContext('2d');

  var off = [];
  for (var i=0; i<750; i++) off.push(1);//(16*256*256+16*256+160)*256+48);
  render(off);

  connect();

  setTimeout(function() {
    showFps(fps); fps=0;
  }, 1000);
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
    //console.log(ev);
    var data = new Uint32Array(eval(ev.data)); // slow! can be smarter
    render(data);
  }

  ws.onclose = function (ev) {
    showStatus("reconnecting...");
    setTimeout(connect, 2000);
  }
}

function drawPixel(col, row, color) {
  if (!color) color = 0;
  
  context.fillStyle = rgba(color); 
  context.fillRect(col*DX, row*DY, WX, WY);
}

function render(pixelData) {
  if (!pixelData) return;

  var row = ROWS-1, col = 0, dir=-1;
  for (var i=0;i<pixelData.length;i++) {
    drawPixel(col, row, pixelData[i] );
    row+=dir;
    if (row==ROWS) { col++; dir=-dir; row--; }
    if (row==-1) { col++; dir=-dir; row++; }
  }
  fps++;
}

function showStatus(status) {
  document.getElementById("status").innerText = status;
}

function showFps(fps) {
  document.getElementById("fps").innerText = fps + " fps";
}

function rgba(color) {
  if (color==0) return "#000000";
  return "#" + color.toString(16);
}
