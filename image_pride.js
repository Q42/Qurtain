const Jimp = require('jimp')
const utils = require('./utils')

const WIDTH = 5
const HEIGHT = 150
const WIGGLE_LENGTH = 10*Math.PI
const SCALE = 3

var intervalId = null;

async function start(screen) {

    const IMG_W = 15
    const IMG_H = 72

    const logo = await loadImage('./imgs/pride_black_bg.png', IMG_W*SCALE, IMG_H*SCALE)
    var offset = 0
    intervalId = setInterval(async () => {
        const canvas = await newImage(WIDTH*SCALE, HEIGHT*SCALE)
        const frame = logo.clone()
        const rotated = await frame.rotate(Math.cos(offset/WIGGLE_LENGTH) * 3)
        const wiggle = Math.round((Math.sin(offset/WIGGLE_LENGTH) * 4 - (IMG_W/2 - WIDTH/2)) * SCALE)
        canvas.blit(rotated, wiggle, ((offset++ % (HEIGHT+IMG_H)) -IMG_H)* SCALE )
        const pixels = canvasToPixels(canvas)
        screen.render(pixels)
    }, 1000 / 15)
}

async function loadImage(path, width, height) {
    const img = await Jimp.read(path)
    const resized = img.resize(width, height)

    return resized
}

function canvasToPixels(canvas) {
    const w = WIDTH
    const h = HEIGHT
    const matrix = utils.createMatrix(w, h)
    canvas.resize(w, h).scan(0, 0, w, h, (x, y, idx) => {
        const r = canvas.bitmap.data[idx + 0]
        const g = canvas.bitmap.data[idx + 1]
        const b = canvas.bitmap.data[idx + 2]
        const a = canvas.bitmap.data[idx + 3]

        matrix[y][x] = r<<16|g<<8|b
    })

    const pixels = utils.matrixToPixels(matrix)
    return pixels
}

async function newImage(width, height) {
    return await new Jimp(width, height)
}

function stop()
{
  clearInterval(intervalId);
}

module.exports.stop = stop;
module.exports.start = start;
