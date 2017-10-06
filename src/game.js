// game.js
import BrickRow from './brick-row';
import Paddle from './paddle'
import Ball from './ball'
import './game.css'
import BrickSound from './Brick.wav'
import PaddleWallSound from './PaddleOrWall.wav'

/**
 * @class Game
 * A class to represent the game
 */
export default class Game {
    constructor() {
        // create the rows
        this.rows = [];
        for (var i = 0; i < 8; i++) {
            this.rows.push(new BrickRow(i, 14, Math.floor(i/2)))
        }

        // create the paddle
        this.paddle = new Paddle();
        this.input = null;

        // create the ball
        this.ball = new Ball();
        
        // Create the back buffer canvas
        this.backBufferCanvas = document.createElement('canvas');
        this.backBufferCanvas.width = 1000;
        this.backBufferCanvas.height = 1000;
        this.backBufferContext = this.backBufferCanvas.getContext('2d');

        // Create the screen buffer canvas
        this.screenBufferCanvas = document.createElement('canvas');
        this.screenBufferCanvas.id = 'domCanvas';
        this.screenBufferCanvas.width = 1000;
        this.screenBufferCanvas.height = 1000;
        document.body.appendChild(this.screenBufferCanvas);
        this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

        // handle key events
        this.handleKeyDown = this.handleKeyDown.bind(this);
        document.onkeydown = this.handleKeyDown;
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.onkeyup = this.handleKeyUp;

        // bind functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.loop = this.loop.bind(this);
        this.checkBallCollisions = this.checkBallCollisions.bind(this);
        this.loseLife = this.loseLife.bind(this);
        this.playBrickSound = this.playBrickSound.bind(this);
        
        // set game variables
        this.over = false;
        this.score = 0;
        this.lives = 3;
        this.gameSpeed = 5;
        this.secondRows = false;
        this.halvedPaddle = false;
        this.bricksDestroyed = 0;
        this.orangeContact = false;
        this.redContact = false;

        this.interval = setInterval(this.loop, 15);
    }
    handleKeyDown(event) {
        event.preventDefault();
        switch(event.key) {
          case 'a':
          case 'd':
          case 'ArrowLeft':
          case 'ArrowRight':
            this.input = event.key;
            break;
        }
    }
    handleKeyUp(event) {
        event.preventDefault();
        switch(event.key) {
            case 'a':
            case 'd':
            case 'ArrowLeft':
            case 'ArrowRight':
                if (event.key === this.input)
                    this.input = null;
                break;
        }
    }
    drawHeart(ctx, x, y) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + 75, y + 40);
        ctx.bezierCurveTo(x + 75, y + 37,   x + 70,  y + 25,   x + 50,  y + 25);
        ctx.bezierCurveTo(x + 20, y + 25,   x + 20,  y + 62.5, x + 20,  y + 62.5);
        ctx.bezierCurveTo(x + 20, y + 80,   x + 40,  y + 102,  x + 75,  y + 120);
        ctx.bezierCurveTo(x + 110,y + 102,  x + 130, y + 80,   x + 130, y + 62.5);
        ctx.bezierCurveTo(x + 130,y + 62.5, x + 130, y + 25,   x + 100, y + 25);
        ctx.bezierCurveTo(x + 85, y + 25,   x + 75,  y + 37,   x + 75,  y + 40);
        ctx.fill();
        ctx.restore();
    }
    checkBallCollisions() {
        if (this.ball.checkPaddleCollision(this.paddle, this.loseLife)) {
            this.playBallBounceSound();
        }
        var pointsAdded = this.ball.checkBrickCollision(this.rows);
        if (pointsAdded) {
            this.playBrickSound();
            this.score += pointsAdded;
            this.bricksDestroyed++;
            if (this.bricksDestroyed == 4) this.gameSpeed += 2;
            if (this.bricksDestroyed == 12) this.gameSpeed += 2;
            if (!this.orangeContact && pointsAdded === 5) {
                this.gameSpeed += 2;
                this.orangeContact = true;
            }
            if (!this.redContact && pointsAdded === 7) {
                this.gameSpeed += 2;
                this.redContact = true;
            }
        }
    }
    loseLife() {
        if (--this.lives === 0) {
            this.over = true;
        }
    }
    loop() {
        this.update();
        this.render();
    }
    update() {
        if (!this.over) {
            this.rows.forEach(row => {
                row.update();
            })
            this.paddle.update(this.input, this.gameSpeed);
            if (this.ball.update(this.gameSpeed, this.playBallBounceSound) && !this.halvedPaddle) {
                this.paddle.half();
                this.halvedPaddle = true;
            }
            this.checkBallCollisions();
            if (this.score === 448 && !this.secondRows) {
                this.rows = [];
                for (var i = 0; i < 8; i++) {
                    this.rows.push(new BrickRow(i, 14, Math.floor(i/2)))
                }
                this.ball.reset();
                this.secondRows = true;
            }
        }
    }
    render() {
        if (!this.over) {
            // create the background
            this.backBufferContext.fillStyle = '#333';
            this.backBufferContext.fillRect(0,0,1000,1000);
            // render game vars
            this.backBufferContext.fillStyle = 'white';
            this.backBufferContext.font = "40px Verdana";
            this.backBufferContext.fillText(this.score + ' Points', 10, 950);
            this.drawHeart(this.backBufferContext, 850, 850);
            this.backBufferContext.fillStyle = 'red';
            this.backBufferContext.fillText(this.lives, 912, 935);
            // render the rows
            this.rows.forEach(row => {
                row.render(this.backBufferContext);
            })
            // render the paddle
            this.paddle.render(this.backBufferContext);
            // render the ball
            this.ball.render(this.backBufferContext);
        } else {
            this.backBufferContext.fillStyle = '#333';
            this.backBufferContext.fillRect(0,0,1000,1000);
            this.backBufferContext.fillStyle = 'white';
            this.backBufferContext.font = "40px Verdana";
            this.backBufferContext.fillText('Game Over. Total Points - ' + this.score, 200, 400);
            this.backBufferContext.fillText('Click here to play again.', 240, 515);
            var canvas = document.getElementById('domCanvas');
            canvas.onclick = function() {
                window.location = window.location;
            }
        }
        this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
    }
    playBrickSound() {
        var audio = new Audio(BrickSound) // document.createElement('audio');
        audio.play();
    }
    playBallBounceSound() {
        var audio = new Audio(PaddleWallSound) // document.createElement('audio');
        audio.play();
    }
}