const Jimp = require('jimp')
const utils = require('./utils')

const WIDTH = 5
const HEIGHT = 150
const WIGGLE_LENGTH = 10*Math.PI

async function start(screen) {

    const IMG_W = 15
    const IMG_H = 72

    const img = await loadImage('./imgs/q42-logo-groot-on-black.png', IMG_W, IMG_H)
    var offset = 0
    setInterval(() => {
        const matrix = utils.createMatrix(WIDTH, HEIGHT);
        const wiggle = Math.round(Math.sin(offset/WIGGLE_LENGTH) * 7 - (IMG_W/2 - WIDTH/2))
        utils.drawImage(matrix, img, wiggle, (offset++ % (HEIGHT+IMG_H)) -IMG_H)
        const pixels = utils.matrixToPixels(matrix)
        screen.render(pixels);
    }, 1000 / 60)
}

async function loadImage(path, width, height) {
    const img = await Jimp.read(path)
    const arr = utils.createMatrix(width, height)
    const small = img.resize(width, height)
    small.scan(0, 0, width, height, (x, y, idx) => {
        const r = img.bitmap.data[idx + 0]
        const g = img.bitmap.data[idx + 1]
        const b = img.bitmap.data[idx + 2]
        const a = img.bitmap.data[idx + 3]

        arr[y][x] = r<<16|g<<8|b
    })

    return arr
}

module.exports.start = start;
