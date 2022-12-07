import fs from 'fs';

let test: string = 
`mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

console.log(partOne(test, 4));
console.log(partOne(test, 14));

fs.readFile('./src/Day6/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        console.log(partOne(data, 4));
        console.log(partOne(data, 14));
    }
  
});

function partOne(text: string, sequenceLength: number): number {
    for (let i = sequenceLength; i < text.length; i++) {
        if (isDistinctCharsLinearTime(text.substring(i - sequenceLength, i)))
            return i;
    }
    return 0;
}

function isDistinctCharsLinearTime(text: string): boolean {
    let chars: any = {};
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char in chars)
            return false;
        chars[char] = true;
    }
    return true;
}

function isDistinctChars(text: string): boolean {
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        for (let j = i+1; j < text.length; j++) {
            if (char === text[j])
                return false;
        }
    }
    return true;
}