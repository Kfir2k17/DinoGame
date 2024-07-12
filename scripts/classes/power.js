class Power extends Sprite {
    constructor() {
        super(878, 130, 30, 62);
        var odds = Math.floor(Math.random() * 2);

        this.ability = "immortal";

        if (odds == 1) {
            this.sy = 231;
            this.ability = "lasers";
        }

        this.dx = 600;
        this.dy = 113;
    }

    drawSprite() {
        super.drawSprite(this.dx, this.dy);
        this.dx -=2;
    }
}