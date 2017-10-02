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
        this.reset = this.reset.bind(this);
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
                this.reset();
                loseLifeFunction();
            }
        }
    }
    checkBrickCollision(rows) {
        if (this.y >= 360) return 0;
        
        var collisionY = (this.y - 72) / 36
        var rowNumber = Math.floor(collisionY);
        var collisionX = this.x / 72;
        var brickNumber = Math.floor(collisionX);

        if (rows[rowNumber] && rows[rowNumber].update(brickNumber)) {
            var downPercent = collisionY % 1;
            var upPercent = 1 - downPercent;
            var rightPercent = collisionX % 1;
            var leftPercent = 1 - rightPercent;

            // go northwest
            if (upPercent > .60 && leftPercent > .60
                && (!rows[rowNumber - 1] || !rows[rowNumber - 1].brickExists(brickNumber))
                && (!rows[rowNumber].brickExists(brickNumber - 1))) {
                this.yDirection = -1;
                this.xDirection = -Math.abs(this.xDirection);
                console.log(!rows[rowNumber].brickExists(brickNumber - 1))
            } 
            // go northeast
            else if (upPercent > .60 && rightPercent > .60 
                && (!rows[rowNumber - 1] || !rows[rowNumber - 1].brickExists(brickNumber))
                && (!rows[rowNumber].brickExists(brickNumber + 1))) {
                this.yDirection = -1;
                this.xDirection = Math.abs(this.xDirection);
                console.log('ne')
            } 
            // go southwest
            else if (downPercent > .60 && leftPercent > .60 
                && (!rows[rowNumber + 1] || !rows[rowNumber + 1].brickExists(brickNumber))
                && (!rows[rowNumber].brickExists(brickNumber - 1))) {
                this.yDirection = 1;
                this.xDirection = -Math.abs(this.xDirection);
                console.log('sw')
            }  
            // go southeast
            else if (downPercent > .60 && rightPercent > .60 
                && (!rows[rowNumber + 1] || !rows[rowNumber + 1].brickExists(brickNumber))
                && (!rows[rowNumber].brickExists(brickNumber + 1))) {
                this.yDirection = 1;
                this.xDirection = Math.abs(this.xDirection);
                console.log('se')
            }
            // go south
            else if (downPercent > .60 && (!rows[rowNumber + 1] || !rows[rowNumber + 1].brickExists(brickNumber)))
                this.yDirection = 1;
            // go north
            else if (upPercent > .60 && (!rows[rowNumber - 1] || !rows[rowNumber - 1].brickExists(brickNumber)))
                this.yDirection = -1
            // go west
            else if (leftPercent > .60 && (!rows[rowNumber].brickExists(brickNumber - 1)))
                this.xDirection = -Math.abs(this.xDirection);
            // go east
            else if (rightPercent > .60 && (!rows[rowNumber].brickExists(brickNumber + 1)))
                this.xDirection = Math.abs(this.xDirection);

            return Math.floor((7 - rowNumber) / 2) * 2 + 1
        } else {
            return 0;
        }
    }
    reset() {
        this.y = 500;
        this.x = 500;
        this.xDirection = 0;
        this.yDirection = 0;
        setTimeout(function() { this.yDirection = 1}.bind(this), 1500);
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