class Enemy {
    constructor(dWidth, dHeight) {
        this.dx = 600;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }

    draw() {
        this.dx -= 2;
    }
}