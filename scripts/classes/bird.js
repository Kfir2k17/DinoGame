class Bird extends Enemy {
    constructor() {
        super(46, 34)
        this.sprites = {
            fly1: new Sprite(260, 14, 92, 68),  //dWidth = 46, dHeight = 34
            fly2: new Sprite(352, 2, 92, 60),  //dWidth = 46, dHeight = 30
        }
        this.status = "fly1";

        this.dy = 20;

        var place = Math.floor(Math.random() * 2);

        if (place == 0)
            this.dy = 70;

        if (place == 1)
            this.dy = 103;
    }

    draw() {
        switch (this.status) {
            case "fly1":
                this.dWidth = 46;
                this.dHeight = 34;

                this.sprites.fly1.drawSprite(this.dx, this.dy);
                break;

            case "fly2":
                this.dWidth = 46;
                this.dHeight = 30;

                this.sprites.fly2.drawSprite(this.dx, this.dy);
                break;
        }
        super.draw();
    }
}