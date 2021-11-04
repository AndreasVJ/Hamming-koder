function getDrawingConstants(size) {

    const gridSize = 4
    const lineSize = size*0.02 / gridSize
    const gridElementSize = (size - (gridSize+1)*lineSize) / gridSize

    const fontSize =  size/gridSize*0.6
    const xIndent = gridElementSize/ 2 - fontSize / 4
    const yIndent = -gridElementSize/ 2 + fontSize / 2.5

    return {
        gridSize: gridSize,
        lineSize: lineSize,
        gridElementSize: gridElementSize,

        fontSize: fontSize,
        xIndent: xIndent,
        yIndent: yIndent
    }
}


function drawHammingCode(hammingCode, ctx, x, y, size) {

    const c = getDrawingConstants(size)

    ctx.font = String(c.fontSize) + "px arial"

    // Fill background
    ctx.fillStyle = "rgb(20, 20, 20)"
    ctx.fillRect(x, y, size, size)

    // Draw lines
    ctx.fillStyle = 'white'
    for (let i = 0; i < c.gridSize+1; i++) {
        ctx.fillRect(x + i * (c.gridElementSize + c.lineSize), y, c.lineSize, size)
        ctx.fillRect(x, y + i * (c.gridElementSize + c.lineSize), size, c.lineSize)
    }
    
    ctx.fillStyle = "white"
    for (let i = 0; i < hammingCode.length; i++) {
        ctx.fillText(hammingCode[i], x + (i)%c.gridSize * (c.gridElementSize + c.lineSize) + c.xIndent, y + Math.floor((i)/c.gridSize + 1) * (c.gridElementSize + c.lineSize) + c.yIndent)
    }
}


function highlightTiles(tiles, color, ctx, x, y, size) {

    const c = getDrawingConstants(size)

    ctx.fillStyle = color

    for (let i of tiles) {
        ctx.fillRect(x + (i)%c.gridSize * (c.gridElementSize + c.lineSize) + c.lineSize, y + Math.floor((i)/c.gridSize) * (c.gridElementSize + c.lineSize) + c.lineSize, c.gridElementSize, c.gridElementSize)
    }
}


function markBits(code, bits, color, ctx, x, y, size) {
    const c = getDrawingConstants(size)

    // Draw lines
    ctx.fillStyle = 'white'
    for (let i = 0; i < c.gridSize+1; i++) {
        ctx.fillRect(x + i * (c.gridElementSize + c.lineSize), y, c.lineSize, size)
        ctx.fillRect(x, y + i * (c.gridElementSize + c.lineSize), size, c.lineSize)
    }

    for (let i of bits) {
        ctx.fillStyle = "rgb(20, 20, 20)"
        ctx.fillRect(x + (i)%c.gridSize * (c.gridElementSize + c.lineSize) + c.lineSize, y + Math.floor((i)/c.gridSize) * (c.gridElementSize + c.lineSize) + c.lineSize, c.gridElementSize, c.gridElementSize)

        ctx.fillStyle = color
        ctx.fillText(code[i], x + (i)%c.gridSize * (c.gridElementSize + c.lineSize) + c.xIndent, y + Math.floor((i)/c.gridSize + 1) * (c.gridElementSize + c.lineSize) + c.yIndent)
    }
}
