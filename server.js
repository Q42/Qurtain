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
  animateUp: 0,
  mic: 0,
  logo: 1,
  image: 0,
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

//startAutoMode(algorithms);

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
  }, 1000 * 3, currentAlgIndex);
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
}, 1000);

console.log('Press <ctrl>+C to exit.');
