var fs = require('fs');
var data = require('./data');
const isPi = require('detect-rpi');
var webserver = require('./webserver');

// find out on what screen we want to render
var screen = null;
var algorithms = {
  loop: 0,
  text: 0,
  animateUp: 0,
  mic: 0,
  logo: 0,
  image: 0,
  tetris: 1,
  stars: 0
} 

if (isPi()) {
  screen = require('rpi-ws281x-native');
} else {
  screen = require('./simulator');
}

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  screen.reset();
  process.nextTick(function () { process.exit(0); });
});

boot(algorithms);

function boot(algs) {
  // initialize screen
  screen.init(data.NUM_LEDS);

  // load modules
  for (var file in algs) {
    if (algs[file]>0) {
        
      var alg = require("./" +file);
      if (alg && alg.start) alg.start(screen, data.pixelData);
    }
  }

  // intialize webserver (both for optional simulator as remote);
  webserver.start();

}



console.log('Press <ctrl>+C to exit.');
