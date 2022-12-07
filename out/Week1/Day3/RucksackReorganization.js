"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
console.log(getPrioritiesSum(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Day3/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        console.log(getPrioritiesSum(data));
        console.log(partTwo(data));
    }
});
function partTwo(text) {
    let lines = text.split('\n');
    let sum = 0;
    let elves = new Set();
    for (let i = 0; i < lines.length; i += 3) {
        let elf2 = getElfAsSet(lines[i + 1]);
        let elf3 = getElfAsSet(lines[i + 2]);
        elves = new Set(Array.from(lines[i]).filter(char => elf2.has(char))); // set of first elf's characters intersecting second elf's characters
        elves = new Set(Array.from(elves.values()).filter(char => elf3.has(char))); // set of previous result intersecting third elf's characters
        sum += getLetterValue(Array.from(elves.values())[0]);
    }
    return sum;
}
function getElfAsSet(text) {
    let elf = new Set();
    for (let j = 0; j < text.length; j++) {
        elf.add(text[j]);
    }
    return elf;
}
function getPrioritiesSum(text) {
    let lines = text.split('\n');
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let firstHalf = line.substring(0, line.length / 2);
        let secondHalf = line.substring(line.length / 2);
        let firstHalfLetters = new Set();
        for (let j = 0; j < firstHalf.length; j++) {
            firstHalfLetters.add(firstHalf[j]);
        }
        let matchedLetter = '';
        for (let j = 0; j < secondHalf.length; j++) {
            if (firstHalfLetters.has(secondHalf[j])) {
                matchedLetter = secondHalf[j];
                break;
            }
        }
        sum += getLetterValue(matchedLetter);
    }
    return sum;
}
function getLetterValue(text) {
    let ascii = text.charCodeAt(0);
    if (ascii >= 97)
        return ascii - 96;
    return ascii - 38;
}
