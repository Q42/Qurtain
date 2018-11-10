  var utils = require('./utils');

  var offset = 0;
  function start(screen, pixelData) {
    
    screen.render(pixelData);
    
    setInterval(function () {
      for (var i = 0; i < pixelData.length; i++) {
        
        if (Math.random()>0.95)
        {
          //Turn on
         // pixelData[i] = 0xFFFFFF;
         pixelData[i] = colorwheel((offset) % 256);
          screen.render(pixelData);
          offset = (offset + 1) % 256;
          setTimeout(function (n) {
            pixelData[n] = 0;
            screen.render(pixelData);
          }, 1000 / 4, i);
        }

    }
    }, 1000 / 60);
  }

  
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

   
  module.exports.start = start;