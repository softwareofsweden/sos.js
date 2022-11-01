
class BitmapFont
{

    /**
     * 
     * @param {Texture} texture 
     * @param {number} tileWidth 
     * @param {number} tileHeight 
     * @param {string} characters 
     * @param {number} characterSpacingH 
     * @param {number} characterSpacingV 
     * @param {number} offset 
     */
    constructor(texture, tileWidth, tileHeight, characters, characterSpacingH = 0, characterSpacingV = 0, offset = 0)
    {
        this.texture = texture;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.characters = characters;
        this.characterSpacingH = characterSpacingH;
        this.characterSpacingV = characterSpacingV;
        this.offset = offset;
        this.tilesPerRow = this.texture.image.width / this.tileWidth;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} c 
     * @param {number} x 
     * @param {number} y 
     */
    putChar(ctx, c, x, y) {
        let index = this.characters.indexOf(c);
        if (index == -1) {
            return;
        }
        index += this.offset
        let sx = (index % this.tilesPerRow) * this.tileWidth;
        let sy = Math.floor(index / this.tilesPerRow) * this.tileHeight;

        ctx.drawImage(this.texture.image, sx, sy, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     */
    print(ctx, text, x, y) {
        for (let i = 0; i < text.length; i++) {
            this.putChar(ctx, text[i], x + (i * (this.tileWidth + this.characterSpacingH)), y);
        }
    }

    /**
     * 
     * @param {string} text 
     * @returns {number}
     */
    getTextWidth(text) {
        return text.length * (this.tileWidth + this.characterSpacingH);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    printBox(ctx, text, x, y, w, h) {
        const words = text.split(' ');
        let currentText = '';
        let currentY = y;
        for (let i = 0; i < words.length; i++) {
            if (currentText == '' || this.getTextWidth((currentText + (currentText == '' ? '' : ' ')) + words[i]) <= w) {
                currentText += (currentText == '' ? '' : ' ') + words[i];
            } else {
                this.print(ctx, currentText, x, currentY);
                currentText = words[i];
                currentY += this.tileHeight + this.characterSpacingV;
            }
        }
        this.print(ctx, currentText, x, currentY);
    }

}