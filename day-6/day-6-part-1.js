const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    let [time, distance] = data.split(/\n/).map(a => a.split(':'))
    const times = time[1].trim().replace(/\s+/g, ' ').split(' ')
    const distances = distance[1].trim().replace(/\s+/g, ' ').split(' ')


    let timesMultiplied = 1;
    for (let i = 0; i < times.length; i++) {
        const raceTime = parseInt(times[i], 10);
        const distance = parseInt(distances[i], 10);

        console.log(raceTime, distance);

        let moreThanRecordCount = 0
        for (let timeHold = 0; timeHold < raceTime; timeHold++) {
            const traveledDistance = timeHold * (raceTime - timeHold)

            if (traveledDistance > distance) {
                moreThanRecordCount++
            }
        }

        timesMultiplied *= moreThanRecordCount
    }


    console.log(timesMultiplied);

})