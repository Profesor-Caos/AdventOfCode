"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
console.log(partOne(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day13/input.txt', 'utf8', (err, data) => {
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
    let lines = text.includes('\r\n') ? text.split('\r\n\r\n') : text.split('\n\n');
    let pairs = lines.map(x => x.split(text.includes('\r\n') ? '\r\n' : '\n'));
    let sum = 0;
    for (let i = 0; i < pairs.length; i++) {
        let result = compare(parseString(pairs[i][0]), parseString(pairs[i][1]));
        if (result || result === null)
            sum += i + 1;
    }
    return sum;
}
function parseString(text) {
    let stack = [];
    let values = [];
    let curr = '';
    for (let i = 1; i < text.length-1; i++) { // can exclude first and last []
        let char = text[i];
        if (char === ',') {
            if (curr !== '') {
                if (stack.length > 0)
                    stack[stack.length - 1].push(curr);
                else
                    values.push(curr);
                curr = '';
            }
        }
        else if (char === '[') { // opening.
            stack.push([]);
        }
        else if (char === ']') { // closing.
            stack[stack.length - 1].push(curr);
            curr = '';
            values.push(stack.pop());
        }
        else {
            curr += char;
        }
    }
    if (curr !== '') {
        values.push(curr);
    }
    return values;
}
function compare(left, right) {
    for (let i = 0; i < left.length; i++) {
        let leftVal = left[i];
        if (i >= right.length)
            return false;
        let rightVal = right[i];
        if (Array.isArray(leftVal)) {
            if (Array.isArray(rightVal)) {
                let result = compare(leftVal, rightVal);
                if (result != null)
                    return result;
            }
            else {
                let result = compare(leftVal, [rightVal]);
                if (result != null)
                    return result;
            }
        }
        else {
            if (Array.isArray(rightVal)) {
                let result = compare([leftVal], rightVal);
                if (result != null)
                    return result;
            }
            else {
                if (parseInt(leftVal) > parseInt(rightVal))
                    return false;
                else if (parseInt(leftVal) < parseInt(rightVal))
                    return true;
            }
        }
    }
    return null;
}
function partTwo(text) {
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    return 0;
}