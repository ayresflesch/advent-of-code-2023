const fs = require('fs');
const readline = require('readline');

const filePath = 'input.txt';

const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
});


let sum = 0

rl.on('line', (line) => {

    const digitsOnly = line.replace(/\D/g, '');
    const digitsArray = digitsOnly.split('')

    if (digitsArray.length === 1) {
        sum += parseInt(digitsArray[0] + digitsArray[0], 10)
    } else {
        sum += parseInt(digitsArray[0] + digitsArray[digitsArray.length - 1], 10)
    }
});

// Event listener for the end of the file
rl.on('close', () => {
    console.log('Sum: ' + sum);
});