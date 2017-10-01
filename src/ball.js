// ball.js

export default class Ball {
    constructor() {
        this.x = 500;
        this.y = 500;
        this.yDirection = 1;
        this.xDirection = 0;
        // bind functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.checkPaddleCollision = this.checkPaddleCollision.bind(this);
    }
    checkPaddleCollision(paddle) {
        if (this.y + 20 > 980) {
            if (this.x + 19 >= paddle.leftX && this.x < paddle.leftX + paddle.length) {
                this.yDirection = -1;
            }
        }
    }
    update(speed) {
        this.y += speed * this.yDirection;
        this.x += speed * this.xDirection
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.restore();
    }
}