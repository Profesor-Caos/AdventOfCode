export class Directory {
    name: string;
    parent?: Directory;
    children: Directory[];
    size: number;

    constructor(name:string, parent?: Directory) {
        this.name = name;
        this.parent = parent;
        this.children = [];
        this.size = 0;
    }

    addSize(size: number): void {
        this.size += size;
        if (this.parent != null)
            this.parent.addSize(size);
    }

    getSumOfChildrenUnderSize(sizeLimit: number): number {
        let sum = this.size > sizeLimit ? 0 : this.size;
        for (let i = 0; i < this.children.length; i++) {
            sum += this.children[i].getSumOfChildrenUnderSize(sizeLimit);
        }
        return sum;
    }

    getDirClosestToSize(sizeToFree: number): number {
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