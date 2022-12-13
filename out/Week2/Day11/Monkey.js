"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monkey = void 0;
class Monkey {
    constructor(text) {
        this.inspectionCount = 0;
        let lines = text.includes('\r\n') ? text.split('\r\n').map(x => x.trim()) : text.split('\n').map(x => x.trim());
        this.num = parseInt(lines[0].split(' ')[1]);
        this.items = lines[1].split(':')[1].split(',').map(x => parseInt(x));
        let operation = lines[2].split(' ');
        this.operator = operation[4].trim();
        this.operand = operation[5].trim();
        this.testDivisor = parseInt(lines[3].split(' ')[3]);
        this.trueMonkey = parseInt(lines[4].split(' ')[5]);
        this.falseMonkey = parseInt(lines[5].split(' ')[5]);
    }
    inspect(monkeys, divisor, modulo = 0) {
        if (this.items.length === 0)
            return;
        for (let i = 0; i < this.items.length; i++) {
            this.inspectionCount++;
            let item = this.items[i];
            let operandInt = this.operand === 'old' ? item : parseInt(this.operand);
            if (this.operator === '*')
                item *= operandInt;
            else if (this.operator === '+')
                item += operandInt;
            item = Math.floor(item / divisor);
            if (modulo != 0)
                item = item % modulo;
            if (item % this.testDivisor === 0)
                monkeys[this.trueMonkey].items.push(item);
            else
                monkeys[this.falseMonkey].items.push(item);
        }
        this.items = [];
    }
}
exports.Monkey = Monkey;
