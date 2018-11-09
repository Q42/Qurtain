// find out on what screen we want to render
var screen = null;

var game = "soundwave";

var mode;

try {
  var areWeOnRaspberry = require.resolve('rpi-ws281x-native');
  mode = "live";
} catch (e) {
  mode = "simulator";
  //console.log("error while connecting to rpi native", e);
}

if (mode=="live") {
  console.log("running on live Rpi");
  screen = require('rpi-ws281x-native');
} else {
  console.log("running on simulator");
  screen = require('./simulator');
}

var NUM_LEDS = 750;
var pixelData = new Uint32Array(NUM_LEDS);

screen.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  screen.reset();
  process.nextTick(function () { process.exit(0); });
});

setTimeout(boot, 2000);

function boot() {


  if (game=="loop") {

    // ---- animation-loop
    var offset = 0;
    setInterval(function () {
      for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = colorwheel((offset + i) % 256);
      }

      offset = (offset + 1) % 256;
      screen.render(pixelData);
    }, 1000 / 60);
  }

  if (game=="soundwave") {
    //animate up
    
    setInterval(function () {
      var bottomColor = 0;
      if (Math.random()>0.8) bottomColor = 0xFE3322;

      var step = 2;

      col1 = pixelData.slice(0,150-step);
      col2 = pixelData.slice(150+step,300);
      col3 = pixelData.slice(300,450-step);
      col4 = pixelData.slice(450+step,600);
      col5 = pixelData.slice(600,750-step);

      pixelData.set(col1, step);
      pixelData.set(col2, 150);
      pixelData.set(col3, 300+step);
      pixelData.set(col4, 450);
      pixelData.set(col5, 600+step);

      pixelData[0] = bottomColor;
      pixelData[299] = bottomColor;
      pixelData[300] = bottomColor;
      pixelData[599] = bottomColor;
      pixelData[600] = bottomColor;

      pixelData[1] = bottomColor;
      pixelData[298] = bottomColor;
      pixelData[301] = bottomColor;
      pixelData[598] = bottomColor;
      pixelData[601] = bottomColor;
      
      screen.render(pixelData);
     
    }, 1000 / 45);

    setInterval(function() {
      //pixelData[0] = 19827323;
    }, 2000);
  }
}

console.log('Press <ctrl>+C to exit.');


// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}