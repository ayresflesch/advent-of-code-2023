const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {
    let [seeds, ...maps] = data.split(/\n\s*\n/)
    seeds = seeds.split(': ')[1].split(' ').map(n => parseInt(n, 10))

    const seedAndLastLocation = {}
    seeds.forEach(seed => {

        let currentValue = seed

        maps.forEach(map => {
            let [_, ...mappings] = map.split("\n")

            mappings = mappings.map(m => m.replace(/\r/, ''))

            for (let i = 0; i < mappings.length; i++) {
                const mapping = mappings[i];
            
                const [destination, source, rangeLength] = mapping.split(' ').map(n => parseInt(n, 10))
                
                if (currentValue >= source && currentValue < source + rangeLength) {
                    const difference = currentValue - source
                    
                    currentValue = destination + Math.abs(difference)
                    break
                }
            }
        });
        
        seedAndLastLocation[seed] = currentValue
    });

    console.log(Math.min.apply(Math, Object.values(seedAndLastLocation)));
})