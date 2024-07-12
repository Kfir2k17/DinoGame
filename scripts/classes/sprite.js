class Sprite {
    constructor(sx, sy, sWidth, sHeight) {
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dWidth = this.sWidth / 2; //dino - 44
        this.dHeight = this.sHeight / 2; //dino - 47

        this.dx = 0;
        this.dy = 0;
    }

    drawSprite(dx, dy) {
        ctx.drawImage(sprite, this.sx, this.sy, this.sWidth, this.sHeight, dx, dy, this.dWidth, this.dHeight);
        
        this.dx = dx;
        this.dy = dy;
    }
}