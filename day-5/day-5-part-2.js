const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {
    let [seeds, ...maps] = data.split(/\n\s*\n/)
    seeds = seeds.split(': ')[1].split(' ').map(n => parseInt(n, 10))

    const seedRanges = seeds.reduce((result, current, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2))
        }
        return result;
    }, []).map(s => [s[0], s[0] + s[1] - 1])

    const seedRangeAndEndings = {}
    seedRanges.forEach(seedRange => {
        let nextValues = [seedRange]

        maps.forEach(map => {
            let [_, ...mappings] = map.split("\n")

            mappings = mappings.map(m => m.replace(/\r/, ''))

            let separatedRanges = nextValues
            mappings.forEach(mapping => {
                const [_, source, rangeLength] = mapping.split(' ').map(n => parseInt(n, 10))

                let a = []
                while (separatedRanges.length) {
                    const range = separatedRanges.pop()
                    const ranges = separateRanges(range, [source, source + rangeLength - 1])

                    if (ranges.length === 0) {
                        a.push(range)
                    } else if (ranges.length === 1) {
                        a.push(range)
                    } else {
                        ranges.forEach(r => a.push(r))
                    }
                }
                separatedRanges = a

            })

            let sourceRangesToMapToNextStep = []
            mappings.forEach(mapping => {
                const [destination, source, rangeLength] = mapping.split(' ').map(n => parseInt(n, 10))

                const sourceRange = [source, source + rangeLength - 1]
                const destinationRange = [destination, destination + rangeLength - 1]

                const rangeToRemove = []

                separatedRanges.forEach((range, index) => {
                    if (range[0] >= sourceRange[0] && range[1] <= sourceRange[1]) {
                        const offsetLeft = range[0] - sourceRange[0]
                        const offsetRight = range[1] - sourceRange[0]

                        rangeToRemove.push(range)
                        sourceRangesToMapToNextStep.push([destinationRange[0] + Math.abs(offsetLeft), destinationRange[0] + Math.abs(offsetRight)])
                    }
                })

                separatedRanges = separatedRanges.filter(item => !rangeToRemove.some(el => el[0] === item[0] && el[1] === item[1]));
            })

            separatedRanges.forEach(r => sourceRangesToMapToNextStep.push(r))
            nextValues = sourceRangesToMapToNextStep
        });

        seedRangeAndEndings[seedRange] = nextValues
    });


    const a = Object.values(seedRangeAndEndings).map(s => {
        return Math.min.apply(Math, s.map(b => b[0]))
    })

    console.log(Math.min.apply(Math, a));

    function separateRanges(range1, range2) {
        const isInsideRange = range1[0] >= range2[0] && range1[0] <= range2[1] && range1[1] >= range2[0] && range1[1] <= range2[1]
        if (isInsideRange) {
            return [range1]
        }

        const isLeftOut = range1[0] < range2[0] && range1[0] < range2[1] && range1[1] >= range2[0] && range1[1] <= range2[1]
        if (isLeftOut) {
            return [[range1[0], range2[0] - 1], [range2[0], range1[1]]];
        }

        const isRightOut = range1[0] >= range2[0] && range1[0] <= range2[1] && range1[1] > range2[0] && range1[1] > range2[1]
        if (isRightOut) {
            return [[range1[0], range2[1]], [range2[1] + 1, range1[1]]]
        }

        const isLeftAndRightOut = range1[0] < range2[0] && range1[1] > range2[1]
        if (isLeftAndRightOut) {
            return [[range1[0], range2[0] - 1], [range2[0], range2[1]], [range2[1] + 1, range1[1]]]
        }

        return []
    }
})