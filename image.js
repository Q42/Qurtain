const Jimp = require('jimp')
const utils = require('./utils')

const WIDTH = 5
const HEIGHT = 150
const WIGGLE_LENGTH = 10*Math.PI

function start(screen) {

    const IMG_W = 15
    const IMG_H = 72
    Jimp.read('./imgs/q42-logo-groot-on-black.png')
        .then(img => {
            const arr = utils.createMatrix(IMG_W, IMG_H)
            img
                .resize(IMG_W, IMG_H)
                .scan(0, 0, IMG_W, IMG_H, (x, y, idx) => {
                    const r = img.bitmap.data[idx + 0]
                    const g = img.bitmap.data[idx + 1]
                    const b = img.bitmap.data[idx + 2]
                    const a = img.bitmap.data[idx + 3]

                    arr[y][x] = r<<16|g<<8|b
                    if (x == img.bitmap.width - 1 && y == img.bitmap.height - 1) {
                        var offset = 0
                        setInterval(function() {
                            const matrix = utils.createMatrix(WIDTH, HEIGHT);
                            const wiggle = Math.round(Math.sin(offset/WIGGLE_LENGTH) * 7 - (IMG_W/2 - WIDTH/2))
                            utils.drawImage(matrix, arr, wiggle, (offset++ % (HEIGHT+IMG_H)) -IMG_H)
                            const pixels = utils.matrixToPixels(matrix)
                            screen.render(pixels);
                        }, 1000 / 30)
                    }
                })
            })
        .catch(err => {
            console.error(err);
        });
}

module.exports.start = start;
