import fs from 'fs';

let test: string = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

console.log(partOne(test));
console.log(partTwo(test));


fs.readFile('./src/Week2/Day9/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
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

function partOne(text: string): number {
    let visited: Set<string> = new Set<string>();
    let lines: string[] = text.split('\n');
    let [hx, hy] = [0, 0];
    let [tx, ty] = [0,0];
    visited.add(`${tx},${ty}`);
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        let dir: string = instruction[0];
        let dist: number = parseInt(instruction[1]);
        for (let j = dist; j > 0; j--) {
            if (dir == 'R') {
                if (tx < hx)
                {
                    tx++;
                    if (ty != hy)
                        ty = hy;
                    visited.add(`${tx},${ty}`);
                }
                hx++;
            }
            else if (dir == 'L') {
                if (tx > hx)
                {
                    tx--;
                    if (ty != hy)
                        ty = hy;
                    visited.add(`${tx},${ty}`);
                }
                hx--;
            }
            else if (dir == 'U') {
                if (ty < hy)
                {
                    ty++;
                    if (tx != hx)
                        tx = hx;
                    visited.add(`${tx},${ty}`);
                }
                hy++;
            }
            else if (dir == 'D') {
                if (ty > hy)
                {
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

function partTwo(text: string): number {
    let visited: Set<string> = new Set<string>();
    let lines: string[] = text.split('\n');
    let positions: number[][] = [];
    for (let i = 0; i < 10; i++) {
        positions[i] = [0,0];
    }
    visited.add(`${0},${0}`);
    for (let i = 0; i < lines.length; i++) {
        let instruction = lines[i].split(' ');
        let dir: string = instruction[0];
        let dist: number = parseInt(instruction[1]);
        for (let j = 0; j < dist; j++) {
            for (let k = 0; k < 10; k++) {
                visit(positions, dir, k);
            }
            visited.add(`${positions[9][0]},${positions[9][1]}`)
        }
    }
    return visited.size;
}

function visit(positions: number[][], dir: string, i: number): void {
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
    if (Math.abs(positions[i-1][0] - positions[i][0]) > 1) // knot in front is too far to side
    {
        setX(positions, i);
        if (Math.abs(positions[i-1][1] - positions[i][1]) > 1)
            setY(positions, i);
        else
            positions[i][1] = positions[i-1][1]; // match the y position (moving diagonally if necessary)
    }
    else if (Math.abs(positions[i-1][1] - positions[i][1]) > 1) { // knot is too far away vertically
        setY(positions, i);
        positions[i][0] = positions[i-1][0]; // match the x position (moving diagonally if necessary)
    }
}

function setX(positions: number[][], i: number): void {
    if (positions[i-1][0] > positions[i][0])
        positions[i][0]++;
    else
        positions[i][0]--;
}

function setY(positions: number[][], i: number): void {
    if (positions[i-1][1] > positions[i][1])
        positions[i][1]++;
    else
        positions[i][1]--;
}