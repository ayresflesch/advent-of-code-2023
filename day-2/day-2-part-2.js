const fs = require('fs');
const readline = require('readline');

const filePath = 'input.txt';

const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
});

let sum = 0;

rl.on('line', (line) => {

    const [_, allSets] = line.split(":")

    const sets = allSets.split(";")

    let maxRedInGame = 0;
    let maxGreenInGame = 0;
    let maxBlueInGame = 0;

    sets.forEach(set => {
        set.split(",").forEach(cubeRevealed => {
            if (cubeRevealed.includes('red')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                maxRedInGame = Math.max(parseInt(quantityRevealed, 10), maxRedInGame)
            }

            if (cubeRevealed.includes('green')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                maxGreenInGame = Math.max(parseInt(quantityRevealed, 10), maxGreenInGame)
            }

            if (cubeRevealed.includes('blue')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                maxBlueInGame = Math.max(parseInt(quantityRevealed, 10), maxBlueInGame)
            }
        });
    });

    sum += maxBlueInGame * maxGreenInGame * maxRedInGame
});

// Event listener for the end of the file
rl.on('close', () => {
    console.log('Sum: ' + sum);
});