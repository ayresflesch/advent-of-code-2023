const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    let cards = data.split('\n').map(n => n);

    const cardAndResult = {}

    cards.forEach(row => {
        const [card, winningAndOwnedNumbers] = row.split(':')
        const [winningNumbersStr, ownedNumbersStr] = winningAndOwnedNumbers.split("|")

        const ownedNumbers = ownedNumbersStr.replaceAll('  ', ' 0').split(' ').filter(n => n)


        let count = 0;
        ownedNumbers.forEach(n => {
            if (winningNumbersStr.replaceAll('  ', ' 0').includes(n)) {
                count++
            }
        })

        const cardNumber = parseInt(card.replace(/^\D+/g, ''), 10)
        cardAndResult[cardNumber] = count
    });


    const numberAndTimes = Object.keys(cardAndResult).reduce((accumulator, cardNumber) => {
        accumulator[cardNumber] = 1;
        return accumulator;
    }, {});

    Object.keys(cardAndResult).forEach((cardNumber) => {
        const result = cardAndResult[cardNumber]

        const additionalCards = cardNumber === 1 ? 1 : numberAndTimes[cardNumber]

        for (let i = 0; i < additionalCards; i++) {
            for (let j = 0; j < result; j++) {
                const index = parseInt(cardNumber, 10) + j + 1
                numberAndTimes[index] = numberAndTimes[index] ? numberAndTimes[index] + 1 : 1
            }
        }
    })

    const sum = Object.keys(numberAndTimes)
        .map(a => numberAndTimes[a])
        .reduce((acc, value) => acc + value, 0)

    console.log(sum);
})