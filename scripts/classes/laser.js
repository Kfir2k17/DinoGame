class Laser{
    constructor(){
        this.dx = dino.dx;
        this.dy = dino.dy + dino.dHeight / 2;
        this.dWidth = 5;
        this.dHeight = 2;
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.dx, this.dy);
        ctx.lineTo(this.dx + this.dWidth, this.dy);
        ctx.stroke();
        this.dx += 1;
    }
}