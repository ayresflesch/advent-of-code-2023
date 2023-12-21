const fs = require('fs');


fs.readFile('input.txt', 'utf-8', function (err, data) {
    const matrix = data.split(/\r?\n/).map(line => line.split(''));

    const sCoords = matrix
        .flatMap((row, i) => row.map((cell, j) => ({ cell, coords: [i, j] })))
        .find(({ cell }) => cell === 'S')?.coords;

    const combinations = {
        "|": { up: ["|", "7", "F"], down: ["|", "J", "L",] },
        "-": { left: ["L", "F", "-"], right: ["7", "J", "-"] },
        "7": { left: ["-", "L", "F"], down: ["|", "J", "L"] },
        "J": { left: ["-", "L", "F"], up: ["|", "7", "F"] },
        "L": { right: ["-", "J", "7"], up: ["|", "7", "F"] },
        "F": { right: ["-", "J", "7"], down: ["|", "J", "L"] }
    }

    const [x, y] = sCoords
    const surroundings = [{ x: x - 1, y, comingFrom: 'down' }, { x, y: y - 1, comingFrom: 'right' }, { x, y: y + 1, comingFrom: 'left' }, { x: x + 1, y, comingFrom: 'up' }]

    let validNextStep = [];
    for (let i = 0; i < surroundings.length; i++) {
        const { x: xEl, y: yEl, comingFrom: iComingFrom } = surroundings[i]
        const element = matrix[xEl] ? matrix[xEl][yEl] : null

        for (let j = 0; j < surroundings.length; j++) {
            if (j === i) {
                continue
            }

            const { x: xC, y: yC, comingFrom: jComingFrom } = surroundings[j]
            const toCompare = matrix[xC] ? matrix[xC][yC] : null

            const possible1 = combinations[element][iComingFrom]
            const possible2 = combinations[toCompare][jComingFrom]

            if (possible1 && possible2) {
                validNextStep = [{ x: xEl, y: yEl, comingFrom: iComingFrom }, { x: xC, y: yC, comingFrom: jComingFrom }]
                break
            }
        }
    }

    let currentPosition = validNextStep[0]
    let loopCount = 0

    while (true) {
        const { x, y, comingFrom } = currentPosition

        loopCount++
        if (matrix[currentPosition.x][currentPosition.y] === "S") {
            break
        }
        
        const possibleNextValuesForAllDirections = combinations[matrix[x][y]]
        const nextDirection = Object.keys(possibleNextValuesForAllDirections).find(k => k !== comingFrom)

        if (nextDirection === 'down') {
            currentPosition = { x: x + 1, y, comingFrom: 'up' }
        }

        if (nextDirection === 'up') {
            currentPosition = { x: x - 1, y, comingFrom: 'down' }
        }
        if (nextDirection === 'left') {
            currentPosition = { x, y: y - 1, comingFrom: 'right' }
        }
        
        if (nextDirection === 'right') {
            currentPosition = { x, y: y + 1, comingFrom: 'left' }
        }

    }

    console.log(Math.ceil(loopCount/2));

})
