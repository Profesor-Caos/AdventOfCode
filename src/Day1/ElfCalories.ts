const fs = require('fs');

// fs.readFile('./src/Day1/input.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(data);
// });

fs.readFile('./src/Day1/input.txt', 'utf8', (err: any, data: any) => {
  if (err) 
    throw err;
  else
  {
    let elves = getElfCalories(data);
    let elfSums = sumElfCalories(elves);
    console.log(elfSums[0]);
    console.log(elfSums[1]);
    console.log(elfSums[2]);
    console.log(elfSums[0] + elfSums[1] + elfSums[2]);
  }

});

function sumElfCalories(elves: number[][]): number[] {
  const elfSums: number[] = [];
  for (let i = 0; i < elves.length; i++) {
    let elf: number[] = elves[i];
    let sum: number = 0;
    for (let j = 0; j < elf.length; j++) {
      sum += elf[j];
    }
    elfSums[i] = sum;
  }
  elfSums.sort((a,b) => b-a);
  return elfSums;
}


function getElfCalories(data: string): number[][] {
  const elves: number[][] = []
  let elfIndex: number = 0
  let lines: string[] = data.split('\n');
  let maximum: number = 0;
  let currentElfIndex: number = 0;
  let currentElf: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    let line: string = lines[i];
    if (line === '\r'){
      let elfSum: number = sumElf(currentElf)
      if (elfSum > maximum)
        maximum = elfSum;
      elves[elfIndex++] = currentElf;
      currentElf = [];
      currentElfIndex = 0;
      continue;
    }
    let calories: number = parseInt(line);
    currentElf[currentElfIndex++] = calories;
  }
  return elves;
}

function sumElf(elf: number[]): number {
  let sum: number = 0;
  for (let i = 0; i < elf.length; i++) {
    sum += elf[i];
  }
  return sum;
}