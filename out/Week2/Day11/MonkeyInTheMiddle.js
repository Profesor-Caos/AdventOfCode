"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Monkey_1 = require("./Monkey");
let test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;
console.log(partOne(test));
console.log(partTwo(test));
// The following is just testing the performance of my getNLargest versus sorting and slicing.
// Unsurprisingly, it's much faster since it gets the results in one pass of the data with far fewer comparisons.
/*
let numbers: number[] = [];
for (let i = 0; i < 1000000; i++) {
    numbers[i] = Math.floor(Math.random() * 10000);
}
const startTime = new Date().getTime();
console.log(getNLargest(numbers, 100));
let time = new Date().getTime() - startTime;
console.log(time);
time = new Date().getTime();
console.log(numbers.sort((a,b) => b-a).slice(0, 100));
time = new Date().getTime() - startTime;
console.log(time);
*/
fs_1.default.readFile('./src/Week2/Day11/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        const startTime = new Date().getTime();
        console.log(partOne(data));
        let time = new Date().getTime() - startTime;
        console.log(time);
        time = new Date().getTime();
        console.log(partTwo(data));
        time = new Date().getTime() - startTime;
        console.log(time);
    }
});
function partOne(text) {
    let monkeyStrings = text.includes('\r\n') ? text.split('\r\n\r\n') : text.split('\n\n');
    let monkeys = monkeyStrings.map(x => new Monkey_1.Monkey(x));
    for (let i = 0; i < 20; i++) {
        monkeys.forEach((m) => m.inspect(monkeys, 3));
    }
    return getNLargest(monkeys.map(m => m.inspectionCount), 2).reduce((a, b) => a * b);
}
function getNLargest(counts, n) {
    let largestSoFar = [];
    for (let i = 0; i < Math.min(n, counts.length); i++) {
        largestSoFar[i] = Number.MIN_VALUE;
    }
    let indexOfLowest = 0;
    for (let i = 0; i < counts.length; i++) {
        let num = counts[i];
        if (num > largestSoFar[indexOfLowest]) {
            largestSoFar[indexOfLowest] = num;
            indexOfLowest = getLowestIndex(largestSoFar);
        }
    }
    return largestSoFar;
}
function getLowestIndex(nums) {
    let lowest = Number.MAX_VALUE;
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num < lowest) {
            lowest = num;
            index = i;
        }
    }
    return index;
}
function partTwo(text) {
    let monkeyStrings = text.includes('\r\n') ? text.split('\r\n\r\n') : text.split('\n\n');
    let monkeys = monkeyStrings.map(x => new Monkey_1.Monkey(x));
    let modulo = monkeys.map(m => m.testDivisor).reduce((a, b) => a * b);
    for (let i = 0; i < 10000; i++) {
        monkeys.forEach((m) => m.inspect(monkeys, 1, modulo));
    }
    return getNLargest(monkeys.map(m => m.inspectionCount), 2).reduce((a, b) => a * b);
}
