function processEvent(event) { // handling key pressing
    switch (event.keyCode) {
        case 32: //רווח 
        case 38: //מקש למעלה
            sounds.jump.play();

            if (dino.state == "start" || dino.state == "dead") start();
            if (dino.state != "jump") {
                jump_size = 1.7;
                dino.spr = "jump";
                dino.state = "jump";

                jumpInterval = setInterval(jump, 0.01);
            }
            break;

        case 40: //מקש למטה
            if (!ducking && dino.state != "jump") {
                dino.state = "duck";
                dino.spr = "duck1";
                dino.dy = 117;
                ducking = true;
            }
            break;

        case 75://k
            if (dino.mode == "lasers") {
                laser = new Laser();
                sounds.shoot.play();
            }
            break;

    }
}

//Background functions
function start() { // starting the game
    gameEnded = false;

    dino.state = "run";
    dino.spr = "run1";

    score = 0;

    dino.dy = 100;

    clearInterval(deathInterval);

    scoreInterval = setInterval(score_dino_move, 125);
    groundInterval = setInterval(groundMove, 0.05);
    enemyInterval = setInterval(entityCreate, 2000);

    laser = null;
    power = null;
    enemies = [];

    document.getElementById("header").style.opacity = 0;
    document.getElementById("instructions").style.display = "none";

    //zooming into the canvas
    element.style.paddingTop = "50px";
    element.style.transform = 'scale(3.2) translateY(0px)';
    element.style.transition = 'transform 250ms cubic-bezier(0.4, 0, 1, 1) 400ms';

}

function score_dino_move() { // handling the score and the "moving" of the dino
    score++;

    if (score > highScore)
        highScore = score;

    switch (dino.state) {
        case "run":
            if (dino.spr == "run1")
                dino.spr = "run2";

            else
                dino.spr = "run1";
            break;

        case "duck":
            if (dino.spr == "duck1")
                dino.spr = "duck2";

            else
                dino.spr = "duck1";
            break;
    }

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i] instanceof Bird) {
            if (enemies[i].status == "fly2"){
                enemies[i].dy += 6;
                enemies[i].status = "fly1";
            }

            else{
                enemies[i].dy -= 6;
                enemies[i].status = "fly2";
            }
        }
    }
}

function groundMove() { // handling ground movement and calling of the main function (frame())
    if (ground.sx == 1802)
        ground.sx = 2;

    frame();

    ground.sx += 2;
}

function checkCollision(entity1, entity2) { // function that returns if two entities are colliding
    var grace = 0;

    if (entity1 instanceof Dino) grace = entity1.dWidth / 2;

    return (entity1.dx + entity1.dWidth - grace >= entity2.dx && // dino right collides with this left
        entity2.dx + entity2.dWidth - grace >= entity1.dx && // enemy right collides with dino left
        entity1.dy + entity1.dHeight - grace >= entity2.dy && // dino bottom collides with this top
        entity2.dy + entity2.dHeight - grace >= entity1.dy// dino top collides with this bottom
    );
}

function powerExpire() { // expires the power after 5 seconds
    if (dino.mode == "lasers")
        sounds.laser_off.play();
    dino.mode = "normal";
}


function frame() { // game handler
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ground.drawSprite();

    //Check Powers
    if (power != null) {
        if (power.dx <= -power.dWidth)
            power = null;
        else {
            if (checkCollision(dino, power)) {
                dino.mode = power.ability;

                if (dino.mode == "immortal")
                    sounds.immortal.play();

                if (dino.mode == "lasers")
                    sounds.laser_on.play();

                expire = setTimeout(powerExpire, 5000);
                power = null;
            }
            else {
                power.drawSprite();
            }
        }
    }

    //Check Clouds
    if (cloud != null) {
        cloud.drawSprite();

        if (cloud.dx <= -cloud.dWidth)
            cloud = null;
    }

    //Check enemies
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];

        if (dino.mode != "immortal" && checkCollision(dino, enemy))
            gameOver();

        if (enemy.dx <= -enemy.dWidth)
            enemies.shift();
        else
            enemy.draw();

        if (laser != null && checkCollision(enemy, laser)) {
            sounds.explode.play();
            enemies.splice(i, 1);
            laser = null;
            score += 100;
        }
    }

    // Laser check

    if (laser != null) {
        laser.draw();

        if (laser.dx == -5)
            laser = null;
    }


    dino.draw(dino.dy);

    var x = 530;

    scoreDraw(score, x);
    scoreDraw(highScore, x - 70);

    sprites.hi.drawSprite(x - 95, 25);
};

function scoreDraw(score, x) { // handling score drawing
    var scoreString = score.toString().padStart(5, '0');

    for (var index in scoreString) {
        var c = parseInt(scoreString[index]);

        sprites.digits[c].drawSprite(x, 25);

        x += 10;
    }
}

function gameOver() { // ending the game
    clearInterval(groundInterval);
    clearInterval(scoreInterval);
    clearInterval(jumpInterval);
    clearInterval(enemyInterval);

    if (dino.state == "duck")
        dino.dy = 100;

    dino.spr = "dead";
    dino.state = "dead";
    dino.mode = "normal";


    sounds.game_over.volume = 0.4;
    sounds.game_over.play();

    gameEnded = true;

    sprites.gameOver.drawSprite(300 - sprites.gameOver.dWidth / 2, 55);

    deathInterval = setInterval(drawRestart, 100);
}

function drawRestart() { // drawing the restart button after the game is over
    ctx.clearRect(282, 100, 36, 32);

    var sprite = sprites.restart[death_counter - 1];

    sprite.drawSprite(282, 100);
    death_counter++;

    if (death_counter == 6) {
        death_counter = 1;
        clearInterval(deathInterval);
    }
}

//Dino functions

function jump() { // handling the jumping of the dino
    if (jump_size <= 0 && jump_up) {
        jump_up = false;
    }

    if (jump_up) {
        dino.dy -= jump_size;
        jump_size -= 0.02;
    }

    if (!jump_up) {
        dino.dy += jump_size;
        jump_size += 0.02;
    }

    if (!jump_up && dino.dy >= 100) {
        jump_size = 1.7;
        jump_up = true;
        dino.spr = "run1";
        dino.state = "run";
        clearInterval(jumpInterval);
    }
}

//Enemy Management
function entityCreate(i) { // handling the creation of entities
    var odds = Math.floor(Math.random() * 9) + 1;

    if (i != null) odds = i;

    switch (odds) {
        case 1:
            enemies.push(new Bird());
            break;
        case 2:
            enemies.push(new Cactus(850, 102, 100));  //dWidth = 51, dHeight = 50
            break;
        case 3:
            enemies.push(new Cactus(802, 48, 100));  //dWidth = 44, dHeight = 50
            break;
        case 4:
            enemies.push(new Cactus(702, 100, 100));  //dWidth = 50, dHeight = 50
            break;

        case 5:
            enemies.push(new Cactus(652, 50, 100));  //dWidth = 25, dHeight = 50
            break;
        case 6:
            enemies.push(new Cactus(548, 102, 70));  //dWidth = 51, dHeight = 35
            break;
        case 7:
            enemies.push(new Cactus(446, 102, 70));  //dWidth = 51, dHeight = 35
            break;

    }

    var odds2 = Math.floor(Math.random() * 2);

    if (odds2 == 0 && odds > 7)
        power = new Power();

    cloud = new Cloud();
}