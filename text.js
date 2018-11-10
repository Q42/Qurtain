  var utils = require('./utils');
  
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
  
  var intervalId;
  function start(screen, pixelData) {
    setText(pixelData, 'wootcamp', screen);
    utils.moveUp(pixelData);
    utils.moveUp(pixelData);

    screen.render(pixelData);
    
    intervalId = setInterval(function () {
      if (Math.random()>0.97) setText(pixelData, 'wootcamp', screen);

      utils.moveUp(pixelData);
      screen.render(pixelData);
    
    }, 1000 / 30);
  }

  function setText(pixelData, txt, screen)
  {
    var chars = txt.split('');
    for(i = 0; i < chars.length; i++)
    {
      setChar(pixelData, chars[i], screen);
    }
  }

  function setChar(pixelData, char, screen)
  {
    if(char == 'a') utils.setChar(pixelData, a, screen);
    if(char == 'b') utils.setChar(pixelData, b, screen);
    if(char == 'c') utils.setChar(pixelData, c, screen);
    if(char == 'd') utils.setChar(pixelData, d, screen);
    if(char == 'e') utils.setChar(pixelData, e, screen);
    if(char == 'f') utils.setChar(pixelData, f, screen);
    if(char == 'g') utils.setChar(pixelData, g, screen);
    if(char == 'h') utils.setChar(pixelData, h, screen);
    if(char == 'i') utils.setChar(pixelData, i, screen);
    if(char == 'j') utils.setChar(pixelData, j, screen);
    if(char == 'k') utils.setChar(pixelData, k, screen);
    if(char == 'l') utils.setChar(pixelData, l, screen);
    if(char == 'm') utils.setChar(pixelData, m, screen);
    if(char == 'n') utils.setChar(pixelData, n, screen);
    if(char == 'o') utils.setChar(pixelData, o, screen);
    if(char == 'p') utils.setChar(pixelData, p, screen);
    if(char == 'q') utils.setChar(pixelData, q, screen);
    if(char == 'r') utils.setChar(pixelData, r, screen);
    if(char == 's') utils.setChar(pixelData, s, screen);
    if(char == 't') utils.setChar(pixelData, t, screen);
    if(char == 'u') utils.setChar(pixelData, u, screen);
    if(char == 'v') utils.setChar(pixelData, v, screen);
    if(char == 'w') utils.setChar(pixelData, w, screen);
    if(char == 'x') utils.setChar(pixelData, x, screen);
    if(char == 'y') utils.setChar(pixelData, y, screen);
    if(char == 'z') utils.setChar(pixelData, z, screen);


  
    
  }
  function stop()
  {
    clearInterval(intervalId);
    console.log("stopped text " + intervalId);
  }
  
    module.exports.stop = stop;
   
  module.exports.start = start;