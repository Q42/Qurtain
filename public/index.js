var ws = new WebSocket('ws://localhost:4242');
// event emmited when connected
ws.onopen = function () {
    console.log('websocket is connected ...')
    // sending a send event to websocket server
    ws.send('connected')
}
// event emmited when receiving message 
ws.onmessage = function (ev) {
    //console.log(ev);
    var data = new Uint32Array(eval(ev.data)); // slow!

   // console.log("data received", data);
   render(data);
}

var ROWS = 150, COLS = 5;
var DY = 5, DX = 15, WY=4, WX = 4;

var canvas, context;

function init() {
  canvas = document.getElementById('screen');
  canvas.height = ROWS * DY;
  canvas.width = COLS * DX;
  context = canvas.getContext('2d');

  var off = [];
  for (var i=0; i<750; i++) off.push(1);//(16*256*256+16*256+160)*256+48);

  render(off);
}

function drawPixel(col, row, color) {
  if (!color) color = 0;
  var s = rgba(color);
  context.fillStyle = s; //"#10108030";
  context.fillRect(col*DX, row*DY, WX, WY);
  //console.log("drawPixel", s);
}

function render(pixelData) {
  if (!pixelData) return;

  var row = 0, col = 0;
  for (var i=0;i<pixelData.length;i++) {
    drawPixel(col, row, pixelData[i] );
    row++;
    if (row==ROWS) { row=0; col++; }
  }
}

UInt32toByteArray = function(uint32) {
  // we want to represent the input as a 8-bytes array
  var byteArray = [0, 0, 0, 0];

  for ( var index = 0; index < byteArray.length; index ++ ) {
      var byte = uint32 & 0xff;
      byteArray [ index ] = byte;
      uint32 = (uint32 - byte) / 256 ;
  }

  return byteArray;
};

function rgba(color) {
  if (color==0) return "#000000";
  return "#" + color.toString(16);

  // var arr = UInt32toByteArray(color);
  // return "rgba(" + arr[0] + "," + arr[1] + "," + arr[2] + ",1);"
}