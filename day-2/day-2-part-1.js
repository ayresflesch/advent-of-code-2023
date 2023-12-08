const fs = require('fs');
const readline = require('readline');

const filePath = 'input.txt';

const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
});


const RED_CUBES = 12
const GREEN_CUBES = 13
const BLUE_CUBES = 14

let sum = 0;

rl.on('line', (line) => {

    const [game, allSets] = line.split(":")
    const gameNumber = game.replace(/\D/g, '');

    const sets = allSets.split(";")

    let isValidGame = true;
    sets.forEach(set => {
        let red = 0;
        let green = 0;
        let blue = 0;

        set.split(",").forEach(cubeRevealed => {
            if (cubeRevealed.includes('red')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                red += parseInt(quantityRevealed, 10)
            }
            
            if (cubeRevealed.includes('green')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                green += parseInt(quantityRevealed, 10)
            }
            
            if (cubeRevealed.includes('blue')) {
                const quantityRevealed = cubeRevealed.replace(/\D/g, '');
                blue += parseInt(quantityRevealed, 10)
            }
        });

        isValidGame &&= red <= RED_CUBES && green <= GREEN_CUBES && blue <= BLUE_CUBES
            
        
    });

    if (isValidGame) {
        console.log(gameNumber);
        sum += parseInt(gameNumber, 10)
    }

    
    

});

// Event listener for the end of the file
rl.on('close', () => {
    console.log('Sum: ' + sum);
});