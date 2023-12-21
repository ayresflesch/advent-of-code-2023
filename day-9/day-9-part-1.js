const fs = require('fs');


fs.readFile('input.txt', 'utf-8', function (err, data) {
    const history = data.split(/\r?\n/)

    const sum = history.reduce((acc, h) => {
        const numbers = h.split(' ').map(n => parseInt(n, 10))

        let lines = [numbers]
        let currentLine = numbers

        while (true) {
            const line = []
            for (let i = 0; i < currentLine.length - 1; i++) {
                line.push(currentLine[i + 1] - currentLine[i])
            }

            currentLine = line
            lines.push(line)

            if (line.every(l => l === 0) || line.length === 1) {
                break
            }
        }

        for (let i = lines.length - 2; i >= 0; i--) {
            lines[i].push(lines[i + 1][lines[i + 1].length - 1] + lines[i][lines[i].length - 1])
        }

        return acc + lines[0][lines[0].length - 1];

    }, 0);

    console.log(sum);
})
