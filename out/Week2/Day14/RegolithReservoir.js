"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
console.log(partOne(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day14/input.txt', 'utf8', (err, data) => {
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
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    let vals = [];
    let grid = [];
    // Scan once to parse input and figure out the bounds we need.
    let [minX, maxX, maxY] = [Infinity, -Infinity, -Infinity];
    for (let i = 0; i < lines.length; i++) {
        let pairs = parseString(lines[i]);
        vals[i] = pairs;
        for (let j = 0; j < pairs.length; j++) {
            let [x, y] = pairs[j];
            if (x <= minX)
                minX = x;
            else if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
        }
    }
    // Create an empty cavern
    for (let i = 0; i <= maxX - minX; i++) {
        grid[i] = [];
        for (let j = 0; j <= maxY; j++) {
            grid[i][j] = 0;
        }
    }
    // Building cavern walls
    for (let i = 0; i < vals.length; i++) {
        let pairs = vals[i];
        for (let j = 1; j < pairs.length; j++) {
            let [x, y] = pairs[j - 1];
            [x, y] = [x - minX, y];
            let [endX, endY] = pairs[j];
            [endX, endY] = [endX - minX, endY];
            if (endX < x) {
                for (let k = endX; k <= x; k++) {
                    grid[k][y] = 1;
                }
            }
            else if (x < endX) {
                for (let k = x; k <= endX; k++) {
                    grid[k][y] = 1;
                }
            }
            else if (endY < y) {
                for (let k = endY; k <= y; k++) {
                    grid[x][k] = 1;
                }
            }
            else {
                for (let k = y; k <= endY; k++) {
                    grid[x][k] = 1;
                }
            }
        }
    }
    // Start sand falling
    let [startX, startY] = [500 - minX, 0];
    let onGrid = true;
    let sandCount = 0;
    while (onGrid) {
        let [currX, currY] = [startX, startY];
        let falling = true;
        while (falling) {
            if (currY + 1 > maxY) {
                falling = false;
                onGrid = false;
                break;
            }
            else if (grid[currX][currY + 1] == 0) { // keeps falling
                currY++;
                continue;
            }
            else { // hit something
                if (currX === 0) { // falls off edge
                    falling = false;
                    onGrid = false;
                    break;
                }
                else if (grid[currX - 1][currY + 1] == 0) { // keeps falling left
                    currX--;
                    currY++;
                    continue;
                }
                else if (currX === maxX) { // falls off edge
                    falling = false;
                    onGrid = false;
                    break;
                }
                else if (grid[currX + 1][currY + 1] == 0) { // keeps falling right
                    currX++;
                    currY++;
                    continue;
                }
                else { // stuck on sand.
                    grid[currX][currY] = 2; // mark sand with 2.
                    falling = false;
                    sandCount++;
                    continue;
                }
            }
        }
    }
    return sandCount;
}
function parseString(text) {
    let pairs = text.split(' -> ');
    let result = [];
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split(',').map(x => parseInt(x));
        result.push([pair[0], pair[1]]);
    }
    return result;
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
    if (left.length === right.length)
        return null;
    return true;
}
function partTwo(text) {
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    let values = lines.filter(x => x.trim().length !== 0).map(x => parseString(x));
    values = values.sort((a, b) => compare(a, b) ? -1 : 1);
    let first = values.findIndex(x => (x.length === 1 && Array.isArray(x[0]) && x[0].length === 1 && x[0][0] === '2')) + 1;
    let second = values.findIndex(x => (x.length === 1 && Array.isArray(x[0]) && x[0].length === 1 && x[0][0] === '6')) + 1;
    return first * second;
}
