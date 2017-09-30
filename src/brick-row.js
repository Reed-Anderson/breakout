// brick-row.js

/**
 * @class brick-row
 * A class to represent a row of bricks
 */
export default class BrickRow {
    /**
     * @constructor BrickRow
     * Constructor for the BrickRow Class
     * @param {int} rowNumber 
     * @param {int} length 
     * @param {int} color 
     */
    constructor(rowNumber, length, color) {
        // represent the bricks in an array
        this.bricks = [];
        this.color = color;
        this.rowNumber = rowNumber;
        for (var i = 0; i < length; i++) {
            this.bricks.push(color);
        }
        // bind our functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }
    update() {

    }
    render(ctx) {
        this.bricks.forEach((brick, i) => {
            ctx.save();
            switch(this.color) {
                case 0:
                    ctx.fillStyle = 'red';
                    break;
                case 1:
                    ctx.fillStyle = 'orange';
                    break;
                case 2:
                    ctx.fillStyle = 'green';
                    break;
                default:
                    ctx.fillStyle = 'yellow';
                    break;
            }
            ctx.fillRect(i*4, this.rowNumber*4, 4, 4)
            ctx.restore();
        })
    }
}