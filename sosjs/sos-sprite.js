
class Sprite extends GameObject {

    /**
     * 
     * @param {Texture} texture 
     */
    constructor(texture) {
        super();
        this.texture = texture;
        this.x = 0;
        this.y = 0;
        this.w = this.texture.image.width;
        this.h = this.texture.image.height;
        this.flip = false;
        this.flop = false;
        this.rotation = 0;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx)
    {
        if (this.rotation != 0 || this.flip || this.flop) {
            ctx.save();
            ctx.translate(Math.round(this.x) + this.w / 2, Math.round(this.y) + this.h / 2);
            if (this.rotation != 0) {
                ctx.rotate(this.rotation * Math.PI / 180);
            }
            if (this.flip || this.flop) {
                ctx.scale(this.flip ? -1 : 1, this.flop ? -1 : 1);
            }
            ctx.translate(-Math.round(this.x) - this.w / 2, -Math.round(this.y) - this.h / 2);
            ctx.drawImage(this.texture.image, Math.round(this.x), Math.round(this.y));
            ctx.restore();
        } else {
            ctx.drawImage(this.texture.image, Math.round(this.x), Math.round(this.y));
        }
    }

}