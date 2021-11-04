function generateHammingCode11(code) {

    const secondParityBitList = [0, 1, 3, 4, 6, 8, 10]
    const thirdParityBitList = [0, 2, 3, 5, 6, 9, 10]
    const fourthParityBitList = [1, 2, 3, 7, 8, 9, 10]
    const fifthParityBitList = [4, 5, 6, 7, 8, 9, 10]

    if (code.length != 11) {
        return false
    }

    let secondParityBit = 0
    for (let i of secondParityBitList) if (parseInt(code[i])) {
        secondParityBit++
    }
    secondParityBit %= 2

    let thirdParityBit = 0
    for (let i of thirdParityBitList) if (parseInt(code[i])) {
        thirdParityBit++
    }
    thirdParityBit %= 2

    let fourthParityBit = 0
    for (let i of fourthParityBitList) if (parseInt(code[i])) {
        fourthParityBit++
    }
    fourthParityBit %= 2

    let fifthParityBit = 0
    for (let i of fifthParityBitList) if (parseInt(code[i])) {
        fifthParityBit++
    }
    fifthParityBit %= 2


    code = String(secondParityBit) + String(thirdParityBit) + code[0] + String(fourthParityBit) + code.slice(1, 4) +String(fifthParityBit) + code.slice(4, 11)

    let firstParityBit = 0
    for (let i = 0; i < code.length; i++) if (parseInt(code[i])) {
        firstParityBit++
    }
    firstParityBit %= 2

    let hammingCode = String(firstParityBit) + code

    return hammingCode
}


function checkHammingCode(hammingCode) {
    let result = 0
    for (let i = 0; i < hammingCode.length; i++)  if (parseInt(hammingCode[i])){
        result ^= i
    }
    return result
}


function getRandomCode(length) {
    let bits = "10"
    let result = ""
    for ( let i = 0; i < length; i++ ) {
        result += bits.charAt(Math.floor(Math.random() * bits.length))
    }
    return result
}