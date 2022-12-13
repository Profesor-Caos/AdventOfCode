export class Path {
    path: [number, number][] = [];
    parentPath?: Path;
    grid: number[][];
    visited: Set<string>;
    goal: number;
    ascending: boolean;

    constructor(parentPath: Path, grid: number[][], [x, y]: [number, number], ascending?: boolean, visited?: Set<string>, goal?: number) {
        this.parentPath = parentPath;
        this.grid = grid;
        this.path[0] = [x,y];
        if (visited != null)
            this.visited = visited;
        else
            this.visited = parentPath.visited;
        if (goal != null)
            this.goal = goal;
        else
            this.goal = parentPath.goal;
        if (ascending != null)
            this.ascending = ascending;
        else
            this.ascending = parentPath.ascending;
        this.visited.add(`${x},${y}`);
    }

    public hasVisited([x,y]: [number, number]): boolean {
        if (this.parentPath == null)
            return this.visited.has(`${x},${y}`);
        return this.visited.has(`${x},${y}`) || this.parentPath.hasVisited([x,y])
    }

    public traverse(): Path[] {
        let [currentX, currentY] = this.path[this.path.length-1];
        let height = this.grid[currentX][currentY];
        if (height == 'S'.charCodeAt(0))
            height = 'a'.charCodeAt(0);
        else if (height == 'E'.charCodeAt(0))
            height = 'z'.charCodeAt(0);
        let traversablePoints: [number, number][] = [];
        if (this.isTraversable(height, [currentX, currentY-1])) // Up
            traversablePoints.push([currentX, currentY-1]);
        if (this.isTraversable(height, [currentX, currentY+1])) // Down
            traversablePoints.push([currentX, currentY+1]);
        if (this.isTraversable(height, [currentX-1, currentY])) // Left
            traversablePoints.push([currentX-1, currentY]);
        if (this.isTraversable(height, [currentX+1, currentY])) // Right
            traversablePoints.push([currentX+1, currentY]);
        
        if (traversablePoints.length == 0) // end of the path, no new options.
            return [];
        if (traversablePoints.length == 1) { // only one route, no branching
            this.path.push(traversablePoints[0]);
            let [x, y] = traversablePoints[0];
            this.visited.add(`${x},${y}`);
            return [this];
        }
        else {
            let newPaths: Path[] = [];
            for (let i = 0; i < traversablePoints.length; i++) {
                newPaths.push(new Path(this, this.grid, traversablePoints[i]));
            }
            return newPaths;
        }
    }

    public isTraversable(height: number, [x,y]: [number, number]): boolean {
        if (this.grid.length <= x || x < 0 || this.grid[x].length <= y || y < 0)
            return false;
        let toHeight = this.grid[x][y];
        if (toHeight === 'E'.charCodeAt(0)) // Capital E Ascii value signifying end - Nice
            return height >= 'y'.charCodeAt(0);
        if (toHeight - height > 1)
            return false;
        return !this.hasVisited([x,y]);
    }

    public length(): number {
        if (this.parentPath == null)
            return 0; // Don't count starting point in length.
        return this.path.length + this.parentPath.length();
    }

    public toString(): string {
        if (this.parentPath == null)
            return Array.from(this.visited.values()).join(';') + ';';
        else
            return this.parentPath.toString() + Array.from(this.visited.values()).join(';') + ';';
    }
}