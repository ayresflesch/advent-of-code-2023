const fs = require('fs');

fs.readFile('input.txt', 'utf-8', function (err, data) {

    startTime = new Date();

    const rows = data.split(/\r?\n/)

    const possibleArragengementsCount = rows.reduce((acc, row) => {
        let [springs, nums] = row.split(' ')
        nums = nums.split(',').map(Number)

        return acc + count(springs, nums)
    }, 0);

    console.log(possibleArragengementsCount);

    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    console.log(timeDiff + " seconds");
})

const count = (config, nums) => {
    // console.log(config, nums)

    if (config.length === 0) {
        return nums.length === 0 ? 1 : 0
    }

    if (nums.length === 0) {
        return config.includes("#") ? 0 : 1
    }

    let result = 0;

    if (config.startsWith(".") || config.startsWith("?")) {
        result += count(config.slice(1), nums)
    }

    if (config.startsWith("#") || config.startsWith("?")) {
        const num = nums[0]
        const subStr = config.substring(0, num)

        // next value after subString can't be # otherwise it would still be a number block. example: num = 3 and config ?#?# 
        const nextIsNotHash = config[num] !== "#"

        if (num <= subStr.length && !subStr.includes('.') && nextIsNotHash) {
            result += count(config.slice(num + 1), nums.slice(1))
        }
    }


    return result
}

