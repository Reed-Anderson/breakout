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
    checkPaddleCollision(paddle, loseLifeFunction) {
        if (this.y + 10 >= 980) {
            var paddlePosition = this.x - paddle.leftX;
            if (paddlePosition >= 0 && paddlePosition <= paddle.length) {
                this.yDirection = -1;
                this.xDirection = ((paddlePosition / paddle.length) - .5) * 3;
                if (this.xDirection >= 0 && this.xDirection < .5) this.xDirection = .5
                if (this.xDirection < 0 && this.xDirection > -.5) this.xDirection = -.5
            } else {
                this.y = 500;
                this.x = 500;
                this.xDirection = 0;
                this.yDirection = 0;
                setTimeout(function() { this.yDirection = 1}.bind(this), 800);
                loseLifeFunction();
            }
        }
    }
    checkBrickCollision(rows) {
        if (this.y - 10 >= 360) return 0;
        var rowNumber = Math.floor((this.y - 10 - 72) / 36);
        var brickNumber = Math.floor(this.x / 72);
        if (rows[rowNumber] && rows[rowNumber].update(brickNumber)) {
            this.yDirection = 1;
            return Math.floor((7 - rowNumber) / 2) * 2 + 1
        } else {
            return 0;
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