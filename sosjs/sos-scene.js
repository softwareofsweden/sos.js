
class Scene {

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        /**
         * @type {GameObject[]}
         */
        this.objects = [];
    }

    /**
     * 
     * @param {GameObject} object 
     */
    addObject(object) {
        this.objects.push(object);
    }

    update() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(ctx);
        }
    }

}
