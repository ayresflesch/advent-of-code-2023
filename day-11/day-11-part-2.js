const fs = require('fs');


fs.readFile('input.txt', 'utf-8', function (err, data) {
    const matrix = data.split(/\r?\n/).map(line => line.split(''));

    // find row and columns with not galaxies
    const columnsSize = matrix.length
    const columnsQuantity = matrix[0].length

    let columnsWithNoGalaxies = []
    for (let i = 0; i < columnsQuantity; i++) {

        let columnHasNoGalaxy = true
        for (let j = 0; j < columnsSize; j++) {
            const element = matrix[j][i]

            if (element !== '.') {
                columnHasNoGalaxy = false;
                break;
            }
        }

        if (columnHasNoGalaxy) {
            columnsWithNoGalaxies.push(i)
        }
    }

    const rowsWithNoGalaxies = matrix.reduce((acc, value, index) => acc.concat(value.every(r => r === '.') ? index : []), [])


    console.log(columnsWithNoGalaxies);
    console.log(rowsWithNoGalaxies);


    // enumerate galaxies
    let galaxyCount = 1
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {

            if (matrix[i][j] === '#') {
                matrix[i][j] = galaxyCount
                galaxyCount++
            }
        }
    }

    // get galaxies coordinates
    let numCoords = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const element = matrix[i][j];

            if (element === '.') {
                continue
            }

            numCoords.push([i, j])
        }
    }

    // calculate distance between galaxies
    const distanceBetweenGalaxies = {}
    for (let i = 0; i < numCoords.length; i++) {
        for (let j = i + 1; j < numCoords.length; j++) {


            const rowsToExpand = rowsWithNoGalaxies.reduce((acc, value) => {
                const min = Math.min(numCoords[i][0], numCoords[j][0])
                const max = Math.max(numCoords[i][0], numCoords[j][0])

                return value > min && value < max ? ++acc : acc
            }, 0)

            const columnsToExpand = columnsWithNoGalaxies.reduce((acc, value) => {
                const min = Math.min(numCoords[i][1], numCoords[j][1])
                const max = Math.max(numCoords[i][1], numCoords[j][1])

                return value > min && value < max ? ++acc : acc
            }, 0)


            distanceBetweenGalaxies[`${numCoords[i]} - ${numCoords[j]}`] =
                (Math.abs(numCoords[i][0] - numCoords[j][0]) + (rowsToExpand * 999999)) +
                (Math.abs(numCoords[i][1] - numCoords[j][1]) + (columnsToExpand * 999999))
        }
    }

    console.log(Object.values(distanceBetweenGalaxies).reduce((acc, value) => BigInt(acc) + BigInt(value)));
})
