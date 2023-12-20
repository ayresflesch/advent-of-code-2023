const fs = require('fs');


const possibleCards = ["A", "K", "Q", "T", 9, 8, 7, 6, 5, 4, 3, 2, "J"]
const cardValues = possibleCards.reverse().reduce((acc, value, i) => { acc[value] = i; return acc }, {})

fs.readFile('input.txt', 'utf-8', function (err, data) {

    const handsAndBids = data.split(/\r?\n/)

    const sum = handsAndBids.map(handAndBid => {
        const [hand, bid] = handAndBid.split(' ')
        return { hand, bid }
    })
        .sort((a, b) => {
            if (checkHandTypeRank(a.hand) > checkHandTypeRank(b.hand)) {
                return -1
            } else if (checkHandTypeRank(a.hand) < checkHandTypeRank(b.hand)) {
                return 1
            }

            return compareSameTypeRankHands(a.hand, b.hand)
        })
        .map(({ hand, bid }, index) => ({ hand, bid, rank: handsAndBids.length - index }))
        .reduce((acc, { bid, rank }) => acc + bid * rank, 0)

    console.log(sum);
})

const compareSameTypeRankHands = (hand1, hand2) => {
    let comparison = 0;
    for (let i = 0; i < hand1.length; i++) {
        if (hand1[i] === hand2[i]) {
            continue;
        }

        if (cardValues[hand1[i]] > cardValues[hand2[i]]) {
            comparison = -1
            break
        } else if (cardValues[hand1[i]] < cardValues[hand2[i]]) {
            comparison = 1
            break
        }
    }


    return comparison
}

const checkHandTypeRank = (hand) => {
    let cardCount = {}
    for (const card of hand) {
        cardCount[card] = cardCount[card] ? cardCount[card] + 1 : 1
    }

    if (!!cardCount["J"]) {
        handleHandWithJoker(cardCount)
    }

    return [
        isHighCard,
        isOnePair,
        isTwoPair,
        isThreeOfKind,
        isFullHouse,
        isFourOfKind,
        isFiveOfKind
    ].findIndex(func => func(cardCount)) || 0
}

const handleHandWithJoker = (cardCount) => {
    const highestValueAndCount = Object.keys(cardCount).sort((a, b) => {
        return cardValues[b] - cardValues[a] && cardCount[b] - cardCount[a]
    })

    const jCount = cardCount["J"]

    if (highestValueAndCount[0] === "J" && highestValueAndCount.length === 1) {
        cardCount["A"] = jCount
    } else if (highestValueAndCount[0] === "J" && highestValueAndCount.length !== 1) {
        cardCount[highestValueAndCount[1]] += jCount
    } else {
        cardCount[highestValueAndCount[0]] += jCount
    }

    delete cardCount["J"]
}

const isFiveOfKind = (cardCount) => {
    return Object.keys(cardCount).length === 1
}

const isFourOfKind = (cardCount) => {
    return !!Object.keys(cardCount).find(k => cardCount[k] === 4)
}

const isFullHouse = (cardCount) => {
    return !!Object.keys(cardCount).find(k => cardCount[k] === 2) && !!Object.keys(cardCount).find(k => cardCount[k] === 3)
}

const isThreeOfKind = (cardCount) => {
    return !Object.keys(cardCount).some(k => cardCount[k] === 2) && !!Object.keys(cardCount).find(k => cardCount[k] === 3)
}
const isTwoPair = (cardCount) => {
    return Object.keys(cardCount).filter(k => cardCount[k] === 2).length === 2
}
const isOnePair = (cardCount) => {
    return !!Object.keys(cardCount).find(k => cardCount[k] === 2) && Object.keys(cardCount).length === 4
}

const isHighCard = (cardCount) => {
    return Object.keys(cardCount).length === 5
}