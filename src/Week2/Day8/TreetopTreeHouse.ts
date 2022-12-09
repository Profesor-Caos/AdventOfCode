import fs from 'fs';

let test: string = 
`30373
25512
65332
33549
35390`;

console.log(partOne(test));
console.log(partOneAttempt2(test));
//console.log(partTwo(test));


fs.readFile('./src/Week2/Day8/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        const startTime = new Date().getTime();
        console.log(partOne(data));
        let time = new Date().getTime() - startTime
        console.log(time);
        time = new Date().getTime();
        console.log(partOneAttempt2(data));
        time = new Date().getTime() - time;
        console.log(time);
        console.log(time);
        //console.log(partTwo(data));
    }
  
});

function partOne(text: string): number {
    // read each line, going left to right
    // track highest so far from left, if tree is higher than highest so far it's visible.
    // progress through rest of row to right, if no trees are higher, the tree is visible.
    // keep track of columns in an array indexed by column number (index in row)
    // with the array, track highest so far for each column.

    // I'm struggling to think of how you could accomplish this without going through the data twice.
    // I think possibly most efficient is going through the data essentially 4 times, since it limits how many times 
    // a tree will need to be compared to the ones after it, they just need to be compared to the maximum before it.

    // After writing an algorithm matching the above, I realized I double counted ones that were visible from multiple sides.
    // I could solve this by tracking what indices visible trees were found at in a hashset (just using object probably in js).
    // I was also thinking I could solve this by changing it in the string, but I think that would have unintended consequences.
    let lines: string[] = text.split('\n');
    let columns: string[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        columns[i] = "";
    }
    let visibleTrees: Set<string> = new Set<string>();
    for (let i = 0; i < lines.length; i++) {
        let maxSoFar = -1; // -1 because 0 counts as a tree height and not a null
        let line: string = lines[i];
        for (let j = 0; j < line.length; j++) {
            let char: string = line.charAt(j);
            columns[j] += char;
            let treeHeight: number = parseInt(char);
            if (treeHeight > maxSoFar) {
                visibleTrees.add(`${j},${i}`);
                maxSoFar = treeHeight;
            }
        }
        maxSoFar = -1;
        for (let j = line.length-1; j >= 0; j--) {
            let char: string = line.charAt(j);
            let treeHeight: number = parseInt(char);
            if (treeHeight > maxSoFar) {
                visibleTrees.add(`${j},${i}`);
                maxSoFar = treeHeight;
            }
        }
    }
    for (let i = 0; i < lines[0].length; i++) {
        let maxSoFar = -1;
        let col: string = columns[i];
        for (let j = 0; j < col.length; j++) {
            let char: string = col.charAt(j);
            let treeHeight: number = parseInt(char);
            if (treeHeight > maxSoFar) {
                visibleTrees.add(`${i},${j}`);
                maxSoFar = treeHeight;
            }
        }
        maxSoFar = -1;
        for (let j = col.length-1; j >= 0; j--) {
            let char: string = col.charAt(j);
            let treeHeight: number = parseInt(char);
            if (treeHeight > maxSoFar) {
                visibleTrees.add(`${i},${j}`);
                maxSoFar = treeHeight;
            }
        }
    }
    return visibleTrees.size;
}

// I had a bug in my original implementation I couldn't figure out, so I wrote another implementation and compared results
// only to realize I just had an i instead of a j in one spot.
function partOneAttempt2(text: string): number {
    let count: number = 0;
    let lines: string[] = text.split('\n');
    let grid: number[][] = lines.map(row => row.trim().split("").map(c => parseInt(c)))
    for (let x = 0; x < lines.length; x++) {
        // console.log(`x:${x}`);
        for (let y = 0; y < lines.length; y++) {
            // console.log(`y:${y}`);
            if (isTreeVisible(grid, x, y))
                count++;
        }
    }
    return count;
}

function isTreeVisible(grid: number[][], x: number, y: number): boolean {
    let height: number = grid[x][y];
    let visible = true;
    for (let i = 0; i < x; i++) {
        if (grid[i][y] >= height) {
            visible = false;
            break;
        }
    }
    if (visible)
        return true;
    visible = true;
    for (let i = x + 1; i < grid[0].length; i++) {
        if (grid[i][y] >= height) {
            visible = false;
            break;
        }
    }
    if (visible)
        return true;
    visible = true;
    for (let i = 0; i < y; i++) {
        if (grid[x][i] >= height) {
            visible = false;
            break;
        }
    }
    if (visible)
        return true;
    visible = true;
    for (let i = y + 1; i < grid.length; i++) {
        if (grid[x][i] >= height) {
            visible = false;
            break;
        }
    }
    return visible;
}