export class Sensor {
    x: number;
    y: number;
    beaconX: number;
    beaconY: number;
    distance: number;
    intercepts: number[];
    // A sensor has a square area where beacons cannot exist.
    // The square has 4 lines, numbered 1-4 counterclockwise from the NE quadrant.
    // The intercepts are where these lines intercept the Y axis.

    constructor(text: string) {
        let words = text.split(' ');
        this.x = parseInt(words[2].split('=')[1]);
        this.y = parseInt(words[3].split('=')[1]);
        this.beaconX = parseInt(words[8].split('=')[1]);
        this.beaconY = parseInt(words[9].split('=')[1]);
        this.distance = Math.abs(this.x - this.beaconX) + Math.abs(this.y - this.beaconY);
        this.intercepts = [4];
        this.intercepts[0] = this.y - (this.x + this.distance);
        this.intercepts[1] = this.y + (this.x - this.distance);
        this.intercepts[2] = this.y - (this.x - this.distance);
        this.intercepts[3] = this.y + (this.x + this.distance);
    }

    findIntersections(other: Sensor): [number,number][] {
        let intersections: [number,number][] = []
        // we want to compare perpendicular lines, so 1 to 2 and 4, 2 to 1 and 3, 3 to 2 and 4, 4 to 1 and 3
        for (let i = 0; i <= 3; i++) {
            let intercept = this.intercepts[i];
            for (let j = 0; j <= 3; j++) {
                if (j%2 == i%2) // skip parallel lines.
                    continue;
                let otherIntercept = other.intercepts[j];
                let posSlopeIntercept, negSlopeIntercept;
                if (i%2 == 0) {
                    posSlopeIntercept = intercept;
                    negSlopeIntercept = otherIntercept;
                }
                else {
                    posSlopeIntercept = otherIntercept;
                    negSlopeIntercept = intercept;
                }
                let xCoord = (negSlopeIntercept - posSlopeIntercept) / 2;
                let yCoord = xCoord + posSlopeIntercept
                if (xCoord >= this.x - this.distance && xCoord <= this.x + this.distance && // We only care if the intersections are actually within
                    xCoord >= other.x - other.distance && xCoord <= other.x + other.distance && // the bounds of the squares.
                    yCoord >= this.y - this.distance && yCoord <= this.y + this.distance && 
                    yCoord >= other.y - other.distance && yCoord <= other.y + other.distance) 
                {
                    intersections.push([xCoord, yCoord]);
                }
            }
        }
        return intersections;
    }
    
}