const utils = require('./utils');
const webserver = require('./webserver');

const COLORS = [0xFF2020, 0x20FFFF, 0x2020F0, 0x20F020];
var intervalId = null;

var pieces = {

long:[

[[0,0,0,0],
 [1,1,1,1],
 [0,0,0,0],
 [0,0,0,0]],

[[0,1,0,0],
 [0,1,0,0],
 [0,1,0,0],
 [0,1,0,0]]

],

square: [
  [[0,1,1],
   [0,1,1]]
],

L1: [

    [[0,1,0],
     [0,1,0],
     [0,1,1]],

    [[0,0,0],
     [1,1,1],
     [1,0,0]],

    [[1,1,0],
     [0,1,0],
     [0,1,0]],

    [[0,0,1],
     [1,1,1],
     [0,0,0]],

],

L2: [

    [[0,1,0],
     [0,1,0],
     [1,1,0]],

    [[1,0,0],
     [1,1,1],
     [0,0,0]],

    [[0,1,1],
     [0,1,0],
     [0,1,0]],

    [[0,0,0],
     [1,1,1],
     [0,0,1]]

],

S1: [

    [[0,0,0],
     [1,1,0],
     [0,1,1]],

    [[0,1],
     [1,1],
     [1,0]]
],

S2: [

    [[0,0,0],
     [0,1,1],
     [1,1,0]],

    [[1,0],
     [1,1],
     [0,1]]
     
],

T: [

    [[0,1,0],
     [1,1,1]],

    [[0,1,0],
     [0,1,1],
     [0,1,0]],

    [[0,0,0],
     [1,1,1],
     [0,1,0]],

    [[0,1,0],
     [1,1,0],
     [0,1,0]]


]


};

/**
 * Given a matrix, and an optional offset,
 * returns the pixel positions that are lit
 * as an array of x, y 
 */ 
function litPositions(matrix, offset) {
    offset = offset || {x: y, y:0};

    var positions = []
    for (var y = 0; y < matrix.length; ++y)
        for (var x = 0; x < matrix[y].length; ++x)
            if (matrix[y][x])
                positions.push({x:x+offset.x, y: y+offset.y})

    return positions;
}


var pieceNames = Object.keys(pieces);

function GamePiece(opt) {
    opt = opt || {};
    this.x = opt.x != null ? opt.x :  1;
    this.y = opt.y != null ? opt.y :  0;
    this.piece = opt.piece || pieces[pieceNames[
        Math.floor(pieceNames.length * Math.random())]];
    this.color = opt.color || Math.floor(Math.random()*4);
    this.rotation = opt.rotation || 0;

}

GamePiece.prototype.rotate = function() {
    return new GamePiece({
        x: this.x,
        y: this.y,
        piece: this.piece,
        rotation: (this.rotation + 1) % this.piece.length,
        color: this.color
    });
};

GamePiece.prototype.move = function(opt) {
    return new GamePiece({
        x: this.x + (opt.dx || 0), 
        y: this.y + (opt.dy || 0),
        piece: this.piece, 
        rotation: this.rotation,
        color: this.color

    });
};
GamePiece.prototype.legal = function(board) {
    var currentMatrix = this.piece[this.rotation];
    var litPos = litPositions(currentMatrix, this);
    for (var k = 0; k < litPos.length; ++k) {
        var pos = litPos[k];
        if (pos.x < 0 || pos.x >= 5
           || pos.y < 0 || pos.y >= 150) return false;
    }
    for (var k = 0; k < litPos.length; ++k) 
        if (board.matrix[litPos[k].y][litPos[k].x])
            return false;

    return true;

};


function emptyRow() {
    return [0,0,0,0,0];
}

function emptyMatrix() {
    var matrix = [];
    for (var k = 0; k < 150; ++k)
        matrix.push(emptyRow());
    return matrix;
}

function cloneMatrix(matrix) {
    return matrix.map(function(item) { 
        return item.slice(); 
    });
}

function cleanMatrix(matrix) {
    var result = [];
    for (var k = 0; k < matrix.length; ++k) {
        var row = matrix[k];
        var include = false;
        for (var j = 0; j < row.length; ++j)
            if (!row[j]) {
                include = true; 
                break;
            }
        if (include) 
            result.push(row.slice());
        else 
            result.unshift(emptyRow());
    }
    return result;
}

function GameBoard(opt) {
    opt = opt || {};
    // todo: pick random starting piece
    this.piece = opt.piece || new GamePiece();
    this.matrix = opt.matrix || emptyMatrix();

}


GameBoard.prototype.merge = function(opt) {
    var newmatrix = cloneMatrix(this.matrix);
    var pieceMatrix = opt.piece.piece[opt.piece.rotation];
    litPositions(pieceMatrix, opt.piece)
        .forEach(function(pos) {
            newmatrix[pos.y][pos.x] = opt.piece.color;
            //console.log("piece", opt.piece.color);
        });
    return new GameBoard({
        matrix: newmatrix, 
        piece: opt.create || null
    });
};

GameBoard.prototype.clean = function(opt) {
    return new GameBoard({
        piece:this.piece,
        matrix: cleanMatrix(this.matrix)
    });
}

GameBoard.prototype.currentMatrix = function() {
    return this.merge({piece: this.piece}).matrix;
}


GameBoard.prototype.down = function down() {
    var moved = this.piece.move({dy:1});
    if (moved.legal(this)) {
       
        return new GameBoard({
          piece: moved, 
          matrix: this.matrix
      });
      }
    else {
        return this.merge({
            piece: this.piece, 
            create: new GamePiece()
        }).clean();
      }
}

GameBoard.prototype.generic = function(f, after) {
    var newPiece = f(this.piece);
    if (newPiece.legal(this))
        return new GameBoard({
            piece: newPiece,
            matrix: this.matrix
        });
    else
        return this;
};

GameBoard.prototype.left = function left() {
    return this.generic(function(p) { 
        return p.move({dx: -1}); 
    });
};

GameBoard.prototype.right = function right() {
    return this.generic(function(p) { 
        return p.move({dx: 1}); 
    });
};

GameBoard.prototype.rotate = function rotate() {
    return this.generic(function(p) { 
        return p.rotate();
    });
};


function renderBoardToLeds(matrix, screen, pixelData) {
  var pixels = utils.matrixToPixels(matrix);
  for (var i=0; i<pixels.length; i++) {
    if (pixels[i]>0) {
      //console.log(pixels[i])
      pixels[i] = COLORS[pixels[i]]; 
      
    }
  }
  pixelData.set(pixels, 0);
  screen.render(pixelData); 
}

function processKeyPress(msg) {
  if (msg == 'left')
    board = board.left();
  else if (msg == 'right')
    board = board.right();
  else if (msg == 'down') {
  // todo: down until bottom?
    board = board.down();
    board = board.down();
    board = board.down();
    board = board.down();
    board = board.down();
    
  }
  else if (msg == 'up')
    board = board.rotate();

  renderBoardToLeds(board.currentMatrix(), screen, pixelData);
}

var board =null;
var screen = null;
var pixelData = null;

function start(receivedScreen, receivedPixelData){
  board = new GameBoard();
  screen = receivedScreen;
  pixelData = receivedPixelData;

  webserver.onReceive(processKeyPress)

  intervalId = setInterval(function() {
      board = board.down();

      renderBoardToLeds(board.currentMatrix(), screen, pixelData);

  }, 100);

}


function stop()
{
  clearInterval(intervalId);
  webserver.unRegisterOnReceive(processKeyPress);
  console.log("stopped text " + intervalId);
}

module.exports.start = start;
module.exports.stop = stop;