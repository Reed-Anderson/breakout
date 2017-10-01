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
        this.checkBrickCollision = this.checkBrickCollision.bind(this);
    }
    checkPaddleCollision(paddle) {
        if (this.y + 10 >= 980) {
            var paddlePosition = this.x - paddle.leftX;
            if (paddlePosition >= 0 && paddlePosition <= paddle.length) {
                this.yDirection = -1;
                var paddleSegment = Math.ceil( paddlePosition / paddle.length * 6);
                this.xDirection = paddleSegment <= 3 ? (paddleSegment - 4) * .5 : (paddleSegment - 3) * .5;
            }
        }
    }
    checkBrickCollision(rows) {
        if (this.y - 10 > 288) return;
        var rowNumber = Math.floor((this.y - 10) / 36);
        console.log(rows, rowNumber);
        var brickNumber = Math.floor(this.x / 36);
        if (rows[rowNumber] && rows[rowNumber].update(brickNumber)) {
            this.yDirection = 1;
        }
    }
    update(speed) {
        this.y += speed * this.yDirection;
        this.x += speed * this.xDirection
        if (this.x - 10 <= 0) this.xDirection = Math.abs(this.xDirection);
        if (this.x + 10 >= 1000) this.xDirection = -Math.abs(this.xDirection);
        if (this.y - 10 <= 0) this.yDirection = 1;
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.x-10, this.y-10, 20, 20);
        ctx.restore();
    }
}