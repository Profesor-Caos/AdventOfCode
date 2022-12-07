"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// fs.readFile('./src/Day1/input.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(data);
// });
fs_1.default.readFile('./src/Day1/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        let elves = getElfCalories(data);
        let elfSums = sumElfCalories(elves);
        console.log(elfSums[0]);
        console.log(elfSums[1]);
        console.log(elfSums[2]);
        console.log(elfSums[0] + elfSums[1] + elfSums[2]);
    }
});
function sumElfCalories(elves) {
    const elfSums = [];
    for (let i = 0; i < elves.length; i++) {
        let elf = elves[i];
        let sum = 0;
        for (let j = 0; j < elf.length; j++) {
            sum += elf[j];
        }
        elfSums[i] = sum;
    }
    elfSums.sort((a, b) => b - a);
    return elfSums;
}
function getElfCalories(data) {
    const elves = [];
    let elfIndex = 0;
    let lines = data.split('\n');
    let maximum = 0;
    let currentElfIndex = 0;
    let currentElf = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line === '\r') {
            let elfSum = sumElf(currentElf);
            if (elfSum > maximum)
                maximum = elfSum;
            elves[elfIndex++] = currentElf;
            currentElf = [];
            currentElfIndex = 0;
            continue;
        }
        let calories = parseInt(line);
        currentElf[currentElfIndex++] = calories;
    }
    return elves;
}
function sumElf(elf) {
    let sum = 0;
    for (let i = 0; i < elf.length; i++) {
        sum += elf[i];
    }
    return sum;
}
