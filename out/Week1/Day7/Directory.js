"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = void 0;
class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
        this.size = 0;
    }
    addSize(size) {
        this.size += size;
        if (this.parent != null)
            this.parent.addSize(size);
    }
    getSumOfChildrenUnderSize(sizeLimit) {
        let sum = this.size > sizeLimit ? 0 : this.size;
        for (let i = 0; i < this.children.length; i++) {
            sum += this.children[i].getSumOfChildrenUnderSize(sizeLimit);
        }
        return sum;
    }
    getDirClosestToSize(sizeToFree) {
        if (this.size < sizeToFree)
            return 0;
        let best = this.size;
        for (let i = 0; i < this.children.length; i++) {
            let childSize = this.children[i].getDirClosestToSize(sizeToFree);
            if (childSize >= sizeToFree && childSize < best)
                best = childSize;
        }
        return best;
    }
}
exports.Directory = Directory;
