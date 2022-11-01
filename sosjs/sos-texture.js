
class Texture {
    
    /**
     * 
     * @param {string} imageSrc 
     */
    constructor(imageSrc) {
        this.image = new Image();
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.image.src = imageSrc;
    }

}