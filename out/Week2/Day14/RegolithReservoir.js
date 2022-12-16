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
// Too lazy to refactor into code that can be re-used for this part, so just pasting and modifying.
function partTwo(text) {
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
    // Below the maxY, we need another maxY two lower.
    maxY += 2;
    // Create an empty cavern
    for (let i = 0; i <= 1000; i++) { // This time, make the bounds 0-1000 to simulate infinite floor
        grid[i] = [];
        for (let j = 0; j <= maxY; j++) {
            grid[i][j] = j === maxY ? 1 : 0; // Bottom floor is all rock.
        }
    }
    // Building cavern walls
    for (let i = 0; i < vals.length; i++) {
        let pairs = vals[i];
        for (let j = 1; j < pairs.length; j++) {
            let [x, y] = pairs[j - 1]; // This time around, bounds aren't supressed to the min and max Xs
            let [endX, endY] = pairs[j];
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
    let [startX, startY] = [500, 0];
    let onGrid = true;
    let sandCount = 0;
    while (onGrid) {
        if (grid[startX][startY] === 2) { // Sand reached top
            break;
        }
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
                    console.log("This shouldn't happen because of infinite floor.");
                    break;
                }
                else if (grid[currX - 1][currY + 1] == 0) { // keeps falling left
                    currX--;
                    currY++;
                    continue;
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
