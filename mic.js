function start(screen, pixelData) {
  // mount mic
  var mic = require('mic');
  var WavDecoder = require('wav-decoder');
  var header = require("waveheader");
  
  var micInstance = mic({
    rate: '8000',
    channels: '1',
    bitwidth: 8,
    debug: true,
    exitOnSilence: 3
  });

  console.log("mounting mic");
  var micInputStream = micInstance.getAudioStream();
    
  const minTime = 500; // ms
  const threshold = 0.7;
  let time = null;
  let buffers = [];

  micInputStream.on('data', buffer => {
    const newTime = new Date().getTime(); 
    buffers.push(buffer); // -> save previous recorded data
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
        })
        .catch(console.log);
      time = newTime; // -> reset the timer
      buffers = []; // free recorded data
    }
  });

  micInstance.start();
}

module.exports.start = start;