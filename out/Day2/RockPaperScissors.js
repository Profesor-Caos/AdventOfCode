"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default.readFile('./src/Day2/input.txt', 'utf8', (err, data) => {
    if (err)
        throw err;
    else {
        console.log(getRockPapersScissorsScore(data));
    }
});
function getRockPapersScissorsScore(text) {
    let lines = text.split('\n');
    let score = 0;
    for (let i = 0; i < lines.length; i++) {
        let components = lines[i].trim().split(' ');
        score += scoreRound(components);
    }
    return score;
}
function scoreRound(inputs) {
    let opp = inputs[0];
    let you = inputs[1];
    /*
    // Original assumptions
    let score = scoreWin(opp, you);
    score += scoreChoice(you);
    return score;
    */
    // new method
    return score2(opp, you);
}
function scoreChoice(you) {
    if (you === 'X') // rock
        return 1;
    else if (you === 'Y') // paper
        return 2;
    else // scissors
        return 3;
}
function scoreWin(opp, you) {
    if (opp === 'A') // opp rock
     {
        if (you === 'X') // rock draw
            return 3;
        else if (you === 'Y') // paper win
            return 6;
        else // scissors loss
            return 0;
    }
    else if (opp === 'B') // opp paper
     {
        if (you === 'X') // rock loss
            return 0;
        else if (you === 'Y') // paper draw
            return 3;
        else // scissors win
            return 6;
    }
    else // opp scissors
     {
        if (you === 'X') // rock win
            return 6;
        else if (you === 'Y') // paper loss
            return 0;
        else // scissors draw
            return 3;
    }
}
function score2(opp, you) {
    if (opp === 'A') // opp rock
     {
        if (you === 'X') // lose scissors
            return 3;
        else if (you === 'Y') // draw rock
            return 4;
        else // win paper
            return 8;
    }
    else if (opp === 'B') // opp paper
     {
        if (you === 'X') // lose rock
            return 1;
        else if (you === 'Y') // draw paper
            return 5;
        else // win scissors
            return 9;
    }
    else // opp scissors
     {
        if (you === 'X') // lose paper
            return 2;
        else if (you === 'Y') // draw scissors
            return 6;
        else // win rock
            return 7;
    }
}
