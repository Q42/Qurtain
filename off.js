  var utils = require('./utils');
  var data = require('./data');

  function start(screen, pixelData) {
    
    for (var i = 0; i < data.NUM_LEDS; i++) {
      pixelData[i] = 0;
    }
    screen.render(pixelData);
    
  }

function stop()
{
  //console.log("stopped stars " + intervalId);
}

  module.exports.stop = stop;
  module.exports.start = start;
