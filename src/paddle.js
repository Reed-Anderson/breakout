// paddle.js

export default class Paddle {
    constructor() {
        this.leftX = 340;
        this.length = 320;
        this.render = this.render.bind(this);
    }
    reset() {
        this.leftX = 500 - this.length / 2;
    }
    update(input, speed) {
        switch (input) {
            case 'a':
            case 'ArrowLeft':
                if (this.leftX > 0)
                    this.leftX-= speed;
                break;
            case 'd':
            case 'ArrowRight':
                if (this.leftX + this.length < 1000)
                    this.leftX += speed;
                break;
        }
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.leftX, 980, this.length, 20);
        ctx.restore();
    }
}