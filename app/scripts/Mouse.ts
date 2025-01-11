import { Vec2 } from './lib/Vec2';

export class Mouse {
    position: Vec2 = new Vec2();
    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener('mousemove', e => {
            // get position with respect to the canvas
            const rect = canvas.getBoundingClientRect();
            this.position.x = e.clientX - rect.left;
            this.position.y = e.clientY - rect.top;
        });
    }
}
