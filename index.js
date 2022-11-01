
class MyScene extends Scene {

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        super(game);

        this.sprBall = new Sprite(this.game.getTexture('ball32x32'));
        this.addObject(this.sprBall);
    }

    update() {
        super.update();
        this.sprBall.x++;
        const wave = Math.sin(this.sprBall.x * Math.PI / 180 * 2) * 30;
        this.sprBall.y = (this.game.height / 2) - (this.sprBall.h / 2)  + wave;
        if (this.sprBall.x > this.game.width) this.sprBall.x = -this.sprBall.w;
        this.sprBall.rotation += 5;
    }

    draw(ctx) {
        this.game.clear('#000040');
        super.draw(ctx);
    }

}

class MyGame extends Game {

    constructor() {
        super(256, 224, { useScanlines: false, pixelRatio: 4 / 3 });
    }

    loadAssets() {
        //
        // Preload Textures, Audio, Etc
        //
        this.addTexture('./assets/ball32x32.png', 'ball32x32');
    }

    init() {
        this.addScene(new MyScene(this));
    }

}

const game = new MyGame();
