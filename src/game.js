// game.js
import BrickRow from './brick-row';

/**
 * @class Game
 * A class to represent the game
 */
export default class Game {
    constructor() {
        // create the rows
        this.rows = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 2; j++) {
                this.rows.push(new BrickRow(i+j, 28, i))
            }
        }
        // bind classes
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        // test the rows
        console.log(this.rows);
    }
    update() {

    }
    render() {

    }
}