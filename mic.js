var _ = require ('lodash');
var utils = require ('./utils');
var animateUp = require('./animateUp');
const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;
const ifft = require('fft-js').ifft;

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
  const killsoundFactor = 1.3;
  let time = null;
  let buffers = [];
  let lastAmplitude = 0;
  let colorLine = [0,0,0,0,0];

  micInputStream.on('data', buffer => {
    const newTime = new Date().getTime(); 
    buffers.push(buffer); // -> save previous recorded data
    //console.log("buf hit.",  buffer.length);
    if(newTime - time > minTime) { // -> start do something if min time pass
      const headerBuf = header(config.rate, config); // ->  create wav header
      buffers.unshift(headerBuf); // -> set header in top of buffers
      const length = _.sum(buffers.map(b => b.length));
      
      WavDecoder.decode(Buffer.concat(buffers, length)) // -> decode buffers to float array
        .then(audioData => {
          const wave = audioData.channelData[0];
          const maxAmplitude = _.max(wave);
          if (maxAmplitude > lastAmplitude) lastAmplitude = maxAmplitude;

          // fourier analys
          var phasors= fft(audioData.channelData[0]);

          var frequencies = fftUtil.fftFreq(phasors, 16000), // Sample rate and coef is just used for length, and frequency step
              magnitudes = fftUtil.fftMag(phasors);

          var both = frequencies.map(function (f, ix) {
            return {frequency: f, magnitude: magnitudes[ix]};
          });
          //console.log('ifft', ifft(phasors));

          //console.log('fft ready', both);

          //

          // group by freq
          var cnts = [0,0,0,0,0];
          for (var i=0; i<both.length; i++) {
            var b = both[i]; b0 = b.frequency;
            var segment;
            if (b0<500) segment = 0; else if (b0<3000) segment=1; else if (b0<6000) segment =2; else if (b0<12000) segment=3; else if (b0<20000) segment = 4;
            cnts[segment] += both[i].magnitude;
          }

          console.log(cnts);
          colorLine = cnts;
        })
        .catch(console.log);
      time = newTime; // -> reset the timer
      buffers = []; // free recorded data
    }
  });

  micInstance.start();
  animateUp.onAnimationFrame(function(pixelData) {
    // write line
    var maxAmplitude = lastAmplitude;

    var line = [30,60,100,60,30];
    var baseAmplification = 5;
    var addColor = [];
    for (var i=0; i<line.length; i++) {
      var color = Math.min(Math.floor(line[i] * maxAmplitude*baseAmplification / 100 * 255), 255);
      red = Math.min(1000,colorLine[i])/4;
      addColor.push(utils.rgb2Int(red,color,color));

    }


    utils.writeLine(pixelData, 149, addColor, false);

    if (lastAmplitude>0) lastAmplitude=lastAmplitude/killsoundFactor;

  })
  
}

module.exports.start = start;