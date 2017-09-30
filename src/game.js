// game.js
import BrickRow from './brick-row';
import Paddle from './paddle'
import './game.css'

/**
 * @class Game
 * A class to represent the game
 */
export default class Game {
    constructor() {
        // create the rows
        this.rows = [];
        for (var i = 0; i < 8; i++) {
            this.rows.push(new BrickRow(i, 28, Math.floor(i/2)))
        }

        // create the paddle
        this.paddle = new Paddle();
        
        // Create the back buffer canvas
        this.backBufferCanvas = document.createElement('canvas');
        this.backBufferCanvas.width = 112;
        this.backBufferCanvas.height = 112;
        this.backBufferContext = this.backBufferCanvas.getContext('2d');

        // Create the screen buffer canvas
        this.screenBufferCanvas = document.createElement('canvas');
        this.screenBufferCanvas.width = 112;
        this.screenBufferCanvas.height = 112;
        document.body.appendChild(this.screenBufferCanvas);
        this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

        // bind classes
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.loop = this.loop.bind(this);
        this.interval = setInterval(this.loop, 300);
    }
    loop() {
        this.update();
        this.render();
    }
    update() {
        this.rows.forEach(row => {
            row.update();
        })
    }
    render() {
        // create the background
        this.backBufferContext.fillStyle = '#333';
        this.backBufferContext.fillRect(0,0,112,112);
        // render the rows
        this.rows.forEach(row => {
            row.render(this.backBufferContext);
        })
        // render the paddle
        this.paddle.render(this.backBufferContext);
        // draw the image
        this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0)
    }
}