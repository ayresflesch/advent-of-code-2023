const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    const onlyNumbersAndSpaces = data.split('\n').map(line => line.replace(/[^0-9]/g, ' '))
    const numberAndIndexes = []

    onlyNumbersAndSpaces.forEach((line, x) => {
        let numberBuffer = ''
        let numberIndexes = []

        line.split('').forEach((el, y) => {
            if (!isNaN(parseInt(el))) {

                numberBuffer += el
                numberIndexes.push({ x, y })

                if (line[y + 1] === ' ') {
                    numberAndIndexes.push({ number: numberBuffer, indexes: numberIndexes })

                    numberBuffer = ''
                    numberIndexes = []
                }
            }
        })
    })

    const matrix = data.split('\n').map(line => line.split(''));
    const sum = numberAndIndexes.reduce((acc, key) => {
        const isValidNumber = key.indexes.some(({ x, y }) => {
            const topLeft = matrix[x - 1] ? matrix[x - 1][y - 1] : null;
            const top = matrix[x - 1] ? matrix[x - 1][y] : null;
            const topRight = matrix[x - 1] ? matrix[x - 1][y + 1] : null;

            const left = matrix[x][y - 1];
            const right = matrix[x][y + 1];

            const bottomLeft = matrix[x + 1] ? matrix[x + 1][y - 1] : null;
            const bottom = matrix[x + 1] ? matrix[x + 1][y] : null;
            const bottomRight = matrix[x + 1] ? matrix[x + 1][y + 1] : null;

            return [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight].some(surrounding =>
                isNaN(surrounding) && surrounding !== null && surrounding !== undefined && surrounding !== "."
            )
        })

        return isValidNumber ? acc + parseInt(key.number, 10) : acc
    }, 0);

    console.log(sum)
})

