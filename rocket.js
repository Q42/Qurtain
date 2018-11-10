const Jimp = require('jimp')
const utils = require('./utils')

const WIDTH = 5
const HEIGHT = 150
const SCALE = 3
const IMG_W = 5
const IMG_H = 33

var intervalId = null;

async function start(screen) {
    const rocket = await loadImage('./imgs/rocket.png', IMG_W*SCALE, IMG_H*SCALE)
    var i = 0
    intervalId = setInterval(async () => {
        const canvas = await newImage(WIDTH*SCALE, HEIGHT*SCALE)
        const frame = rocket.clone()
        canvas.blit(frame, 0, posFromFrame(i+=10))
        const pixels = canvasToPixels(canvas)
        screen.render(pixels)
    }, 1000 / 15)
}

const posFromFrame = i => {
    const total = HEIGHT*SCALE
    const pos = (total - i % total) - IMG_H*SCALE
    return Math.round(pos)
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
