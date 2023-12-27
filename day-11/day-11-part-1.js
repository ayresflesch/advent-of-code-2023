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

    // expand Galaxy
    for (let i = 0; i < rowsWithNoGalaxies.length; i++) {
        const row = rowsWithNoGalaxies[i] + i

        matrix.splice(row, 0, [...matrix[row]])

    }

    for (let j = 0; j < columnsWithNoGalaxies.length; j++) {
        const index = columnsWithNoGalaxies[j] + j

        for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(index, 0, '.')
        }
    }

    
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
            distanceBetweenGalaxies[`${numCoords[i]} - ${numCoords[j]}`] = Math.abs(numCoords[i][0] - numCoords[j][0]) + Math.abs(numCoords[i][1] - numCoords[j][1])
        }
    }

    console.log(Object.values(distanceBetweenGalaxies).reduce((acc, value) => acc + value));

})
