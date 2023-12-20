const fs = require('fs');


fs.readFile('input.txt', 'utf-8', function (err, data) {
    let [instructions, maze] = data.split(/\n\s*\n/)

    const mazeObj = maze.split(/\r?\n/).reduce((acc, value) => {
        const [init, leftRight] = value.split(" = ")
        const [left, right] = leftRight.replace('(', '').replace(')', '').split(", ")

        acc[init] = { L: left, R: right }
        return acc
    }, {})

    let reachedZZZ = false
    let instructionsCount = 0

    const instructionsList = instructions.trim().split('')

    let currentStep = mazeObj["AAA"]

    let i = 0
    while (!reachedZZZ) {
        const currentInstruction = instructionsList[i];
        i = (i + 1) % instructionsList.length;

        const nextStep = currentStep[currentInstruction]
        currentStep = mazeObj[nextStep]

        if (nextStep === "ZZZ") {
            instructionsCount++
            break
        }

        instructionsCount++
    }

    console.log(instructionsCount);
})
