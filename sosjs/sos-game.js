
class Game {

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {*} options 
     */
    constructor(width, height,
        {
            pixelRatio = 4 / 3,
            useScanlines = true
        }) {
        this.width = width;
        this.height = height;
        this.pixelRatio = pixelRatio;
        this.useScanlines = useScanlines;
        this.textures = [];
        this.texturesLoaded = false;
        this.scenes = [];
        this.currentScene = null;
        this.drawWidth = width;
        this.drawHeight = height;
        this.drawOffsetX = 0;
        this.drawOffsetY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.screenSize = Utils.getScreenSize();
        this.ctxBuffer = Utils.createCanvas(width, height);
        this.ctxScanline = Utils.createCanvas(width * 2, height * 2);
        this.ctxScreen = Utils.createCanvas(this.screenSize.width, this.screenSize.height, true);

        this.resizeCanvasToScreen();
        this.calculateUpscaleValues();

        window.addEventListener('resize', e => {
            this.screenSize = Utils.getScreenSize();
            this.resizeCanvasToScreen();
            this.calculateUpscaleValues();
        });

        this.ctxScreen.canvas.addEventListener('mousemove', e => {
            this.mouseX = Math.round((e.offsetX - this.drawOffsetX) * this.width / (this.screenSize.width - this.drawOffsetX * 2));
            this.mouseY = Math.round((e.offsetY - this.drawOffsetY) * this.height / (this.screenSize.height - this.drawOffsetY * 2));
        });

        this.loadAssets();

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    resizeCanvasToScreen() {
        this.ctxScreen.canvas.width = this.screenSize.width;
        this.ctxScreen.canvas.height = this.screenSize.height;
        this.ctxScreen.imageSmoothingEnabled = this.useScanlines;
    }

    calculateUpscaleValues() {
        let ratio = 1 / this.pixelRatio;
        this.drawWidth = this.screenSize.width;
        this.drawHeight = this.screenSize.width * ratio;
        if (this.drawHeight > this.screenSize.height) {
            let ratio = this.pixelRatio;
            this.drawHeight = this.screenSize.height;
            this.drawWidth = this.screenSize.height * ratio;
        }
        this.drawOffsetX = this.screenSize.width / 2 - this.drawWidth / 2;
        this.drawOffsetY = this.screenSize.height / 2 - this.drawHeight / 2;
    }

    addTexture(imageSrc, name) {
        this.textures.push({ name, texture: new Texture(imageSrc) });
    }

    getTexture(name) {
        for (let i = 0; i < this.textures.length; i++) {
            if (this.textures[i].name === name) {
                return this.textures[i].texture;
            }
        }
        return null;
    }

    /**
     * 
     * @param {Scene} scene 
     */
    addScene(scene) {
        this.scenes.push(scene);
        if (this.currentScene === null) {
            this.currentScene = scene;
        }
    }

    /**
     * 
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     */
    printText(text, x, y) {
        this.ctxBuffer.textAlign = 'left';
        this.ctxBuffer.textBaseline = 'top';
        this.ctxBuffer.fillText(text, Math.round(x), Math.round(y));
    }

    /**
     * 
     * @param {string} text 
     * @param {number} x 
     * @param {number} y 
     */
    centerText(text, x, y) {
        this.ctxBuffer.textAlign = 'center';
        this.ctxBuffer.textBaseline = 'middle';
        this.ctxBuffer.fillText(text, Math.round(x), Math.round(y));
    }

    /**
     * 
     * @param {string} color 
     */
    clear(color = '#000000') {
        Utils.clearContext(this.ctxBuffer, color);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} color 
     */
    rect(x, y, w, h, color = '#FFFFFF') {
        this.ctxBuffer.save();
        this.ctxBuffer.strokeStyle = color;
        this.ctxBuffer.beginPath();
        this.ctxBuffer.rect(x, y, w, h);
        this.ctxBuffer.line
        this.ctxBuffer.stroke();
        this.ctxBuffer.restore();
    }

    /**
     * 
     * @param {Rect} r 
     * @param {string} color 
     */
    rect2(r, color = '#FFFFFF') {
        this.rect(r.x, r.y, r.w, r.h, color);
    }

    loadAssets() {
    }

    init() {
    }

    update() {
        if (!this.texturesLoaded) {
            for (let i = 0; i < this.textures.length; i++) {
                if (!this.textures[i].texture.isLoaded) {
                    return;
                }
            }
            this.texturesLoaded = true;
            this.init();
        }
        if (this.currentScene != null) {
            this.currentScene.update();
        }
        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].update();
        }
    }

    draw() {
        if (!this.texturesLoaded) {
            Utils.clearContext(this.ctxBuffer);
            this.centerText('loading...', this.width / 2, this.height / 2);
            return;
        }
        if (this.currentScene != null) {
            this.currentScene.draw(this.ctxBuffer);
        }
    }

    upscale() {
        Utils.clearContext(this.ctxScreen);
        if (this.useScanlines) {
            // Buffer Context --> Scanline Context
            this.ctxScanline.drawImage(this.ctxBuffer.canvas, 0, 0, this.width * 2, this.height * 2);
            // Draw Scanlines
            this.ctxScanline.save();
            this.ctxScanline.fillStyle = '#000000';
            this.ctxScanline.globalAlpha = 0.2;
            for (let i = 0; i < this.height; i++) {
                this.ctxScanline.fillRect(0, i * 2, this.width * 2, 1);
            }
            this.ctxScanline.restore();
            // Scanline Context --> Screen Context
            this.ctxScreen.drawImage(this.ctxScanline.canvas, this.drawOffsetX, this.drawOffsetY, this.drawWidth, this.drawHeight);
        } else {
            // Buffer Context --> Screen Context
            this.ctxScreen.drawImage(this.ctxBuffer.canvas, this.drawOffsetX, this.drawOffsetY, this.drawWidth, this.drawHeight);
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        this.upscale();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

}
