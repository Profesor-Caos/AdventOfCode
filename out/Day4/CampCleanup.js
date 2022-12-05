"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
console.log(partOne(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Day4/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        console.log(partOne(data));
        console.log(partTwo(data));
    }
});
function partOne(text) {
    let count = 0;
    // Get whichever one has the higher first number.
    // If the first numbers are equal, we want to get the one with the lower second number.
    // Check if both numbers are lower than or equal to the second number of the the other one
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let orderedPairs = getOrderedPairs(line);
        if (orderedPairs[1][1] <= orderedPairs[0][1])
            count++;
    }
    return count;
}
function getOrderedPairs(text) {
    let pairs = text.split(',');
    let firstNums = getStringAsNumbers(pairs[0]);
    let secondNums = getStringAsNumbers(pairs[1]);
    if (firstNums[0] === secondNums[0]) {
        if (firstNums[1] <= secondNums[1])
            return [secondNums, firstNums];
        return [firstNums, secondNums];
    }
    if (firstNums[0] < secondNums[0])
        return [firstNums, secondNums];
    return [secondNums, firstNums];
}
function getStringAsNumbers(text) {
    let numStrings = text.split('-');
    return [parseInt(numStrings[0]), parseInt(numStrings[1])];
}
function partTwo(text) {
    let count = 0;
    // To determine if there's any overlap at all:
    // Get numbers like before
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let orderedPairs = getOrderedPairs(line);
        if (orderedPairs[1][0] <= orderedPairs[0][1] || orderedPairs[1][1] <= orderedPairs[0][1])
            count++;
    }
    return count;
    return count;
}
