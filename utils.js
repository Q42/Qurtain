const _ = require('lodash')

function setChar(pixelData, charar, screen)
   {
     var offColor = 0;
     var textColor = 0xFE3322;
   
     for(i = 0; i < 5; i++)
     {
       var original = charar[i].toString(2).padStart(7, '0');
       var bits = reverse(reverse(original).substr(2));
       for(c = 0; c < 5; c++)
       {
         var color = offColor;
         if(bits[c] == "1")
         {
           color = textColor;
         }
   
         if(c == 0) pixelData[0] = color;
         if(c == 1) pixelData[299] = color;
         if(c == 2) pixelData[300] = color;
         if(c == 3) pixelData[599] = color;
         if(c == 4) pixelData[600] = color;
         
   
      }
      moveUp(pixelData);
      screen.render(pixelData);
     //wait(1000/40);
       
     }
     emptyLine(pixelData);
    moveUp(pixelData);
    moveUp(pixelData);
   
   
   }

      
  function wait(ms)
  {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
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

function writeLine(pixelData, row, colorArray, merge)
{
  var fromBottom = 149-row; 

  writePixel(pixelData, 0+fromBottom, colorArray[0], merge);
  writePixel(pixelData, 299-fromBottom, colorArray[1], merge);
  writePixel(pixelData, 300+fromBottom, colorArray[2], merge);
  writePixel(pixelData, 599-fromBottom, colorArray[3], merge);
  writePixel(pixelData, 600+fromBottom, colorArray[4], merge);
}

function writePixel(pixelData, pos, newColor, merge) {
  var color = pixelData[pos];
  if (merge) {
    color = color + newColor;
  } else {
    color = newColor;
  }
  pixelData[pos] = color;

  //console.log("writePixel hit", pos,pixelData[pos],  newColor);
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

const createMatrix = (w, h) => Array(h).fill(0).map(x => Array(w).fill(0))

const matrixToPixels = (matrix) => _
  .chain(matrix)
  .unzip()
  .map((col, i) => i % 2 === 0 ? col.reverse() : col)
  .flatten()
  .value()

const drawImage = (matrix, img, x, y) =>
    img.forEach((row, i) =>
        row.forEach((pixel, j) => 
            drawPixel(matrix, pixel, x+j, y+i)))

const drawPixel = (matrix, pixel, x, y) => { 
    if (y >= 0 && y < matrix.length &&
        x >= 0 && x < matrix[y].length) {
        matrix[y][x] = pixel
    }
}

module.exports.setChar = setChar;
module.exports.reverse = reverse;
module.exports.moveUp = moveUp;
module.exports.emptyLine = emptyLine;
module.exports.writeLine = writeLine;
module.exports.writePixel = writePixel;
module.exports.rgb2Int = rgb2Int;

module.exports.createMatrix = createMatrix;
module.exports.matrixToPixels = matrixToPixels;
module.exports.drawImage = drawImage;