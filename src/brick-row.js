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
        for (var i = 0; i < length; i++) {
            this.bricks.push(color);
        }
        // bind our functions
        this.update = this.update.bind(this);
        this.render = this.update.render(this);
    }
    update() {

    }
    render() {
        
    }
}