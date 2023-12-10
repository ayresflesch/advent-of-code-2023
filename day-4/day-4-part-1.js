const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    const cards = data.split('\n').map(n => n);

    const sum = cards.reduce((acc, row) => {
        const [, winningAndOwnedNumbers] = row.replaceAll('  ', ' 0').split(': ')
        const [winningNumbersStr, ownedNumbersStr] = winningAndOwnedNumbers.split(" | ")

        const ownedNumbers = ownedNumbersStr.split(' ')

        let count = 0;
        ownedNumbers.forEach(n => {
            if (winningNumbersStr.includes(n)) {
                count++
            }
        })



        const value = count > 0 ? Math.pow(2, count - 1) : 0

        return acc + value
    }, 0);

    console.log(sum);
})