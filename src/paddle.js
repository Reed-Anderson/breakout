// padle.js

export default class Paddle {
    constructor() {
        this.leftX = 40;
        this.length = 32;
        this.render = this.render.bind(this);
    }
    update(input) {
        switch (input) {
            case 'a':
            case 'ArrowLeft':
                if (this.leftX > 0)
                    this.leftX--;
                break;
            case 'd':
            case 'ArrowRight':
                if (this.leftX + this.length < 112)
                    this.leftX++;
                break;
        }
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.leftX, 110, this.length, 2);
        ctx.restore();
    }
}