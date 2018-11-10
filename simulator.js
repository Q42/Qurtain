var webserver = require('./webserver');

var NUM_LEDS = null;
var lastScreen = [];

function init(num_leds) {
  NUM_LEDS = num_leds;   
  
}

function render(pixelData) {
  if (pixelData) {
    lastScreen = pixelData;
    webserver.send( "[" + pixelData.join(',') + "]" );
  }
}

function reset() {
    // clear screen
    
    render(lastScreen)
}

module.exports.init = init;
module.exports.render = render;
module.exports.reset = reset; 
