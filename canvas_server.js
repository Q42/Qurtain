var ws281x = require('rpi-ws281x-native')
var ws281xCanvas = require('rpi-ws281x-canvas');
var canvas = ws281xCanvas.create(5,150);

var NUM_LEDS = 750;
var pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

ctx = canvas.getContext('2d');

ws281x.init(100);

ctx.fillStyle = 'blue';
ctx.fillRect(2, 2, 3, 3);
ctx.fillText("H",10,50); 

ws281x.render(canvas.toUint32Array());

