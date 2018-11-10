  var utils = require('./utils');

  var offset = 0;
  var intervalId;

  function start(screen, pixelData) {
    
    screen.render(pixelData);
    
    intervalId = setInterval(function () {
      for (var i = 0; i < pixelData.length; i++) {
        
        if (Math.random()>0.99)
        {
          //Turn on
         pixelData[i] = 0xFFFFFF;
         //pixelData[i] = colorwheel((offset) % 256);
         
          offset = (offset + 1) % 256;
          setTimeout(function (n) {
            pixelData[n] = 0;
            screen.render(pixelData);
          }, 2000 * Math.random(), i);
        }

    }

    screen.render(pixelData);
    }, 1500);
  }

function stop()
{
  clearInterval(intervalId);
  console.log("stopped stars " + intervalId);
}

  module.exports.stop = stop;
  module.exports.start = start;
