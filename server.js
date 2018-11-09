var fs = require('fs');
var data = require('./data');

// find out on what screen we want to render
var screen = null;
var algorithms = {
  loop: 0,
  text: 0,
  animateUp: 1,
  mic: 0
} 

var mode = "raspberryPi";
try { 
  require.resolve('rpi-ws281x-native'); 
  screen = require('rpi-ws281x-native');
} catch (e) { 
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
}



console.log('Press <ctrl>+C to exit.');
