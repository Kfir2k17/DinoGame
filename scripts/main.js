//Intervals and globalvars
var score = 0;
var highScore = 0;

var scoreInterval;
var groundInterval;
var jumpInterval;
var enemyInterval;
var deathInterval;

var jump_up = true;
var jump_size = 1.7;

var enemies = [];

var power;
var laser;
var cloud;

var sounds = { // Audios which are in use in the project
    jump: document.getElementById("jump"),
    game_over: document.getElementById("game_over"),
    shoot: document.getElementById("shoot"),
    explode: document.getElementById("explode"),
    immortal: document.getElementById("immortal"),
    laser_on: document.getElementById("laser_on"),
    laser_off: document.getElementById("laser_off")
}

var ducking = false;

var gameEnded = false;

var element = null;

var expire;

var death_counter = 1;

//Sprite
var sprite = new Image();
var dino = null, ground = null, sprites = null, canvas = null, ctx = null;

sprite.src = "assets/sprite-sheet.png";

sprite.onload = function () {
    element = document.getElementById("game");
    canvas = document.getElementById("game_canvas");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    //Dictionary
    ground = new Ground();
    dino = new Dino();

    sprites = {
        gameOver: new Sprite(1294, 29, 381, 21),
        digits: [ 
            new Sprite(1294, 2, 18, 21),
            new Sprite(1316, 2, 16, 21),
            new Sprite(1334, 2, 18, 21),
            new Sprite(1354, 2, 18, 21),
            new Sprite(1374, 2, 18, 21),
            new Sprite(1394, 2, 18, 21),
            new Sprite(1414, 2, 18, 21),
            new Sprite(1434, 2, 18, 21),
            new Sprite(1454, 2, 18, 21),
            new Sprite(1474, 2, 18, 21),
        ],
        hi: new Sprite(1494, 2, 38, 21),
        restart: [
            new Sprite(218, 130, 72, 64), //dWidth 36, dHeight 32
            new Sprite(290, 130, 72, 64),
            new Sprite(362, 130, 72, 64),
            new Sprite(434, 130, 72, 64),
            new Sprite(506, 130, 72, 64)
        ]
    };

    //Event handler
    document.addEventListener("keydown", processEvent); // Operating keys
    document.addEventListener("keyup", function (event) { // Operating the end of the ducking process (releasing the Down Arrow key)
        if (event.code == "ArrowDown" && dino.state != 'jump') {
            dino.dy = 100; 
            dino.spr = "run1"; 
            dino.state = "run"; 
            ducking = false;
        }
    });

    document.addEventListener("click", function(e) { // handling clicking on the screen to restart
        if (gameEnded) {
            start();
        }
    });

    dino.draw();
}
