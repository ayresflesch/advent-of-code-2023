const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    const rows = data.split(/\r?\n/)

    const possibleArragengementsCount = rows.reduce((acc, row) => {
        const [springs, damagedSpringsGroup] = row.split(' ')

        const possibleRecords = replaceUnknowns(springs)
        const orderOfdamagedSprings = damagedSpringsGroup.split(',')

        const possibleArrangementsCount = possibleRecords.reduce((acc, value) => {
            return isValidArrangement(value, orderOfdamagedSprings) ? ++acc : acc
        }, 0)

        return acc + possibleArrangementsCount
    }, 0);

    console.log(possibleArragengementsCount);
})

const replaceUnknowns = (str, possibleRecords = []) => {
    if (!str.includes('?')) {
        possibleRecords.push(str);
        return str
    }

    replaceUnknowns(str.replace('?', '#'), possibleRecords);
    replaceUnknowns(str.replace('?', '.'), possibleRecords);

    return possibleRecords;
}

const isValidArrangement = (arrangement, orderOfSprings) => {
    const operationalSprings = arrangement.replace(/\.+/g, ' ').trim().split(' ')

    if (operationalSprings.length != orderOfSprings.length) {
        return false
    }

    return operationalSprings.reduce((acc, value, i) => { acc &&= value.length === parseInt(orderOfSprings[i]); return acc }, true)
}
