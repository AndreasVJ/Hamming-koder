const gridCanvas = document.getElementById("grid")
const gtx = gridCanvas.getContext("2d")
const parityCanvas = document.getElementById("matematikkParity-canvas")
const ptx = parityCanvas.getContext("2d")

parityCanvas.height = parityCanvas.width
gridCanvas.height = gridCanvas.width

historieIsPlaying = false
parityIsPlaying = false
feilIsPlaying = false

const parityBitSections = [[1, 3, 5, 7, 9, 11, 13, 15], [2, 3, 6, 7, 10, 11, 14, 15], [4, 5, 6, 7, 12, 13, 14, 15], [8, 9, 10, 11, 12, 13, 14, 15]]


///Hammingkoder - generering/definert
let code = [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1]

drawHammingCode(code, gtx, 0, 0, gridCanvas.height)
highlightTiles([0, 1, 2, 4, 8], "rgba(255, 255, 130, 0.4)", gtx, 0, 0, gridCanvas.height)

drawHammingCode(code, ptx, 0, 0, parityCanvas.height)
highlightTiles(parityBitSections[0].slice(0, 1), "rgba(255, 255, 130, 0.4)", ptx, 0, 0, parityCanvas.height)
highlightTiles(parityBitSections[0].slice(1, 8), "rgba(0, 155, 200, 0.4)", ptx, 0, 0, parityCanvas.height)


/// Funksjon for å skjekke om et element er i vinduet
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function loop(i=0) {
    drawHammingCode(code, ptx, 0, 0, parityCanvas.height)
    highlightTiles(parityBitSections[i].slice(0, 1), "rgba(255, 255, 130, 0.4)", ptx, 0, 0, parityCanvas.height)
    highlightTiles(parityBitSections[i].slice(1, 8), "rgba(0, 155, 200, 0.4)", ptx, 0, 0, parityCanvas.height)
    i++
    if (i >= 4) {
        i = 0
    }
    setTimeout(function() {loop(i)}, 2000)
}

loop()
