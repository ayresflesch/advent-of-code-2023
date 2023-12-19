const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    let [time, distance] = data.split(/\n/).map(a => a.split(':'))
    const times = parseInt(time[1].trim().replace(/\s+/g, ''), 10)
    const distances = parseInt(distance[1].trim().replace(/\s+/g, ''), 10)

    console.log(times, distances);

    let moreThanRecordCount = 0
    for (let timeHold = 0; timeHold < times; timeHold++) {
        const traveledDistance = timeHold * (times - timeHold)

        if (traveledDistance > distances) {
            moreThanRecordCount++
        }
    }


    console.log(moreThanRecordCount);

})