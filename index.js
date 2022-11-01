
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
        const w = this.game.width;
        const h = this.game.height;
        const ball = this.sprBall;

        ball.x++;
        ball.y = (w / 2) + Math.sin(ball.x * Math.PI / 50) * 20;
        if (ball.x > w) ball.x = - ball.w;
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
        this.addTexture('./assets/ball32x32.png', 'ball32x32');
    }

    init() {
        this.addScene(new MyScene(this));            
    }
}

const game = new MyGame();
