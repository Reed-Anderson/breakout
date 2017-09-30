// padle.js

export default class Paddle {
    constructor() {
        this.leftX = 40;
        this.length = 32;
        this.render = this.render.bind(this);
    }
    update() {

    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.leftX, 110, this.length, 2);
        ctx.restore();
    }
}