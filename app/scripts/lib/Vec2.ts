export class Vec2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    norm(): Vec2 {
        const mag = Math.sqrt(this.x * this.x + this.y * this.y);
        if (mag > 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    scale(factor: number): Vec2 {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    setXY(x: number, y: number): Vec2 {
        this.x = x;
        this.y = y;
        return this;
    }

    reset(): Vec2 {
        this.x = 0;
        this.y = 0;
        return this;
    }
}
