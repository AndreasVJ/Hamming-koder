const quizCanvas = document.getElementById("quizCanvas")
const quizCtx = quizCanvas.getContext("2d")

const question = document.getElementById("question")
const startQuizBtn = document.getElementById("startQuiz")
const yesBtn = document.getElementById("yes")
const noBtn = document.getElementById("no")
const answer = document.getElementById("answer")


const questionText = "Er summen av enerne i de blå feltene ovenfor et partall?"

let quizCode, quizHammingCode, possibleTiles, correctTiles, questionCount


function randomizeQuiz() {

    const wrongPosition = Math.floor(Math.random() * 15)+1

    quizCode = getRandomCode(11)
    hammingCode1 = generateHammingCode11(quizCode)

    quizHammingCode = hammingCode1.slice(0, wrongPosition) + String((parseInt(hammingCode1[wrongPosition])+1)%2) + hammingCode1.slice(wrongPosition+1, 16)
}

randomizeQuiz()

quizCanvas.height = window.innerHeight * 0.35
quizCanvas.width = quizCanvas.height

drawHammingCode(quizHammingCode, quizCtx, 0, 0, quizCanvas.height)


function startQuiz() {
    questionCount = 0
    possibleTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    correctTiles = []

    startQuizBtn.style.display = "none"

    yesBtn.style.display = "inline"
    noBtn.style.display = "inline"

    question.style.display = "inline"
    question.style.textAlign = "center"
    question.style.fontStyle = "italic"
    question.className = "ptext centered"
    question.innerHTML = questionText

    drawHammingCode(quizHammingCode, quizCtx, 0, 0, quizCanvas.height)

    highlightTiles(parityBitSections[0], "rgba(0, 155, 200, 0.4)", quizCtx, 0, 0, quizCanvas.height)
}


function nextQuestion(answer) {

    const fullGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    let section
    switch (questionCount) {
        case 0:
            section = [1, 3, 5, 7, 9, 11, 13, 15]
            break
        case 1:
            section = [2, 3, 6, 7, 10, 11, 14, 15]
            break
        case 2:
            section = [4, 5, 6, 7, 12, 13, 14, 15]
            break
        case 3:
            section = [8, 9, 10, 11, 12, 13, 14, 15]
            break
    }

    if (section.includes(checkHammingCode(quizHammingCode)) != answer) {
        question.innerHTML = questionText

        let correctSection = []
        for (i of fullGrid) if (section.includes(i) == answer){
            if (possibleTiles.includes(i)) {
                correctSection.push(i)
                possibleTiles = possibleTiles.filter(item => item !== i)
            }
        }
        for (i of correctSection) if (correctTiles.includes(i) == false){
            correctTiles.push(i)
        }
    }
    else {
        questionCount--
        let onesInSection = 0
        for (let i of section) if (parseInt(quizHammingCode[i])) {
            onesInSection++
        }
        question.innerHTML = `Prøv på nytt. Det er ${onesInSection} enere i de markerte feltene. Er dette et partall?`
    }

    if (questionCount == 3) {
        startQuizBtn.style.display = "inline"
        startQuizBtn.innerHTML = "Prøv på nytt"

        yesBtn.style.display = "none"
        noBtn.style.display = "none"
        question.style.display = "none"

        drawHammingCode(quizHammingCode, quizCtx, 0, 0, quizCanvas.height)
        markBits(quizHammingCode, correctTiles, "green", quizCtx, 0, 0, quizCanvas.height)
        markBits(quizHammingCode, possibleTiles, "red", quizCtx, 0, 0, quizCanvas.height)
        randomizeQuiz()
    }
    else {
        questionCount++
        drawHammingCode(quizHammingCode, quizCtx, 0, 0, quizCanvas.height)
        
        markBits(quizHammingCode, correctTiles, "green", quizCtx, 0, 0, quizCanvas.height)
        highlightTiles(parityBitSections[questionCount], "rgba(0, 155, 200, 0.4)", quizCtx, 0, 0, quizCanvas.height)
    }
}

