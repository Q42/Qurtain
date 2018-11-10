const _ = require('lodash')

const WIDTH = 5
const HEIGHT = 150
const WIGGLE_LENGTH = 10*Math.PI

function start(screen) {
    
    var offset = 0;
    setInterval(function () {
        const matrix = createMatrix(WIDTH, HEIGHT);
        const imgWidth = 15
        const imgHeight = 72
        const img = toImage(bigLogo, imgWidth)

        const wiggle = Math.round(Math.sin(offset/WIGGLE_LENGTH) * 8)
        drawImage(matrix, img, wiggle, (offset++ % (HEIGHT+imgHeight)) -imgHeight)
        const pixels = matrixToPixels(matrix)
        screen.render(pixels);
    }, 1000 / 30)
}

module.exports.start = start;

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
    if (x >= 0 && x < WIDTH && 
        y >= 0 && y < HEIGHT) {
        matrix[y][x] = pixel
    }
}

const toImage = (raw, w) => _
  .chunk(raw, w * 4)
  .map(row => _
    .chunk(row, 4)
    .map(p => p[0]<<16|p[1]<<8|p[2]))
    
const createMatrix = (w, h) => Array(h).fill(0).map(x => Array(w).fill(0))

// Converted using https://littlevgl.com/image-to-c-array
// Color format:  True color
// Output format: C array
// Use LV_COLOR_DEPTH == 32 array from generated .c file
const raw = [
    0x00, 0x00, 0x00, 0xff, 0x0b, 0x41, 0x2b, 0xff, 0x16, 0xb3, 0x7b, 0xff, 0x0b, 0x40, 0x2a, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x02, 0x01, 0xff, 0x1c, 0xa3, 0x71, 0xff, 0x50, 0xd5, 0x9c, 0xff, 0x1c, 0xa2, 0x70, 0xff, 0x00, 0x02, 0x01, 0xff, 
    0x00, 0x34, 0x16, 0xff, 0x85, 0xd3, 0xac, 0xff, 0xf9, 0xfa, 0xfa, 0xff, 0x82, 0xd1, 0xaa, 0xff, 0x00, 0x38, 0x19, 0xff, 
    0x00, 0x64, 0x38, 0xff, 0xbc, 0xeb, 0xd2, 0xff, 0xe1, 0xec, 0xe6, 0xff, 0xba, 0xe9, 0xd0, 0xff, 0x00, 0x67, 0x3d, 0xff, 
    0x1d, 0x89, 0x60, 0xff, 0xb9, 0xe8, 0xcf, 0xff, 0x69, 0xc0, 0x96, 0xff, 0xba, 0xe8, 0xcf, 0xff, 0x1d, 0x8c, 0x61, 0xff, 
    0x37, 0x9f, 0x73, 0xff, 0xb4, 0xe3, 0xca, 0xff, 0x50, 0xbd, 0x8c, 0xff, 0xb2, 0xe2, 0xc9, 0xff, 0x38, 0xa1, 0x75, 0xff, 
    0x39, 0xa8, 0x79, 0xff, 0xac, 0xdf, 0xc4, 0xff, 0x97, 0xd0, 0xb2, 0xff, 0xcc, 0xec, 0xdb, 0xff, 0x06, 0xa6, 0x71, 0xff, 
    0x08, 0xb2, 0x79, 0xff, 0xb2, 0xde, 0xc7, 0xff, 0xbb, 0xde, 0xcb, 0xff, 0xce, 0xe9, 0xda, 0xff, 0x00, 0xb2, 0x75, 0xff, 
    0x00, 0xac, 0x6c, 0xff, 0xa9, 0xdb, 0xc0, 0xff, 0xfc, 0xfc, 0xfc, 0xff, 0xda, 0xef, 0xe4, 0xff, 0x15, 0xb3, 0x7a, 0xff, 
    0x07, 0xa4, 0x6f, 0xff, 0x55, 0xc7, 0x95, 0xff, 0xb9, 0xdc, 0xc9, 0xff, 0x69, 0xcb, 0x9d, 0xff, 0x1b, 0xa6, 0x73, 0xff, 
    0x1d, 0x9a, 0x6b, 0xff, 0x40, 0xc6, 0x8f, 0xff, 0x7f, 0xc7, 0xa3, 0xff, 0x84, 0xd4, 0xac, 0xff, 0x00, 0x9a, 0x67, 0xff, 
    0x00, 0x7f, 0x4f, 0xff, 0x90, 0xdb, 0xb5, 0xff, 0xcd, 0xe3, 0xd7, 0xff, 0xb3, 0xe6, 0xcb, 0xff, 0x00, 0x84, 0x58, 0xff, 
    0x00, 0x61, 0x3b, 0xff, 0xa6, 0xe3, 0xc4, 0xff, 0x9e, 0xd0, 0xb6, 0xff, 0x95, 0xdc, 0xb8, 0xff, 0x10, 0x67, 0x46, 0xff, 
    0x00, 0x3a, 0x1c, 0xff, 0xc8, 0xec, 0xd9, 0xff, 0xd5, 0xe9, 0xde, 0xff, 0x87, 0xd4, 0xad, 0xff, 0x00, 0x3d, 0x22, 0xff, 
    0x00, 0x15, 0x06, 0xff, 0x69, 0xbf, 0x96, 0xff, 0xcc, 0xec, 0xdb, 0xff, 0xad, 0xd3, 0xbf, 0xff, 0x00, 0x13, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x97, 0x65, 0xff, 0x2a, 0xcd, 0x8f, 0xff, 0x34, 0x9a, 0x6f, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x1e, 0x76, 0x52, 0xff, 0x32, 0xd6, 0x96, 0xff, 0x10, 0x74, 0x4f, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x0f, 0x52, 0x37, 0xff, 0x34, 0xd3, 0x95, 0xff, 0x0f, 0x50, 0x36, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x05, 0x33, 0x21, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x05, 0x31, 0x1f, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x02, 0x1a, 0x0f, 0xff, 0x28, 0xaa, 0x77, 0xff, 0x02, 0x17, 0x0e, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x09, 0x04, 0xff, 0x1e, 0x89, 0x5f, 0xff, 0x00, 0x08, 0x04, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x02, 0x01, 0xff, 0x13, 0x63, 0x44, 0xff, 0x00, 0x02, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x07, 0x3a, 0x27, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x0c, 0x05, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff,   
]    

const dark = [
    0x00, 0x00, 0x00, 0xff, 0x00, 0x48, 0x00, 0xff, 0x00, 0xa9, 0x00, 0xff, 0x00, 0x48, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x01, 0x00, 0xff, 0x00, 0x78, 0x00, 0xff, 0x00, 0x65, 0x00, 0xff, 0x00, 0x78, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 
    0x00, 0x14, 0x00, 0xff, 0x00, 0x76, 0x00, 0xff, 0x00, 0x14, 0x00, 0xff, 0x00, 0x76, 0x00, 0xff, 0x00, 0x14, 0x00, 0xff, 
    0x00, 0x2f, 0x00, 0xff, 0x00, 0x71, 0x00, 0xff, 0x00, 0x64, 0x00, 0xff, 0x00, 0x71, 0x00, 0xff, 0x00, 0x2f, 0x00, 0xff, 
    0x00, 0x42, 0x00, 0xff, 0x00, 0x73, 0x00, 0xff, 0x00, 0x87, 0x00, 0xff, 0x00, 0x74, 0x00, 0xff, 0x00, 0x42, 0x00, 0xff, 
    0x00, 0x4e, 0x00, 0xff, 0x00, 0x77, 0x00, 0xff, 0x00, 0x77, 0x00, 0xff, 0x00, 0x6d, 0x00, 0xff, 0x00, 0x4e, 0x00, 0xff, 
    0x00, 0x71, 0x00, 0xff, 0x00, 0x75, 0x00, 0xff, 0x00, 0x54, 0x00, 0xff, 0x00, 0x65, 0x00, 0xff, 0x00, 0x76, 0x00, 0xff, 
    0x00, 0x7f, 0x00, 0xff, 0x00, 0x7e, 0x00, 0xff, 0x00, 0x12, 0x00, 0xff, 0x00, 0x5a, 0x00, 0xff, 0x00, 0x88, 0x00, 0xff, 
    0x00, 0x53, 0x00, 0xff, 0x00, 0x9c, 0x00, 0xff, 0x00, 0x48, 0x00, 0xff, 0x00, 0x8d, 0x00, 0xff, 0x00, 0x55, 0x00, 0xff, 
    0x00, 0x44, 0x00, 0xff, 0x00, 0xa4, 0x00, 0xff, 0x01, 0x81, 0x01, 0xff, 0x01, 0x96, 0x01, 0xff, 0x00, 0x46, 0x00, 0xff, 
    0x00, 0x34, 0x00, 0xff, 0x00, 0x91, 0x00, 0xff, 0x00, 0x51, 0x01, 0xff, 0x01, 0x7d, 0x01, 0xff, 0x00, 0x36, 0x00, 0xff, 
    0x00, 0x1e, 0x00, 0xff, 0x01, 0x7d, 0x01, 0xff, 0x01, 0x68, 0x02, 0xff, 0x01, 0x7d, 0x01, 0xff, 0x00, 0x1e, 0x00, 0xff, 
    0x00, 0x0b, 0x00, 0xff, 0x00, 0x5c, 0x01, 0xff, 0x00, 0x46, 0x01, 0xff, 0x01, 0x7a, 0x01, 0xff, 0x00, 0x07, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x6d, 0x01, 0xff, 0x01, 0x61, 0x02, 0xff, 0x00, 0x53, 0x01, 0xff, 0x00, 0x01, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x5f, 0x00, 0xff, 0x00, 0xa8, 0x00, 0xff, 0x00, 0x5b, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x42, 0x00, 0xff, 0x00, 0xab, 0x00, 0xff, 0x00, 0x42, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x27, 0x00, 0xff, 0x00, 0xa1, 0x00, 0xff, 0x00, 0x27, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x12, 0x00, 0xff, 0x00, 0x90, 0x00, 0xff, 0x00, 0x12, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x05, 0x00, 0xff, 0x00, 0x78, 0x00, 0xff, 0x00, 0x05, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x5c, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x3d, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x1b, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
  ]

  const bigLogo = [
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x07, 0x37, 0x24, 0xff, 0x1f, 0x8c, 0x61, 0xff, 0x08, 0x3d, 0x28, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x10, 0x5b, 0x3f, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x12, 0x61, 0x43, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x07, 0x38, 0x24, 0xff, 0x2d, 0xbb, 0x83, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x08, 0x3e, 0x29, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x02, 0x01, 0xff, 0x22, 0x98, 0x69, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x24, 0x9d, 0x6d, 0xff, 0x00, 0x06, 0x03, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x09, 0x42, 0x2c, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x0b, 0x49, 0x31, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1e, 0x89, 0x5f, 0xff, 0x2f, 0xc0, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2c, 0xb3, 0x7e, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc2, 0x88, 0xff, 0x20, 0x8f, 0x63, 0xff, 0x00, 0x01, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x02, 0x19, 0x0e, 0xff, 0x2a, 0xb2, 0x7d, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x19, 0x6d, 0x4c, 0xff, 0x02, 0x17, 0x0e, 0xff, 0x19, 0x6a, 0x49, 0xff, 0x2d, 0xbe, 0x86, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2b, 0xb7, 0x80, 0xff, 0x03, 0x21, 0x13, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0e, 0x50, 0x37, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x25, 0x9b, 0x6d, 0xff, 0x00, 0x03, 0x02, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x24, 0x95, 0x69, 0xff, 0x2e, 0xc0, 0x86, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x10, 0x57, 0x3b, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1c, 0x82, 0x5a, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x11, 0x53, 0x38, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0f, 0x4c, 0x34, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2f, 0xc2, 0x88, 0xff, 0x1e, 0x88, 0x5f, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x04, 0x02, 0xff, 0x26, 0xa4, 0x73, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2c, 0xb3, 0x7e, 0xff, 0x03, 0x1a, 0x10, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x13, 0x0b, 0xff, 0x29, 0xaf, 0x7a, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x28, 0xa9, 0x77, 0xff, 0x00, 0x0a, 0x05, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x03, 0x26, 0x18, 0xff, 0x2c, 0xb7, 0x80, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x23, 0x97, 0x6a, 0xff, 0x00, 0x01, 0x01, 0xff, 0x01, 0x0a, 0x05, 0xff, 0x13, 0x5c, 0x3f, 0xff, 0x01, 0x0e, 0x07, 0xff, 0x00, 0x00, 0x00, 0xff, 0x22, 0x91, 0x66, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2d, 0xbb, 0x83, 0xff, 0x04, 0x2d, 0x1d, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x0c, 0x4a, 0x31, 0xff, 0x2e, 0xc0, 0x86, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x1a, 0x77, 0x53, 0xff, 0x00, 0x01, 0x00, 0xff, 0x16, 0x6f, 0x4d, 0xff, 0x31, 0xcd, 0x90, 0xff, 0x18, 0x74, 0x4f, 0xff, 0x00, 0x01, 0x00, 0xff, 0x19, 0x70, 0x4e, 0xff, 0x2e, 0xc2, 0x87, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0d, 0x51, 0x37, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x15, 0x6b, 0x4a, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x12, 0x59, 0x3d, 0xff, 0x00, 0x04, 0x02, 0xff, 0x26, 0xa7, 0x75, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x29, 0xac, 0x78, 0xff, 0x00, 0x07, 0x03, 0xff, 0x0f, 0x52, 0x38, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x17, 0x72, 0x4e, 0xff, 0x00, 0x01, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x1d, 0x86, 0x5d, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2f, 0xc1, 0x88, 0xff, 0x0a, 0x3e, 0x29, 0xff, 0x04, 0x28, 0x19, 0xff, 0x2c, 0xba, 0x82, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xbe, 0x85, 0xff, 0x04, 0x2e, 0x1d, 0xff, 0x08, 0x38, 0x25, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x1f, 0x8d, 0x62, 0xff, 0x00, 0x01, 0x00, 0xff, 
    0x00, 0x01, 0x00, 0xff, 0x24, 0x9b, 0x6c, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2e, 0xbd, 0x85, 0xff, 0x05, 0x29, 0x1b, 0xff, 0x0c, 0x4a, 0x31, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0d, 0x4e, 0x35, 0xff, 0x04, 0x25, 0x17, 0xff, 0x2d, 0xb9, 0x82, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x25, 0xa1, 0x71, 0xff, 0x00, 0x05, 0x02, 0xff, 
    0x01, 0x0b, 0x05, 0xff, 0x27, 0xaa, 0x77, 0xff, 0x2e, 0xbe, 0x86, 0xff, 0x2d, 0xb9, 0x82, 0xff, 0x03, 0x1e, 0x12, 0xff, 0x12, 0x5f, 0x41, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x13, 0x65, 0x45, 0xff, 0x02, 0x1a, 0x10, 0xff, 0x2c, 0xb5, 0x7f, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x29, 0xaf, 0x7b, 0xff, 0x01, 0x12, 0x09, 0xff, 
    0x02, 0x1d, 0x11, 0xff, 0x2b, 0xb3, 0x7e, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2c, 0xb7, 0x80, 0xff, 0x02, 0x16, 0x0d, 0xff, 0x15, 0x6c, 0x4a, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x17, 0x71, 0x4e, 0xff, 0x01, 0x13, 0x0b, 0xff, 0x2b, 0xb1, 0x7d, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2c, 0xb9, 0x81, 0xff, 0x03, 0x23, 0x16, 0xff, 
    0x05, 0x2d, 0x1c, 0xff, 0x2c, 0xba, 0x82, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2b, 0xb5, 0x80, 0xff, 0x02, 0x15, 0x0c, 0xff, 0x17, 0x6f, 0x4d, 0xff, 0x2e, 0xc2, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x30, 0xc7, 0x8b, 0xff, 0x18, 0x75, 0x50, 0xff, 0x01, 0x12, 0x0a, 0xff, 0x29, 0xb0, 0x7c, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x06, 0x34, 0x23, 0xff, 
    0x08, 0x3c, 0x27, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2c, 0xb6, 0x80, 0xff, 0x02, 0x16, 0x0d, 0xff, 0x15, 0x6c, 0x4a, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2b, 0xad, 0x79, 0xff, 0x17, 0x6f, 0x4d, 0xff, 0x01, 0x13, 0x0a, 0xff, 0x2b, 0xb1, 0x7c, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x0a, 0x43, 0x2e, 0xff, 
    0x0b, 0x47, 0x30, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2c, 0xb9, 0x81, 0xff, 0x02, 0x1d, 0x11, 0xff, 0x13, 0x61, 0x42, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x10, 0x53, 0x38, 0xff, 0x0d, 0x4d, 0x34, 0xff, 0x02, 0x1b, 0x10, 0xff, 0x2c, 0xb5, 0x7f, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0d, 0x50, 0x36, 0xff, 
    0x0e, 0x52, 0x38, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x04, 0x27, 0x19, 0xff, 0x0c, 0x4d, 0x33, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x2a, 0xad, 0x79, 0xff, 0x01, 0x12, 0x0a, 0xff, 0x00, 0x06, 0x03, 0xff, 0x05, 0x2a, 0x1c, 0xff, 0x2d, 0xb9, 0x82, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x10, 0x5a, 0x3d, 0xff, 
    0x10, 0x57, 0x3d, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x08, 0x3b, 0x27, 0xff, 0x04, 0x2c, 0x1d, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x29, 0xaa, 0x78, 0xff, 0x01, 0x0c, 0x06, 0xff, 0x00, 0x00, 0x00, 0xff, 0x09, 0x3b, 0x27, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x12, 0x62, 0x43, 0xff, 
    0x1c, 0x7e, 0x57, 0xff, 0x2d, 0xbf, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x10, 0x55, 0x3a, 0xff, 0x00, 0x06, 0x03, 0xff, 0x28, 0xaa, 0x77, 0xff, 0x2f, 0xc2, 0x89, 0xff, 0x0c, 0x48, 0x31, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0f, 0x53, 0x39, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x20, 0x92, 0x65, 0xff, 
    0x27, 0xa9, 0x77, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x19, 0x73, 0x50, 0xff, 0x00, 0x01, 0x00, 0xff, 0x1a, 0x78, 0x54, 0xff, 0x31, 0xcf, 0x91, 0xff, 0x18, 0x72, 0x4f, 0xff, 0x00, 0x01, 0x00, 0xff, 0x0f, 0x56, 0x3a, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2c, 0xba, 0x83, 0xff, 
    0x27, 0xa8, 0x76, 0xff, 0x2d, 0xbc, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x22, 0x94, 0x68, 0xff, 0x00, 0x01, 0x00, 0xff, 0x01, 0x14, 0x0c, 0xff, 0x16, 0x6d, 0x4a, 0xff, 0x02, 0x19, 0x0f, 0xff, 0x00, 0x00, 0x00, 0xff, 0x02, 0x18, 0x0e, 0xff, 0x2a, 0xaf, 0x7a, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2c, 0xb9, 0x82, 0xff, 
    0x1b, 0x7c, 0x55, 0xff, 0x2d, 0xbf, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2b, 0xb1, 0x7d, 0xff, 0x02, 0x16, 0x0d, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x22, 0x91, 0x66, 0xff, 0x2e, 0xc0, 0x86, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x20, 0x8f, 0x63, 0xff, 
    0x10, 0x58, 0x3c, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc2, 0x89, 0xff, 0x10, 0x4e, 0x35, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x04, 0x21, 0x16, 0xff, 0x02, 0x14, 0x0c, 0xff, 0x26, 0xa5, 0x73, 0xff, 0x2e, 0xbd, 0x85, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x12, 0x61, 0x42, 0xff, 
    0x0e, 0x50, 0x37, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x24, 0x95, 0x69, 0xff, 0x00, 0x01, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x23, 0x8d, 0x63, 0xff, 0x15, 0x6a, 0x49, 0xff, 0x2b, 0xb5, 0x80, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x10, 0x5a, 0x3d, 0xff, 
    0x0b, 0x46, 0x2f, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x17, 0x64, 0x45, 0xff, 0x01, 0x0d, 0x06, 0xff, 0x15, 0x5d, 0x41, 0xff, 0x2e, 0xbe, 0x86, 0xff, 0x2b, 0xb5, 0x7f, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0d, 0x4f, 0x35, 0xff, 
    0x07, 0x3a, 0x25, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2e, 0xbe, 0x85, 0xff, 0x2a, 0xac, 0x79, 0xff, 0x2e, 0xbc, 0x85, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x0a, 0x42, 0x2b, 0xff, 
    0x04, 0x29, 0x1b, 0xff, 0x2c, 0xb9, 0x81, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x05, 0x32, 0x20, 0xff, 
    0x02, 0x19, 0x0e, 0xff, 0x2a, 0xb2, 0x7d, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2c, 0xb8, 0x81, 0xff, 0x28, 0x9f, 0x71, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x23, 0x98, 0x6a, 0xff, 0x19, 0x6c, 0x4b, 0xff, 0x2c, 0xba, 0x82, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2c, 0xb7, 0x80, 0xff, 0x03, 0x21, 0x13, 0xff, 
    0x00, 0x07, 0x03, 0xff, 0x27, 0xa7, 0x75, 0xff, 0x2e, 0xbd, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x23, 0x9a, 0x6c, 0xff, 0x08, 0x32, 0x22, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x08, 0x3c, 0x28, 0xff, 0x00, 0x00, 0x00, 0xff, 0x23, 0x92, 0x67, 0xff, 0x2e, 0xc0, 0x86, 0xff, 0x2e, 0xbe, 0x86, 0xff, 0x29, 0xac, 0x78, 0xff, 0x01, 0x0e, 0x07, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x22, 0x96, 0x68, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x1a, 0x7b, 0x55, 0xff, 0x05, 0x29, 0x1b, 0xff, 0x2a, 0xac, 0x7a, 0xff, 0x02, 0x1a, 0x10, 0xff, 0x00, 0x06, 0x03, 0xff, 0x16, 0x69, 0x48, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x23, 0x9c, 0x6d, 0xff, 0x00, 0x02, 0x01, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x1b, 0x7f, 0x58, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x10, 0x55, 0x39, 0xff, 0x04, 0x28, 0x1a, 0xff, 0x25, 0x9c, 0x6d, 0xff, 0x0a, 0x42, 0x2d, 0xff, 0x18, 0x74, 0x50, 0xff, 0x0f, 0x52, 0x38, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x1d, 0x86, 0x5d, 0xff, 0x00, 0x01, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x13, 0x63, 0x44, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x09, 0x3b, 0x28, 0xff, 0x09, 0x36, 0x25, 0xff, 0x22, 0x92, 0x66, 0xff, 0x0e, 0x53, 0x38, 0xff, 0x20, 0x91, 0x64, 0xff, 0x0f, 0x51, 0x37, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x15, 0x6b, 0x48, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x0a, 0x44, 0x2d, 0xff, 0x2e, 0xbe, 0x85, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x28, 0xab, 0x77, 0xff, 0x0a, 0x3c, 0x29, 0xff, 0x0e, 0x46, 0x30, 0xff, 0x29, 0xab, 0x79, 0xff, 0x26, 0xa4, 0x73, 0xff, 0x1c, 0x85, 0x5c, 0xff, 0x0f, 0x54, 0x38, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2f, 0xc2, 0x88, 0xff, 0x0c, 0x4b, 0x33, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x03, 0x24, 0x17, 0xff, 0x2c, 0xb6, 0x80, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x21, 0x91, 0x65, 0xff, 0x10, 0x4f, 0x36, 0xff, 0x10, 0x4c, 0x34, 0xff, 0x2c, 0xb8, 0x82, 0xff, 0x30, 0xc8, 0x8c, 0xff, 0x0d, 0x52, 0x37, 0xff, 0x13, 0x62, 0x42, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x2d, 0xbc, 0x83, 0xff, 0x04, 0x2c, 0x1c, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x07, 0x03, 0xff, 0x26, 0xa7, 0x75, 0xff, 0x2f, 0xc5, 0x8a, 0xff, 0x18, 0x71, 0x4e, 0xff, 0x18, 0x6d, 0x4c, 0xff, 0x10, 0x4d, 0x35, 0xff, 0x2d, 0xbb, 0x84, 0xff, 0x29, 0xab, 0x77, 0xff, 0x01, 0x0d, 0x07, 0xff, 0x21, 0x8c, 0x62, 0xff, 0x2f, 0xc1, 0x88, 0xff, 0x29, 0xac, 0x78, 0xff, 0x01, 0x0e, 0x07, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1f, 0x8e, 0x63, 0xff, 0x30, 0xc5, 0x8b, 0xff, 0x0f, 0x52, 0x38, 0xff, 0x1b, 0x6e, 0x4f, 0xff, 0x0e, 0x3e, 0x2b, 0xff, 0x2d, 0xb5, 0x80, 0xff, 0x18, 0x69, 0x49, 0xff, 0x03, 0x1e, 0x12, 0xff, 0x2c, 0xb5, 0x7f, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x21, 0x94, 0x67, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x16, 0x6d, 0x4b, 0xff, 0x2f, 0xc5, 0x8b, 0xff, 0x0a, 0x40, 0x2b, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1e, 0x85, 0x5c, 0xff, 0x06, 0x30, 0x20, 0xff, 0x18, 0x71, 0x4f, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x2f, 0xc4, 0x89, 0xff, 0x18, 0x73, 0x4f, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0a, 0x47, 0x2f, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0b, 0x44, 0x2e, 0xff, 0x00, 0x01, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x19, 0x75, 0x51, 0xff, 0x05, 0x2d, 0x1d, 0xff, 0x26, 0xa6, 0x74, 0xff, 0x2d, 0xbb, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0d, 0x4e, 0x34, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x03, 0x20, 0x13, 0xff, 0x2b, 0xb6, 0x7f, 0xff, 0x2a, 0xac, 0x78, 0xff, 0x25, 0x95, 0x69, 0xff, 0x0d, 0x3f, 0x2c, 0xff, 0x23, 0x97, 0x6a, 0xff, 0x01, 0x0e, 0x06, 0xff, 0x02, 0x1d, 0x11, 0xff, 0x12, 0x5e, 0x40, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x04, 0x28, 0x19, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x03, 0x01, 0xff, 0x25, 0xa1, 0x70, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x2c, 0xb1, 0x7c, 0xff, 0x0e, 0x47, 0x32, 0xff, 0x23, 0x96, 0x69, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0a, 0x45, 0x2e, 0xff, 0x28, 0xaa, 0x77, 0xff, 0x00, 0x08, 0x04, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1c, 0x83, 0x5a, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2c, 0xb5, 0x80, 0xff, 0x1f, 0x87, 0x5e, 0xff, 0x28, 0xa9, 0x76, 0xff, 0x18, 0x69, 0x49, 0xff, 0x17, 0x66, 0x47, 0xff, 0x21, 0x8c, 0x62, 0xff, 0x1e, 0x89, 0x5f, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x10, 0x5b, 0x3f, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbd, 0x84, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x30, 0xc9, 0x8d, 0xff, 0x12, 0x62, 0x43, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x06, 0x33, 0x21, 0xff, 0x2d, 0xbb, 0x83, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x07, 0x3a, 0x26, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x0f, 0x08, 0xff, 0x28, 0xad, 0x79, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2a, 0xb2, 0x7d, 0xff, 0x02, 0x16, 0x0d, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x22, 0x94, 0x68, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x23, 0x9a, 0x6c, 0xff, 0x00, 0x02, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x18, 0x74, 0x50, 0xff, 0x2e, 0xc1, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x19, 0x7a, 0x54, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0d, 0x50, 0x36, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x0f, 0x56, 0x3a, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x04, 0x2b, 0x1b, 0xff, 0x2c, 0xb9, 0x82, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x05, 0x32, 0x20, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x0e, 0x06, 0xff, 0x28, 0xab, 0x77, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2a, 0xb0, 0x7b, 0xff, 0x01, 0x15, 0x0a, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x22, 0x96, 0x68, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc0, 0x87, 0xff, 0x23, 0x9b, 0x6c, 0xff, 0x00, 0x02, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1a, 0x7c, 0x55, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc3, 0x89, 0xff, 0x1c, 0x82, 0x5a, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x12, 0x5e, 0x41, 0xff, 0x2e, 0xc1, 0x88, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2f, 0xc4, 0x8a, 0xff, 0x13, 0x65, 0x45, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x09, 0x41, 0x2b, 0xff, 0x2d, 0xbe, 0x85, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x2e, 0xc2, 0x88, 0xff, 0x0b, 0x48, 0x30, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x03, 0x25, 0x17, 0xff, 0x2c, 0xb7, 0x80, 0xff, 0x2d, 0xbd, 0x85, 0xff, 0x2d, 0xbb, 0x83, 0xff, 0x04, 0x2b, 0x1c, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x0e, 0x06, 0xff, 0x28, 0xac, 0x78, 0xff, 0x2e, 0xbf, 0x86, 0xff, 0x2a, 0xb1, 0x7c, 0xff, 0x01, 0x15, 0x0a, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x24, 0x9b, 0x6c, 0xff, 0x2f, 0xc2, 0x88, 0xff, 0x26, 0xa1, 0x70, 0xff, 0x00, 0x04, 0x02, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x1e, 0x88, 0x5f, 0xff, 0x2f, 0xc6, 0x8b, 0xff, 0x20, 0x8e, 0x63, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x18, 0x73, 0x4f, 0xff, 0x30, 0xc8, 0x8c, 0xff, 0x19, 0x79, 0x53, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x10, 0x5b, 0x3f, 0xff, 0x30, 0xc9, 0x8d, 0xff, 0x12, 0x62, 0x43, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0a, 0x45, 0x2e, 0xff, 0x2f, 0xc5, 0x8a, 0xff, 0x0c, 0x4c, 0x33, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x05, 0x30, 0x1f, 0xff, 0x2d, 0xbc, 0x84, 0xff, 0x06, 0x37, 0x24, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x02, 0x1e, 0x12, 0xff, 0x2a, 0xaf, 0x7a, 0xff, 0x03, 0x25, 0x16, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x01, 0x0e, 0x07, 0xff, 0x24, 0x9d, 0x6d, 0xff, 0x01, 0x14, 0x0b, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x04, 0x02, 0xff, 0x1d, 0x85, 0x5c, 0xff, 0x00, 0x08, 0x04, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x15, 0x69, 0x48, 0xff, 0x00, 0x02, 0x01, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x0b, 0x48, 0x30, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x03, 0x21, 0x14, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 
    0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x01, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff,   
  ]