const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    const gears = {}
    const findGear = (str, x, y, number) => {
        y = y === -1 ? 0 : y;
        for (let k = 0; k < str.length; k++) {
            const element = str[k];

            if (element === '*') {
                gears[`${x}-${y + k}`] = gears[`${x}-${y + k}`] ? [...gears[`${x}-${y + k}`], number] : [number]
            }
        }
    }

    const matrix = data.split('\n').map(n => n);

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const n = "" + row[j];
            if (isNaN(row[j])) continue


            let num = n
            while (++j < row.length) {
                if (Number.isInteger(parseInt(row[j], 10))) {
                    num += row[j]
                } else {
                    break
                }
            }

            const top = i === 0 ? '' : matrix[i - 1].substring(j - num.length - 1, j + 1)
            const left = matrix[i][j - num.length - 1] || ''
            const right = matrix[i][j] || ''
            const bottom = i === matrix.length - 1 ? '' : matrix[i + 1].substring(j - num.length - 1, j + 1)

            findGear(top, i - 1, j - num.length - 1, num)
            findGear(left, i, j - num.length - 1, num)
            findGear(right, i, j, num)
            findGear(bottom, i + 1, j - num.length - 1, num)
        }
    }

    const sum = Object.values(gears)
        .filter(numbers => numbers.length === 2)
        .map((x) => x[0] * x[1])
        .reduce((a, x) => a + x, 0);

    console.log(sum);
})