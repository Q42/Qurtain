var fs = require('fs');
    

// find out on what screen we want to render
var screen = null;

var game = "text";

var mode;

try {
  var areWeOnRaspberry = require.resolve('rpi-ws281x-native');
  mode = "live";
} catch (e) {
  mode = "simulator";
  //console.log("error while connecting to rpi native", e);
}

if (mode=="live") {
  console.log("running on live Rpi");
  screen = require('rpi-ws281x-native');
} else {
  console.log("running on simulator");
  screen = require('./simulator');
}

var NUM_LEDS = 750;
var pixelData = new Uint32Array(NUM_LEDS);

screen.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  screen.reset();
  process.nextTick(function () { process.exit(0); });
});

setTimeout(boot, 2000);

function boot() {


  if (game=="loop") {

    // ---- animation-loop
    var offset = 0;
    setInterval(function () {
      for (var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = colorwheel((offset + i) % 256);
      }

      offset = (offset + 1) % 256;
      screen.render(pixelData);
    }, 1000 / 60);
  }

  if (game=="soundwave") {
    //animate up
    setInterval(function () {
      var bottomColor = 0;
      if (Math.random()>0.8) bottomColor = 0xFE3322;

      var step = 2;

      col1 = pixelData.slice(0,150-step);
      col2 = pixelData.slice(150+step,300);
      col3 = pixelData.slice(300,450-step);
      col4 = pixelData.slice(450+step,600);
      col5 = pixelData.slice(600,750-step);

      pixelData.set(col1, step);
      pixelData.set(col2, 150);
      pixelData.set(col3, 300+step);
      pixelData.set(col4, 450);
      pixelData.set(col5, 600+step);

      pixelData[0] = Math.floor(bottomColor * Math.random());
      pixelData[299] = Math.floor(bottomColor * Math.random());
      pixelData[300] = Math.floor(bottomColor * Math.random());
      pixelData[599] = Math.floor(bottomColor * Math.random());
      pixelData[600] = Math.floor(bottomColor * Math.random());

      pixelData[1] = Math.floor(bottomColor * Math.random());
      pixelData[298] = Math.floor(bottomColor * Math.random());;
      pixelData[301] = Math.floor(bottomColor * Math.random());;
      pixelData[598] = Math.floor(bottomColor * Math.random());;
      pixelData[601] = Math.floor(bottomColor * Math.random());;

      screen.render(pixelData);
     
    }, 1000 / 30);

    // mount mic
    var mic = require('mic');

    var micInstance = mic({
      rate: '16000',
      channels: '1',
      debug: true,
      exitOnSilence: 6
    });

    console.log("mounting mic");
    var micInputStream = micInstance.getAudioStream();

    micInputStream.on('data', function(data) {
      console.log("Recieved Input Stream: " + data.length);
    });

    setInterval(function() {
      //pixelData[0] = 19827323;
    }, 2000);
    micInputStream.on('silence', function() {
      console.log("silence");
    });

    //var outputFileStream = fs.WriteStream('output.raw');

    //micInputStream.pipe(outputFileStream);

    micInstance.start();

  }
  if(game=="text"){

  
 var a = [0x7c,0x44,0x44,0x7c,0x44];    
 var b = [0x7c,0x44,0x78,0x44,0x7c];  
 var c = [0x7c,0x40,0x40,0x40,0x7c];  
 var d = [0x78,0x44,0x44,0x44,0x78];  
 var e = [0x7c,0x40,0x78,0x40,0x7c];
 var f = [0x7c,0x40,0x70,0x40,0x40];
 var g = [0x7c,0x40,0x4c,0x44,0x7c];
 var h = [0x44,0x44,0x7c,0x44,0x44];
 var i = [0x7c,0x10,0x10,0x10,0x7c];
 var j = [0x0c,0x04,0x04,0x44,0x7c];
 var k = [0x44,0x48,0x70,0x48,0x44];
 var l = [0x40,0x40,0x40,0x40,0x7c];
 var m = [0x44,0x6c,0x54,0x44,0x44];
 var n = [0x44,0x64,0x54,0x4c,0x44];
 var o = [0x38,0x44,0x44,0x44,0x38];  
 var p = [0x78,0x44,0x78,0x40,0x40];              
 var q = [0x7c,0x44,0x44,0x7c,0x10];            
 var r = [0x78,0x44,0x78,0x44,0x44];            
 var s = [0x7c,0x40,0x7c,0x04,0x7c];            
 var t = [0x7c,0x10,0x10,0x10,0x10];              
 var u = [0x44,0x44,0x44,0x44,0x7c];            
 var v = [0x44,0x44,0x28,0x28,0x10];            
 var w = [0x44,0x44,0x54,0x54,0x28];            
 var x = [0x44,0x28,0x10,0x28,0x44];            
 var y = [0x44,0x44,0x28,0x10,0x10];            
 var z = [0x7c,0x08,0x10,0x20,0x7c]; 

  
 setChar(pixelData, h);
 setChar(pixelData, a);
 setChar(pixelData, l);
 setChar(pixelData, l);
 setChar(pixelData, o);
 moveUp(pixelData);
 moveUp(pixelData);
 
    setInterval(function () {
      if (Math.random()>0.97) setChar(pixelData, o);

      moveUp(pixelData);
     
    }, 1000 / 30);
  }
}


function setChar(pixelData, charar)
{
  var offColor = 0;
  var textColor = 0xFE3322;

 

  for(i = 0; i < 5; i++)
  {
    var original = charar[i].toString(2).padStart(7, '0');
    var bits = reverse(reverse(original).substr(2));
    console.log(bits);
    for(c = 0; c < 5; c++)
    {
      var color = offColor;
      if(bits[c] == "1")
      {
        //console.log("1")
        color = textColor;
      }

      if(c == 0) pixelData[0] = color;
      if(c == 1) pixelData[299] = color;
      if(c == 2) pixelData[300] = color;
      if(c == 3) pixelData[599] = color;
      if(c == 4) pixelData[600] = color;
      

    }
 moveUp(pixelData);
  
    
  }
  emptyLine(pixelData);
 moveUp(pixelData);
 moveUp(pixelData);


}

function reverse(s){
  return s.split("").reverse().join("");
}

function moveUp(pixelData)
{
      col1 = pixelData.slice(0,149);
      col2 = pixelData.slice(151,300);
      col3 = pixelData.slice(300,449);
      col4 = pixelData.slice(451,600);
      col5 = pixelData.slice(600,749);

      pixelData.set(col1, 1);
      pixelData.set(col2, 150);
      pixelData.set(col3, 301);
      pixelData.set(col4, 450);
      pixelData.set(col5, 601);

     

      screen.render(pixelData);
}

function emptyLine(pixelData)
{
  var bottomColor = 0;
  pixelData[0] = bottomColor;
  pixelData[299] = bottomColor;
  pixelData[300] = bottomColor;
  pixelData[599] = bottomColor;
  pixelData[600] = bottomColor;
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

console.log('Press <ctrl>+C to exit.');
