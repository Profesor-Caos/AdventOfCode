"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let pretest = `noop
addx 3
addx -5`;
let test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
partOne(pretest);
console.log(partOne(test));
console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day10/input.txt', 'utf8', (err, data) => {
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
    let register = 1;
    let cycle = 1;
    let signalStrengths = 0;
    let lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].trim().split(' ');
        let dir = instruction[0];
        if (dir === 'noop') {
            if ((cycle + 20) % 40 === 0)
                signalStrengths += cycle * register;
            cycle++;
            continue;
        }
        else {
            let qty = parseInt(instruction[1]);
            if ((cycle + 20) % 40 === 0)
                signalStrengths += cycle * register;
            cycle++;
            if ((cycle + 20) % 40 === 0)
                signalStrengths += cycle * register;
            cycle++;
            register += qty;
        }
    }
    return signalStrengths;
}
function partTwo(text) {
    let register = 1;
    let cycle = 1;
    let crtLine = '';
    let lines = text.split('\n');
    // position is 0 indexed, so it's cycle - 1.
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].trim().split(' ');
        let dir = instruction[0];
        if (dir === 'noop') {
            if (Math.abs(register - cycle + 1) <= 1)
                crtLine += '#';
            else
                crtLine += '.';
            cycle++;
        }
        else {
            let qty = parseInt(instruction[1]);
            if (Math.abs(register - cycle + 1) <= 1)
                crtLine += '#';
            else
                crtLine += '.';
            cycle++;
            if ((cycle - 1) % 40 === 0) {
                console.log(crtLine);
                crtLine = '';
                cycle = 1;
            }
            if (Math.abs(register - cycle + 1) <= 1)
                crtLine += '#';
            else
                crtLine += '.';
            cycle++;
            register += qty;
        }
        if ((cycle - 1) % 40 === 0) {
            console.log(crtLine);
            crtLine = '';
            cycle = 1;
        }
    }
}
