var intervalId;

function start() {

  // ---- animation-loop
  var offset = 0;
  intervalId = setInterval(function () {
    for (var i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = colorwheel((offset + i) % 256);
    }

    offset = (offset + 1) % 256;
    screen.render(pixelData);
  }, 1000 / 60);
  }

  
  function stop()
  {
    clearInterval(intervalId);
  }
  
module.exports.stop = stop;
module.exports.start = start;