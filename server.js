var fs = require('fs');
var data = require('./data');
const isPi = require('detect-rpi');
var webserver = require('./webserver');

// find out on what screen we want to render
var screen = null;
var currentAlg = null;
var enabledAlgs = [];
var currentAlgIndex = 0;
var intervalId;
var algorithms = {
  loop: 0,
  text: 1,
  mic: 0,
  logo: 1,
  image: 1,
  tetris: 0,
  stars: 1,
} 

if (isPi()) {
  screen = require('rpi-ws281x-native');
} else {
  screen = require('./simulator');
}

  // initialize screen
screen.init(data.NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  screen.reset();
  process.nextTick(function () { process.exit(0); });
});

console.log("screen is initialized");


function startAutoMode(algs) {
 
  // load modules
  for (var file in algs) {
    if (algs[file]>0) {
      enabledAlgs.push(file);
    }
  }

  intervalId = setInterval(function () {
    start(enabledAlgs[currentAlgIndex]);
    currentAlgIndex++;
    if(currentAlgIndex >= enabledAlgs.length) currentAlgIndex = 0;
  }, 1000 * 10, currentAlgIndex);
}

function start(file)
{
  if(currentAlg) currentAlg.stop();
  
  var alg = require("./" +file);
  if (alg && alg.start) 
  {
    alg.start(screen, data.pixelData);
    console.log("Start: " + file);
    currentAlg = alg;
  }
}

function startManual(file)
{
  //Stop auto mode
  if(intervalId) clearInterval(intervalId);

  start(file);
}

// intialize webserver (both for optional simulator as remote);
webserver.start();

setTimeout(function() {
  startManual('stars');
}, 500);
  
webserver.onReceive(function(msg) {
  if(msg == 'text') startManual('text');
  if(msg == 'image') startManual('image');
  if(msg == 'logo') startManual('logo');
  if(msg == 'mic') startManual('mic');
  if(msg == 'stars') startManual('stars');
  if(msg == 'tetris') startManual('tetris');
});

console.log('Press <ctrl>+C to exit.');
