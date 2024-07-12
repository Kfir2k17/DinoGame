class Ground extends Sprite {
    constructor() {
        super(2, 104, 600, 24);

        this.dWidth = this.sWidth;
        this.dHeight = this.sHeight;
        this.dx = 0;
        this.dy = 126;
        this.sx = 2;
    }

    drawSprite() {
        ctx.drawImage(sprite, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }
}