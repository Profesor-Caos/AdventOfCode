"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Path_1 = require("./Path");
let test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
console.log(partOne(test));
//console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day12/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        const startTime = new Date().getTime();
        console.log(partOne(data));
        let time = new Date().getTime() - startTime;
        console.log(time);
        time = new Date().getTime();
        //console.log(partTwo(data));
        time = new Date().getTime() - startTime;
        console.log(time);
    }
});
// Solution written without researching optimal path finding.
// Was planning on implementing a traditional solution like Dijkstra's algorithm
// if I have the time, but not too upset with how the naive approach turned out.
function partOne(text) {
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    let grid = lines.map(x => x.split('').map(y => y.charCodeAt(0)));
    grid = grid[0].map((col, colIndex) => grid.map(row => row[colIndex])); // transpose the array.
    let [startX, startY] = getSpecificPoint(grid, 'S'.charCodeAt(0));
    let visited = new Set();
    let paths = [];
    paths.push(new Path_1.Path(undefined, grid, [startX, startY], true, visited, 'E'.charCodeAt(0)));
    while (paths.length > 0) {
        let path = paths.shift();
        let newPaths = path.traverse();
        for (let i = 0; i < newPaths.length; i++) {
            let newPath = newPaths[i];
            let [nodeX, nodeY] = newPath.path[newPath.path.length - 1];
            if (grid[nodeX][nodeY] === 'E'.charCodeAt(0)) // found the end
                return newPath.length();
            paths.push(newPath);
        }
    }
    return 0;
}
function getSpecificPoint(grid, searchValue) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === searchValue) // capital S ascii value
             {
                return [y, x];
            }
        }
    }
    return [-1, -1];
}
function partTwo(text) {
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    let grid = lines.map(x => x.split('').map(y => y.charCodeAt(0)));
    grid = grid[0].map((col, colIndex) => grid.map(row => row[colIndex])); // transpose the array.
    let [startX, startY] = getSpecificPoint(grid, 'E'.charCodeAt(0));
    let visited = new Set();
    let paths = [];
    paths.push(new Path_1.Path(undefined, grid, [startX, startY], false, visited, 'a'.charCodeAt(0)));
    while (paths.length > 0) {
        let path = paths.shift();
        let newPaths = path.traverse();
        for (let i = 0; i < newPaths.length; i++) {
            let newPath = newPaths[i];
            let [nodeX, nodeY] = newPath.path[newPath.path.length - 1];
            if (grid[nodeX][nodeY] === 'a'.charCodeAt(0)) // found the end
                return newPath.length();
            paths.push(newPath);
        }
    }
    return 0;
}
