"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// let test = `[1,[2,[3,[4,[5,6,7]]]],8,9]
// [1,[2,[3,[4,[5,6,0]]]],8,9]`;
let test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
let test2 = `[[],1]
[[],2]

[[],2]
[[],1]

[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]

[[[[],[10,0,1],4]],[[0],7],[0,[],[]],[],[]]
[[7,[[],[1],[5,5,6],[10,3],5],10,10],[[]],[5,[2,2],1,4]]

[[10,[10,[9,8,3],3,0],[[3,10,10],[5,8,5]],[],7],[],[8],[7,1]]
[[7,1],[[2],[[3,1,7,8,3],7]]]

[[[5,[9,4,7,6],5,[8],[7,3]],[],[4],[[3,8],[8,8,9,6,9],[1,5,1]]],[[],5]]
[[10,[8,[9,6],4,[6,0,3]]],[]]

[[5],[6,2,[9,[1,3,9]]],[[8,[2,0,8,2],[],[8,6,2,9]],9,5],[3,0,3,8]]
[[],[[],[],[],[6,8,[5,10,6],7],0],[[[0,5,7],[],[0,3,4,10,2],[1,0,1],[10]],8,[1,4]],[[[10,2,10,10,2],3,6,8,0],2,5]]

[[5,3,6,9],[[7,9],8,[[1,8],0,[1],8,[]],10,6],[1],[2,[[7,2,5],[2,7]],[[],10,[],[5,10,1],10],[6,[1,1],[7,6,10,2,1],0],[]],[[8,[0],0],5,4,[],1]]
[[[5,[0,8,0,9,0],[1,8,9],[1,9]],[8,4,[],[3,10,4],3],1,9,[]],[[1,10,2],6],[5,5,10],[[1,[0,5,0],[2,6,1],4,7],[[1]],[10,[1,0],2,[],4],[[8,8,7,8],[2,6]]]]

[[2,8]]
[[[[5],[9,9,6],[1,8],[5,4,6,0,2]],[[5,9],[]],[7,[4,2,3,4],6]],[],[1,9,7,[6]]]

[[5,[7]],[[6,3],[8,[]],6],[[[3,8,1,1,3]],1,7,[],0],[1,[],[],0],[]]
[]

[1,2,3,[1,2,3],4,1]
[1,2,3,[1,2,3],4,0]`;
console.log(partOne(test));
console.log(partOne(test2));
console.log(partTwo(test));
fs_1.default.readFile('./src/Week2/Day13/input.txt', 'utf8', (err, data) => {
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
    let lines = text.includes('\r\n') ? text.split('\r\n\r\n') : text.split('\n\n');
    let pairs = lines.map(x => x.split(text.includes('\r\n') ? '\r\n' : '\n'));
    let sum = 0;
    let inOrder = [];
    let outOfOrder = [];
    for (let i = 0; i < pairs.length; i++) {
        let left = parseString(pairs[i][0]);
        let right = parseString(pairs[i][1]);
        let result = compare(left, right);
        if (result || result === null) {
            sum += i + 1;
            inOrder.push(pairs[i]);
        }
        else {
            outOfOrder.push(pairs[i]);
        }
    }
    return sum;
}
function parseString(text) {
    let stack = [];
    let values = [];
    let commaStack = [];
    let curr = '';
    let isPrecedingComma = false; // TODO: this needs to be tracked at the stack level I think, so a second array of bools at each level tracking this.
    for (let i = 1; i < text.length - 1; i++) { // can exclude first and last []
        let char = text[i];
        if (char === ',') {
            if (curr !== '') {
                if (stack.length > 0)
                    stack[stack.length - 1].push(curr);
                else
                    values.push(curr);
                curr = '';
            }
        }
        else if (char === '[') { // opening.
            stack.push([]);
        }
        else if (char === ']') { // closing.
            if (curr != '') {
                stack[stack.length - 1].push(curr);
                curr = '';
                if (stack.length > 1)
                    stack[stack.length - 2].push(stack.pop());
                else
                    values.push(stack.pop());
            }
            else {
                // if (isPrecedingComma) {
                //     if (stack.length > 0)
                //         stack[stack.length - 1].push(curr);
                //     else
                //         values.push(curr);
                // }
                // else {
                // }
                if (stack.length > 1)
                    stack[stack.length - 2].push(stack.pop());
                else
                    values.push(stack.pop());
                // A comma signifies a new value to be added.
                // If there are no commas... we should be inserting
                // Seems easier if I just make this recursive so I don't need to track
                // where commas are at each level.
                // Nevermind, tried writing recursively and it requires comma tracking and seems a headache.
            }
        }
        else {
            curr += char;
        }
    }
    if (curr !== '') {
        values.push(curr);
    }
    return values;
}
// I think actually all we need to do is add the same array to the values and the stack so when we insert into the top array in the stack,
// it goes into the array in values as well...
// function recursiveParse(text: string): any[] {
//     let values: any = [];
//     let curr = '';
//     let isPrecedingComma = false;
//     for (let i = 0; i < text.length; i++) { // can exclude first and last []
//         let char = text[i];
//         if (char === '[') {
//             if (isPrecedingComma)
//             return recursiveParse(text.substring(i+1));
//         }
//         else if (char === ']') {
//         }
//         else if (char === ',') {
//             values.push(curr);
//             curr = '';
//         }
//         else {
//             curr += char;
//         }
//         if (char === ',') {
//             if (curr !== '') {
//                 if (stack.length > 0)
//                     stack[stack.length - 1].push(curr);
//                 else
//                     values.push(curr);
//                 curr = '';
//             }
//         }
//         else if (char === '[') { // opening.
//             stack.push([]);
//         }
//         else if (char === ']') { // closing.
//             if (curr != '') {
//                 stack[stack.length - 1].push(curr);
//                 curr = '';
//                 values.push(stack.pop());
//             }
//             else {
//                 // A comma signifies a new value to be added.
//                 // If there are no commas... we should be inserting
//                 // Seems easier if I just make this recursive so I don't need to track
//                 // where commas are at each level.
//             }
//         }
//         else {
//             curr += char;
//         }
//     }
// }
function compare(left, right) {
    for (let i = 0; i < left.length; i++) {
        let leftVal = left[i];
        if (i >= right.length)
            return false;
        let rightVal = right[i];
        if (Array.isArray(leftVal)) {
            if (Array.isArray(rightVal)) {
                let result = compare(leftVal, rightVal);
                if (result != null)
                    return result;
            }
            else {
                let result = compare(leftVal, [rightVal]);
                if (result != null)
                    return result;
            }
        }
        else {
            if (Array.isArray(rightVal)) {
                let result = compare([leftVal], rightVal);
                if (result != null)
                    return result;
            }
            else {
                if (parseInt(leftVal) > parseInt(rightVal))
                    return false;
                else if (parseInt(leftVal) < parseInt(rightVal))
                    return true;
            }
        }
    }
    if (left.length === right.length)
        return null;
    return true;
}
function partTwo(text) {
    let lines = text.includes('\r\n') ? text.split('\r\n') : text.split('\n');
    return 0;
}
