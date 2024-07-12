class Dino {
    constructor() {
        this.sprites = {
            begin: new Sprite(76, 7, 88, 90),
            jump: new Sprite(1678, 2, 88, 94),
            run1: new Sprite(1854, 2, 88, 94),
            run2: new Sprite(1942, 2, 88, 94),
            dead: new Sprite(2030, 2, 88, 94),
            dead_noback: new Sprite(2122, 6, 80, 86),
            duck1: new Sprite(2206, 36, 120, 60),
            duck2: new Sprite(2324, 36, 120, 60),
        }

        this.dy = 100;
        this.dx = 5

        this.state = "start"; // the state of the dino (running/ducking/etc..)
        this.spr = "start"; // the sprite that was drawn (run1/run2/etc..)

        this.mode = "normal"; //abilities: normal/lasers/immortal

        this.dWidth = 44;
        this.dHeight = 47;
    }

    draw() {
        switch (this.spr) {
            case "start":
                this.sprites.begin.drawSprite(5, this.dy);
                break;

            case "run1":
                if (this.mode == "immortal")
                    this.sprites.run1.sy += 128;

                if (this.mode == "lasers")
                    this.sprites.run1.sy += 229;

                this.sprites.run1.drawSprite(5, this.dy);

                this.sprites.run1.sy = 2;

                this.dWidth = 44;
                this.dHeight = 47;

                break;

            case "run2":
                if (this.mode == "immortal")
                    this.sprites.run2.sy += 128;

                if (this.mode == "lasers")
                    this.sprites.run2.sy += 229;

                this.sprites.run2.drawSprite(5, this.dy);

                this.sprites.run2.sy = 2;

                this.dWidth = 44;
                this.dHeight = 47;

                break;

            case "duck1":
                if (this.mode == "immortal")
                    this.sprites.duck1.sy += 128;

                if (this.mode == "lasers")
                    this.sprites.duck1.sy += 229;

                this.sprites.duck1.drawSprite(5, this.dy);

                this.sprites.duck1.sy = 36;

                this.dWidth = 60;
                this.dHeight = 30;

                break;

            case "duck2":
                if (this.mode == "immortal")
                    this.sprites.duck2.sy += 128;

                if (this.mode == "lasers")
                    this.sprites.duck2.sy += 229;

                this.sprites.duck2.drawSprite(5, this.dy);

                this.sprites.duck2.sy = 36;

                this.dWidth = 60;
                this.dHeight = 30;

                break;

            case "jump":
                if (this.mode == "immortal")
                    this.sprites.jump.sy += 128;

                if (this.mode == "lasers")
                    this.sprites.jump.sy += 229;

                this.sprites.jump.drawSprite(5, this.dy);

                this.sprites.jump.sy = 2;
                this.dWidth = 44;
                this.dHeight = 47;

                break;

            case "dead":
                this.sprites.dead_noback.drawSprite(5, this.dy);

                this.dWidth = 80;
                this.dHeight = 86;

                break;
        }
    }
}
