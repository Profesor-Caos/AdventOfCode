"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
console.log(partOne(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day9/input.txt', 'utf8', (err, data) => {
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
    let visited = new Set();
    let lines = text.split('\n');
    let [hx, hy] = [0, 0];
    let [tx, ty] = [0, 0];
    visited.add(`${tx},${ty}`);
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        let dir = instruction[0];
        let dist = parseInt(instruction[1]);
        for (let j = dist; j > 0; j--) {
            if (dir == 'R') {
                if (tx < hx) {
                    tx++;
                    if (ty != hy)
                        ty = hy;
                    visited.add(`${tx},${ty}`);
                }
                hx++;
            }
            else if (dir == 'L') {
                if (tx > hx) {
                    tx--;
                    if (ty != hy)
                        ty = hy;
                    visited.add(`${tx},${ty}`);
                }
                hx--;
            }
            else if (dir == 'U') {
                if (ty < hy) {
                    ty++;
                    if (tx != hx)
                        tx = hx;
                    visited.add(`${tx},${ty}`);
                }
                hy++;
            }
            else if (dir == 'D') {
                if (ty > hy) {
                    ty--;
                    if (tx != hx)
                        tx = hx;
                    visited.add(`${tx},${ty}`);
                }
                hy--;
            }
        }
    }
    return visited.size;
}
function partTwo(text) {
    let visited = new Set();
    let lines = text.split('\n');
    let positions = [];
    for (let i = 0; i < 10; i++) {
        positions[i] = [0, 0];
    }
    visited.add(`${0},${0}`);
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        let dir = instruction[0];
        let dist = parseInt(instruction[1]);
        for (let j = 0; j < dist; j++) {
            for (let k = 0; k < 10; k++) {
                visit(positions, dir, k, visited);
            }
            visited.add(`${positions[9][0]},${positions[9][1]}`);
        }
    }
    return visited.size;
}
function visit(positions, dir, i, visited) {
    if (i == 0) {
        if (dir == 'R')
            positions[i][0]++;
        else if (dir == 'L')
            positions[i][0]--;
        else if (dir == 'U')
            positions[i][1]++;
        else if (dir == 'D')
            positions[i][1]--;
        return;
    }
    // Otherwise, we need to look at i and i-1
    if (dir == 'R') {
        if (Math.abs(positions[i - 1][0] - positions[i][0]) > 1) // knot in front is too far to the right
         {
            positions[i][0]++; // move to the right
            positions[i][1] = positions[i - 1][1]; // match the y position (moving diagonally if necessary)
        }
    }
    else if (dir == 'L') {
        if (Math.abs(positions[i - 1][0] - positions[i][0]) > 1) // same as above but Left
         {
            positions[i][0]--;
            positions[i][1] = positions[i - 1][1];
        }
    }
    else if (dir == 'U') {
        if (Math.abs(positions[i - 1][1] - positions[i - 1][1]) > 1) // knot in front is too far ahead vertically
         {
            positions[i][1]++; // move up
            positions[i][0] = positions[i - 1][0]; // match the x position (moving diagonally if necessary)
        }
    }
    else if (dir == 'D') { // same as above but Down
        if (Math.abs(positions[i - 1][1] - positions[i - 1][1]) > 1) {
            positions[i][1]--;
            positions[i][0] = positions[i - 1][0];
        }
    }
}
