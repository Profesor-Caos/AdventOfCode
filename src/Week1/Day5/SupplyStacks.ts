let stacks: string[][] = []
stacks[1] = ['B', 'Q', 'C'];
stacks[2] = ['R', 'Q', 'W', 'Z'];
stacks[3] = ['B', 'M', 'R', 'L', 'V'];
stacks[4] = ['C', 'Z', 'H', 'V', 'T', 'W'];
stacks[5] = ['D', 'Z', 'H', 'B', 'N', 'V', 'G'];
stacks[6] = ['H', 'N', 'P', 'C', 'J', 'F', 'V', 'Q'];
stacks[7] = ['D', 'G', 'T', 'R', 'W', 'Z', 'S'];
stacks[8] = ['C', 'G', 'M', 'N', 'B', 'W', 'Z', 'P'];
stacks[9] = ['N', 'J', 'B', 'M', 'W', 'Q', 'F', 'P'];

import fs from 'fs';

fs.readFile('./src/Day5/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        performMoves2(data);
        let result: string = '';
        for (let i = 1; i < stacks.length; i++)
        {
            result += stacks[i].pop();
        }
        console.log(result);
    }
  
});

function performMoves2(data: string): void {
    let lines: string[] = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let instructions: string[] = lines[i].trim().split(' ');
        let numberOfMoves: number = parseInt(instructions[1]);
        let from: number = parseInt(instructions[3]);
        let to: number = parseInt(instructions[5]);
        let removed: string[] = stacks[from].splice(-numberOfMoves);
        stacks[to] = stacks[to].concat(removed);
    }
}

function performMoves(data: string): void {
    let lines: string[] = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let instructions: string[] = lines[i].trim().split(' ');
        let numberOfMoves: number = parseInt(instructions[1]);
        let from: number = parseInt(instructions[3]);
        let to: number = parseInt(instructions[5]);
        for (let j = 0; j < numberOfMoves; j++)
            move(from, to);
    }
}

function move(from: number, to: number): void {
    let popped = stacks[from].pop();
    if (popped)
        stacks[to].push(popped);
}