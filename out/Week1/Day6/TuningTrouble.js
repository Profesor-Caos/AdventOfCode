"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
console.log(partOne(test, 4));
console.log(partOne(test, 14));
fs_1.default.readFile('./src/Day6/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        console.log(partOne(data, 4));
        console.log(partOne(data, 14));
    }
});
function partOne(text, sequenceLength) {
    for (let i = sequenceLength; i < text.length; i++) {
        if (isDistinctCharsLinearTime(text.substring(i - sequenceLength, i)))
            return i;
    }
    return 0;
}
function isDistinctCharsLinearTime(text) {
    let chars = {};
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char in chars)
            return false;
        chars[char] = true;
    }
    return true;
}
function isDistinctChars(text) {
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        for (let j = i + 1; j < text.length; j++) {
            if (char === text[j])
                return false;
        }
    }
    return true;
}
