class Cloud extends Sprite {
    constructor() {
        super(166, 2, 92, 27);

        this.dx = 600;
        this.dy = Math.floor(Math.random() * 100);
    }

    drawSprite() {
        ctx.drawImage(sprite, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);

        this.dx -= 1.5;
    }
}