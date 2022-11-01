
class Utils {

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {boolean} appendToBody 
     * @returns {CanvasRenderingContext2D}
     */
    static createCanvas(width, height, appendToBody = false) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.background = '#000000';
        canvas.style.margin = 'auto';
        canvas.style.display = 'block';
        canvas.style.inset = '0';
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = false;
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#ffffff';
        context.font = '12px Courier New';
        context.lineWidth = '1';
        if (appendToBody) {
            document.body.appendChild(canvas);
        }
        return context;
    }

    static getScreenSize() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        let width  = (iOS) ? screen.width : window.innerWidth;
        let height = (iOS) ? screen.height : window.innerHeight;
        if (iOS && height > width) {
            const tmp = height;
            height = width;
            width = tmp;
        }
        return { width, height };
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} color 
     */
    static clearContext(ctx, color = '#000000') {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    
    /**
     * 
     * @param {number} pointX 
     * @param {number} pointY 
     * @param {number} rectX 
     * @param {number} rectY 
     * @param {number} rectW 
     * @param {number} rectH 
     * @returns {number}
     */
    static pointInRect(pointX, pointY, rectX, rectY, rectW, rectH)
    {
        return pointX >= rectX && pointX <= rectX + rectW && pointY >= rectY && pointY <= rectY + rectH;
    }

    /**
     * 
     * @param {Point} p 
     * @param {Rect} rect 
     * @returns {boolean}
     */
    static pointInRect2(p, rect)
    {
        return this.pointInRect(p.x, p.y, rect.x, rect.y, rect.w, rect.h);
    }

    /**
     * 
     * @param {number} rect1X 
     * @param {number} rect1Y 
     * @param {number} rect1W 
     * @param {number} rect1H 
     * @param {number} rect2X 
     * @param {number} rect2Y 
     * @param {number} rect2W 
     * @param {number} rect2H 
     * @returns {boolean}
     */
    static rectInRect(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H)
    {
        return this.pointInRect(rect1X, rect1Y, rect2X, rect2Y, rect2W, rect2H) ||
            this.pointInRect(rect1X + rect1W, rect1Y, rect2X, rect2Y, rect2W, rect2H) ||
            this.pointInRect(rect1X, rect1Y + rect1H, rect2X, rect2Y, rect2W, rect2H) ||
            this.pointInRect(rect1X + rect1W, rect1Y + rect1H, rect2X, rect2Y, rect2W, rect2H);
    }

    /**
     * 
     * @param {Rect} rect1 
     * @param {Rect} rect2 
     * @returns {boolean}
     */
    static rectInRect2(rect1, rect2)
    {
        return this.rectInRect(rect1.x, rect1.y, rect1.w, rect1.h, rect2.x, rect2.y, rect2.w, rect2.h);
    }

}
