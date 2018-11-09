var _ = require ('lodash');
var utils = require ('./utils');

function start(screen, pixelData) {
  // mount mic
  var mic = require('mic');
  var WavDecoder = require('wav-decoder');
  var header = require("waveheader");

  var config = {
    rate: '16000',
    channels: '1',
    //size: 4096,
    //bitwidth: 8,
    debug: false,
    exitOnSilence: 3
  };

  var micInstance = mic(config);

  console.log("mounting mic");
  var micInputStream = micInstance.getAudioStream();
    
  const minTime = 200; // ms
  const threshold = 0.7;
  let time = null;
  let buffers = [];

  micInputStream.on('data', buffer => {
    const newTime = new Date().getTime(); 
    buffers.push(buffer); // -> save previous recorded data
    console.log("buf hit.",  buffer.length);
    if(newTime - time > minTime) { // -> start do something if min time pass
      const headerBuf = header(config.rate, config); // ->  create wav header
      buffers.unshift(headerBuf); // -> set header in top of buffers
      const length = _.sum(buffers.map(b => b.length));
      
      WavDecoder.decode(Buffer.concat(buffers, length)) // -> decode buffers to float array
        .then(audioData => {
          const wave = audioData.channelData[0];
          const maxAmplitude = _.max(wave);
          if (maxAmplitude > threshold) {
            console.log('-----> clap'); // -> any logic here
          }

          // writeline of amplitude in blue
          var line = [20,60,120,40,20];
          var addColor = [];
          for (var i=0; i<line.length; i++) {
            var color = Math.min(Math.floor(line[i] * maxAmplitude / 100 * 255), 255);
            if (color>50) addColor.push(0xffffff); else addColor.push(0);

          }

          utils.writeLine(pixelData, 149, addColor, false);
          screen.render(pixelData);
          console.log(maxAmplitude, addColor);
        })
        .catch(console.log);
      time = newTime; // -> reset the timer
      buffers = []; // free recorded data
    }
  });

  micInstance.start();
}

module.exports.start = start;