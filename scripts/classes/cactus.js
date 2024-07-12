class Cactus extends Enemy {
    constructor(sx, sWidth, sHeight) {
        super(sWidth / 2, sHeight / 2);
        this.sprite = new Sprite(sx, 2, sWidth, sHeight);
        this.size = "small";
        this.dy = 113;

        if (sHeight == 100) {
            this.size = "large";
            this.dy = 98;
        }
    }

    draw() {
        this.sprite.drawSprite(this.dx, this.dy);
        super.draw();
    }
}