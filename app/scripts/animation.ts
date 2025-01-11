// TODO: maybe some glow effects on the edges/corners of the canvas
import SpatialHash, { type IBody } from './lib/SpatialHash';
import { Vec2 } from './lib/Vec2';
import { Mouse } from './Mouse';

// Simulation parameters
let _NUM_BOIDS = 150;
const _BOID_SIZE = 5;
const _BOID_SPEED = 1 / 2;
const _BOID_ACCELERATION = _BOID_SPEED / 5.0;

// Force multipliers
const _BOID_FORCE_ALIGNMENT = 1 / 10;
const _BOID_FORCE_SEPARATION = 1 / 2;
const _BOID_FORCE_COHESION = 1 / 20;
const _BOID_FORCE_WANDER = 1 / 5;
const _BOID_FORCE_MOUSE = 1 / 2;

// Interaction ranges
const _ALIGNMENT_RANGE = 50;
const _SEPARATION_RANGE = 25;
const _COHESION_RANGE = 75;
const _MOUSE_ATTRACTION_RANGE = 200;

const _MAX_RANGE = Math.max(_ALIGNMENT_RANGE, _SEPARATION_RANGE, _COHESION_RANGE);

// Spatial hash
const _GRID_SIZE = 50;

function createBoidImage(): HTMLCanvasElement {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = _BOID_SIZE * 2;
    canvas.height = _BOID_SIZE * 2;

    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.moveTo(_BOID_SIZE * 2, _BOID_SIZE);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, _BOID_SIZE * 2);
    ctx.closePath();
    ctx.fill();

    return canvas;
}

let _BOID_IMAGE: HTMLCanvasElement;

export function setup(canvas: HTMLCanvasElement, num_boids: number) {
    _NUM_BOIDS = num_boids;
    _BOID_IMAGE = createBoidImage();
    new Simulation(canvas);
}

const VEC_alignment = new Vec2();
const VEC_separation = new Vec2();
const VEC_cohesion = new Vec2();
const VEC_wander = new Vec2();
const VEC_acceleration = new Vec2();
const VEC_mouse = new Vec2();

class Simulation {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    boids: Boid[] = [];
    boidMap: Map<number, Boid> = new Map();
    grid!: SpatialHash;
    mouse: Mouse;

    prevTimestamp: number = 0;

    times: number[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.mouse = new Mouse(canvas);
        this.resize();
        this.ctx = canvas.getContext('2d')!;
        window.addEventListener('resize', () => this.resize());
        this.Init();
        this.Step();
    }

    Init() {
        this.grid = new SpatialHash(
            [
                [0, 0],
                [this.canvas.width, this.canvas.height],
            ],
            [_GRID_SIZE, _GRID_SIZE]
        );

        for (let i = 0; i < _NUM_BOIDS; i++) {
            const boid = new Boid(rand(0, this.canvas.width), rand(0, this.canvas.height));
            boid.insert(this.grid);
            this.boids.push(boid);
            this.boidMap.set(boid.id, boid);
        }
    }

    Step(timestamp: number = 0) {
        const dt = (timestamp - this.prevTimestamp) / 1000;
        this.prevTimestamp = timestamp;

        // console.log(1000 / dt);
        // const start = performance.now();
        this.Update(dt);
        this.Render();
        // const end = performance.now();
        // this.times.push(1000 / (end - start));

        // if (this.times.length > 500) {
        //     const sum = this.times.reduce((a, b) => a + b, 0);
        //     console.log(`Average fps ${sum / this.times.length} for ${this.boids.length} boids`);
        //     this.times.length = 0;
        // }
        requestAnimationFrame(t => this.Step(t));
    }

    Update(dt: number) {
        this.updateHash();
        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i]!;
            const alignment = VEC_alignment.reset();
            const separation = VEC_separation.reset();
            const cohesion = VEC_cohesion.reset();
            const wander = VEC_wander.setXY(Math.random() * 2 - 1, Math.random() * 2 - 1).norm();
            const mouseAttraction = VEC_mouse.reset();

            let alignmentCount = 0;
            let cohesionCount = 0;

            const neighbors = this.grid.retrieve([boid.position.x, boid.position.y], [_MAX_RANGE, _MAX_RANGE]);

            for (let j = 0; j < neighbors.length; j++) {
                const other = this.boidMap.get(neighbors[j]!.id)!;
                if (other.id === boid.id) continue;

                const dist2 = (boid.position.x - other.position.x) ** 2 + (boid.position.y - other.position.y) ** 2;

                if (dist2 < _ALIGNMENT_RANGE * _ALIGNMENT_RANGE) {
                    alignment.x += other.velocity.x;
                    alignment.y += other.velocity.y;
                    alignmentCount++;
                }

                if (dist2 < _SEPARATION_RANGE * _SEPARATION_RANGE) {
                    const force = (_SEPARATION_RANGE - Math.sqrt(dist2)) / _SEPARATION_RANGE;
                    separation.x += (boid.position.x - other.position.x) * force;
                    separation.y += (boid.position.y - other.position.y) * force;
                }

                if (dist2 < _COHESION_RANGE * _COHESION_RANGE) {
                    cohesion.x += other.position.x;
                    cohesion.y += other.position.y;
                    cohesionCount++;
                }
            }

            const mouseDist2 = (boid.position.x - this.mouse.position.x) ** 2 + (boid.position.y - this.mouse.position.y) ** 2;
            if (mouseDist2 < _MOUSE_ATTRACTION_RANGE * _MOUSE_ATTRACTION_RANGE) {
                const mouseDist = Math.sqrt(mouseDist2);
                const force = (_MOUSE_ATTRACTION_RANGE - mouseDist) / _MOUSE_ATTRACTION_RANGE;
                mouseAttraction.x = ((this.mouse.position.x - boid.position.x) * force) / mouseDist;
                mouseAttraction.y = ((this.mouse.position.y - boid.position.y) * force) / mouseDist;
            }

            // normalize
            if (alignmentCount > 0) {
                alignment.x /= alignmentCount;
                alignment.y /= alignmentCount;
                alignment.norm();
            }

            if (cohesionCount > 0) {
                cohesion.x = cohesion.x / cohesionCount - boid.position.x;
                cohesion.y = cohesion.y / cohesionCount - boid.position.y;
                cohesion.norm();
            }

            separation.norm();

            // Apply forces
            const acceleration = VEC_acceleration.setXY(
                alignment.x * _BOID_FORCE_ALIGNMENT +
                    separation.x * _BOID_FORCE_SEPARATION +
                    cohesion.x * _BOID_FORCE_COHESION +
                    wander.x * _BOID_FORCE_WANDER +
                    mouseAttraction.x * _BOID_FORCE_MOUSE,
                alignment.y * _BOID_FORCE_ALIGNMENT +
                    separation.y * _BOID_FORCE_SEPARATION +
                    cohesion.y * _BOID_FORCE_COHESION +
                    wander.y * _BOID_FORCE_WANDER +
                    mouseAttraction.y * _BOID_FORCE_MOUSE
            );

            // Update velocity
            boid.velocity.x += acceleration.x * _BOID_ACCELERATION;
            boid.velocity.y += acceleration.y * _BOID_ACCELERATION;
            boid.velocity.norm();
            boid.velocity.scale(_BOID_SPEED);

            // Update position
            boid.position.x += boid.velocity.x;
            boid.position.y += boid.velocity.y;

            // Wrap around screen edges
            if (boid.position.x < -_BOID_SIZE) boid.position.x = this.canvas.width + _BOID_SIZE;
            if (boid.position.x > this.canvas.width + _BOID_SIZE) boid.position.x = -_BOID_SIZE;
            if (boid.position.y < -_BOID_SIZE) boid.position.y = this.canvas.height + _BOID_SIZE;
            if (boid.position.y > this.canvas.height + _BOID_SIZE) boid.position.y = -_BOID_SIZE;
        }
    }

    Render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.globalAlpha = 0.5;

        // draw 100x100 grid
        // this.ctx.save();
        // this.ctx.globalAlpha = 0.1;
        // this.ctx.strokeStyle = 'white';
        // this.ctx.lineWidth = 1;
        // for (let x = 0; x < this.canvas.width; x += _GRID_SIZE) {
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(x, 0);
        //     this.ctx.lineTo(x, this.canvas.height);
        //     this.ctx.stroke();
        // }
        // for (let y = 0; y < this.canvas.height; y += _GRID_SIZE) {
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(0, y);
        //     this.ctx.lineTo(this.canvas.width, y);
        //     this.ctx.stroke();
        // }
        // this.ctx.restore();
        // draw lines connecting close boids, line will be brighter if closer
        this.ctx.save();
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i]!;

            const neighbors = this.grid.retrieve([boid.position.x, boid.position.y], [_MAX_RANGE, _MAX_RANGE]);

            for (let j = 0; j < neighbors.length; j++) {
                const other = this.boidMap.get(neighbors[j]!.id)!;
                if (other.id === boid.id) continue;

                const dist2 = (boid.position.x - other.position.x) ** 2 + (boid.position.y - other.position.y) ** 2;
                if (dist2 < _ALIGNMENT_RANGE * _ALIGNMENT_RANGE) {
                    this.ctx.globalAlpha = (1 - Math.sqrt(dist2) / _ALIGNMENT_RANGE) * 0.75;
                    this.ctx.beginPath();
                    this.ctx.moveTo(boid.position.x, boid.position.y);
                    this.ctx.lineTo(other.position.x, other.position.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();

        for (let i = 0; i < this.boids.length; i++) {
            const boid = this.boids[i]!;
            const angle = Math.atan2(boid.velocity.y, boid.velocity.x);
            const size = _BOID_SIZE;

            this.ctx.save();
            this.ctx.translate(boid.position.x, boid.position.y);
            this.ctx.rotate(angle);
            this.ctx.drawImage(_BOID_IMAGE, -size, -size);
            this.ctx.restore();
        }
    }

    updateHash() {
        const bodies = this.boids;
        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i]!;
            if (body.__hashData__) {
                body.__hashData__.position[0] = body.position.x;
                body.__hashData__.position[1] = body.position.y;
                this.grid.update(body.__hashData__);
            }
        }
    }

    resize() {
        this.canvas.width = this.canvas.parentElement!.clientWidth;
        this.canvas.height = this.canvas.parentElement!.clientHeight;
    }
}

class Boid {
    static id: number = 0;

    position: Vec2;
    velocity: Vec2;
    id: number = Boid.id++;
    __hashData__?: IBody;

    constructor(x: number, y: number) {
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1).norm();
    }

    insert(grid: SpatialHash) {
        const diameter = _BOID_SIZE * 2;
        const data = grid.add(this.id, [this.position.x, this.position.y], [diameter, diameter]);
        this.__hashData__ = data;
    }
}

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
