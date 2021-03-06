 const beatSpeed = -1;

 let animationFrameListeners = [];
 var intervalId;

 function start(screen, pixelData) {
   //animate up
   
   var heartBeat = 0;

   intervalId = setInterval(function () {

    if (pixelData) {
      if (animationFrameListeners.length>0) {
        // call listeners
        for (var i=0; i<animationFrameListeners.length; i++) {
          try { animationFrameListeners[i](pixelData); } catch (e) {
            console.warn("animationFrameListener raised error", e);
          }
        }

      }
    }

    var bottomColor = 0;

    heartBeat ++;
    if (heartBeat==beatSpeed) {
      heartBeat = 0;
      bottomColor = 0xFFFFFF;
    }

    var step = 1;
    
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

    if (step>=2) {
      pixelData[1] = Math.floor(bottomColor * Math.random());
      pixelData[298] = Math.floor(bottomColor * Math.random());;
      pixelData[301] = Math.floor(bottomColor * Math.random());;
      pixelData[598] = Math.floor(bottomColor * Math.random());;
      pixelData[601] = Math.floor(bottomColor * Math.random());;
    }

    
    screen.render(pixelData);
  
  }, 1000 / 30);
}

function onAnimationFrame(f) {
  if (f) animationFrameListeners.push(f);
}
function stop()
{
  clearInterval(intervalId);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.onAnimationFrame = onAnimationFrame;