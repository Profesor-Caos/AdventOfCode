import fs from 'fs';

let test: string = 
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

console.log(partOne(test));
console.log(partTwo(test));

fs.readFile('./src/Day4/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        console.log(partOne(data));
        console.log(partTwo(data));
    }
  
});

function partOne(text: string): number {
    let count: number = 0;
    // Get whichever one has the higher first number.
    // If the first numbers are equal, we want to get the one with the lower second number.
    // Check if both numbers are lower than or equal to the second number of the the other one
    let lines: string[] = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line: string = lines[i];
        let orderedPairs = getOrderedPairs(line);
        if (orderedPairs[1][1] <= orderedPairs[0][1])
            count++;
    }

    return count;
}

function getOrderedPairs(text: string): number[][] {
    let pairs = text.split(',');
    let firstNums = getStringAsNumbers(pairs[0]);
    let secondNums = getStringAsNumbers(pairs[1]);
    if (firstNums[0] === secondNums[0])
    {
        if (firstNums[1] <= secondNums[1])
            return [secondNums, firstNums];
        return [firstNums, secondNums];
    }
    if (firstNums[0] < secondNums[0])
        return [firstNums, secondNums];
    return [secondNums, firstNums];
}

function getStringAsNumbers(text: string): number[] {
    let numStrings = text.split('-');
    return [parseInt(numStrings[0]), parseInt(numStrings[1])];
}

function partTwo(text: string): number {
    let count: number = 0;
    // To determine if there's any overlap at all:
    // Get numbers like before
    let lines: string[] = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line: string = lines[i];
        let orderedPairs = getOrderedPairs(line);
        if (orderedPairs[1][0] <= orderedPairs[0][1] || orderedPairs[1][1] <= orderedPairs[0][1])
            count++;
    }

    return count;
}