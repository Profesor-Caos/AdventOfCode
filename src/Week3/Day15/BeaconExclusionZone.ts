import fs from 'fs';
import { Sensor } from './Sensor';

let test: string = 
`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

// fullTest();

console.log(partOne(test, 10));
console.log(partTwo(test));

fs.readFile('./src/Week3/Day15/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        let time = new Date().getTime();
        console.log(partOne(data,2000000));
        time = new Date().getTime() - time;
        console.log(time);
        time = new Date().getTime();
        console.log(partTwo(data));
        time = new Date().getTime() - time;
        console.log(time);
    }
  
});

function partOne(text: string, row: number): number {
    let lines: string[] = text.includes('\r\n') ? text.split('\r\n') :text.split('\n');
    let sensors: Sensor[] = lines.map(x => new Sensor(x));
    let rowRanges: [number, number][] = [];
    let beaconsInRow: Set<number> = new Set<number>();
    for (let i = 0; i < sensors.length; i++) {
        let sensor = sensors[i];
        if (sensor.beaconY == row)
            beaconsInRow.add(sensor.beaconX);
        if (sensor.y - sensor.distance <= row && sensor.y + sensor.distance >= row) { // the row intersects the sensor's beacon range.
            let xRangeAtRow = sensor.distance - Math.abs(row - sensor.y);
            rowRanges.push([sensor.x - xRangeAtRow, sensor.x + xRangeAtRow]);
        }
    }
    let ranges = sortMerge(rowRanges);
    return sumRanges(ranges) - beaconsInRow.size;
}

function sumRanges(ranges: [number, number][]): number {
    let sum = 0;
    ranges.forEach(x => sum += x[1] - x[0] + 1);
    return sum;
}

function mergeRanges(ranges: [number, number][]): [number, number][] {
    let simplifiedRanges = ranges;
    while (true) {
        simplifiedRanges = simplifyRanges(simplifiedRanges);
        let again = simplifyRanges(simplifiedRanges);
        if (simplifiedRanges.length == again.length)
            break;
        simplifiedRanges = again;
    }
    return simplifiedRanges;
}

function sortMerge(ranges: [number, number][]): [number, number][] {
    let sorted = ranges.sort((a, b) => a[0] - b[0]);
    let merged: [number, number][] = [];
    merged.push(sorted[0]);
    for (let i = 1; i < sorted.length; i++) {
        let [sX, sY] = merged[merged.length - 1];
        let [x, y] = sorted[i];
        if (x <= sY){
            if (y > sY)
                merged[merged.length - 1] = [sX, y];
        }
        else {
            merged.push([x, y]);
        }
    }
    return merged;
}

function simplifyRanges(ranges: [number, number][]): [number, number][] {
    let simplifiedRanges: [number, number][] = [];
    simplifiedRanges.push(ranges[0]);
    for (let i = 1; i < ranges.length; i++) {
        let [x, y] = ranges[i];
        let hasOverlap = false;
        for (let j = 0; j < simplifiedRanges.length; j++) {
            let [sX, sY] = simplifiedRanges[j];
            if (x >= sX && y <= sY) { // already contained.
                hasOverlap = true;
                break;
            }
            if (x <= sX && y >= sX) { // overlaps at least left point.
                sX = x;
                hasOverlap = true;
            }
            if (y >= sY && x <= sY) { // overlaps at least right point.
                sY = y;
                hasOverlap = true;
            }
            if (hasOverlap) {
                simplifiedRanges[j] = [sX, sY]; // update simplified range.
                break;
            }
        }
        if (!hasOverlap)
            simplifiedRanges.push([x,y]);
    }
    return simplifiedRanges;
}

function partTwo(text: string): number {
    let lines: string[] = text.includes('\r\n') ? text.split('\r\n') :text.split('\n');
    let sensors: Sensor[] = lines.map(x => new Sensor(x));
    let intersections: [number, number][] = []
    for (let i = 0; i < sensors.length; i++) {
        for(let j = i + 1; j < sensors.length; j++) {
            intersections = intersections.concat(sensors[i].findIntersections(sensors[j]));
        }
    }
    // We want to go through the intersections, finding any that are within 2 in x and the same y
    // or within 2 in y and the same x. If we come across an intersection that has 3 matches, we found
    // the point between the intersections where a beacon can be
    
    for (let i = 0; i < intersections.length; i++) {
        let [x, y] = intersections[i];
        let matches: [number, number][] = [];
        for(let j = i + 1; j < intersections.length; j++) {
            let [a, b] = intersections[j];
            let doesMatch = false;
            if (Math.abs(x - a) === 2 && y === b || Math.abs(y - b) === 2 && x === a) {
                doesMatch = true;
            }
            else if (Math.abs(x - a) === 1 && Math.abs(y - b) === 1) {
                doesMatch = true;
            }
            if (doesMatch) {
                let alreadyMatched = false;
                for (let k = 0; k < matches.length; k++) {
                    if (matches[k][0] === a && matches[k][1] === b) {
                        alreadyMatched = true;
                        break;
                    }
                }
                if (!alreadyMatched)
                    matches.push([a, b]);
            }
        }
        let point;
        if (matches.length >= 3) { // possibly found a point bounded on all sides by intersections of sensor regions.
            // Have to figure out what the point is.
            let across;
            for (let j = 0; j < matches.length; j++) {
                let [a,b] = matches[j];
                if (a === x || b === y) {
                    across = [a,b];
                    break;
                }
            }
            if (across === undefined) // no across match found.
                continue;
            if (across[1] === y) // horizontally across from the point
            {
                if (across[0] > x) { // across to right
                    let upper, lower;
                    for (let j = 0; j < matches.length; j++) {
                        let [a,b] = matches[j];
                        if (a === x + 1 && b === y - 1)
                            upper = [a,b];
                        else if (a === x + 1 && b === y + 1)
                            lower = [a,b]
                    }
                    if (upper === undefined || lower === undefined)
                        continue;
                    point = [x+1, y];
                }
                else { // across to left;
                    let upper, lower;
                    for (let j = 0; j < matches.length; j++) {
                        let [a,b] = matches[j];
                        if (a === x - 1 && b === y - 1)
                            upper = [a,b];
                        else if (a === x - 1 && b === y + 1)
                            lower = [a,b]
                    }
                    if (upper === undefined || lower === undefined)
                        continue;
                    point = [x-1, y];
                }
            }
            else { // vertically across from the point
                if (across[1] > y) { // across below
                    let left, right;
                    for (let j = 0; j < matches.length; j++) {
                        let [a,b] = matches[j];
                        if (a === x - 1 && b === y + 1)
                            left = [a,b];
                        else if (a === x + 1 && b === y + 1)
                            right = [a,b]
                    }
                    if (left === undefined || right === undefined)
                        continue;
                    point = [x, y+1];
                }
                else { // across above;
                    let left, right;
                    for (let j = 0; j < matches.length; j++) {
                        let [a,b] = matches[j];
                        if (a === x - 1 && b === y - 1)
                            left = [a,b];
                        else if (a === x + 1 && b === y - 1)
                            right = [a,b]
                    }
                    if (left === undefined || right === undefined)
                        continue;
                    point = [x, y-1];
                }
            }
        }
        if (point === undefined)
            continue;
        // now that we have a point... what if it's within the bounds of another sensor?
        // have to confirm it isn't.
        let withinRange = false;
        for (let j = 0; j < sensors.length; j++) {
            let [x,y] = point;
            let sensor = sensors[j];
            if (Math.abs(x - sensor.x) + Math.abs(y - sensor.y) <= sensor.distance) {
                withinRange = true;
                break;
            }
        }
        if (withinRange)
            continue;
        return point[0] * 4000000 + point[1];
    }
    return 0;
}

function fullTest() {
    let n = 1000;
    let iterations = 100;
    let data = Array.from(Array(iterations)).map(x => generateNRanges(n, true));
    console.log(testNTimes(iterations, mergeRanges, data));
    console.log(testNTimes(iterations, sortMerge, data));

    data = Array.from(Array(iterations)).map(x => generateNRanges(n, false));
    console.log(testNTimes(iterations, mergeRanges, data));
    console.log(testNTimes(iterations, sortMerge, data));
}

function testNTimes(sampleSize: number, func: Function, data: [number, number][][]): number {
    let time: number = new Date().getTime();
    for (let i = 0; i < sampleSize; i++) {
        func(data[i]);
    }
    return (new Date().getTime() - time)/sampleSize;
}

function generateNRanges(n: number, sorted: boolean) {
    let numbers: number[] = [];
    for (let i = 0; i < n; i++) {
        numbers.push(Math.floor(Math.random()*n));
    }
    if (sorted)
        numbers.sort();
    let ranges: [number, number][] = [];
    for (let i = 0; i < n; i += 2) {
        if (numbers[i] < numbers[i+1])
            ranges.push([numbers[i], numbers[i+1]]);
        else
            ranges.push([numbers[i+1], numbers[i]]);
    }
    for (let i = ranges.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * i);
    
        let temp = ranges[i];
        ranges[i] = ranges[r];
        ranges[r] = temp;
    }
    return ranges;
}