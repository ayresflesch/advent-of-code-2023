const fs = require('fs');
const readline = require('readline');

const filePath = 'input.txt';

const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
});


const numbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

let sum = 0

rl.on('line', (line) => {
    const pattern = /(one|two|three|four|five|six|seven|eight|nine)/g;

    let match;
    let matches = []

    while ((match = pattern.exec(line)) !== null) {
        pattern.lastIndex -= match[0].length - 1;

        matches.push({
            index: match.index,
            length: match[0].length,
            number: match[0],
            replacement: numbers[match[0]]
        });
    }

    for (let i = matches.length - 1; i >= 0; i--) {
        const { index, length, replacement, number } = matches[i];

        line = line.substring(0, index) + number + replacement + number + line.substring(index + length);
    }

    const digitsOnly = line.replace(/\D/g, '');
    const digitsArray = digitsOnly.split('')

    if (digitsArray.length === 1) {
        sum += parseInt(`${digitsArray[0]}${digitsArray[0]}`)
    } else {
        sum += parseInt(`${digitsArray[0]}${digitsArray[digitsArray.length - 1]}`)
    }
});

rl.on('close', () => {
    console.log('Sum: ' + sum);
});