function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};


var keyFrames = function() {

};

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.reset = function() {
    this.x = parseInt(getRandomArbitrary(-150, -100).toFixed(0));
    this.speed = parseInt(getRandomArbitrary(150, 250).toFixed(0));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 550) {

        this.x = this.x + (this.speed * dt);
    } else {
        this.reset();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.score = 0;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){

};

// Initial values var player = new Player(0, 380, 3)
Player.prototype.hitEnemy = function() {
        this.x = 0;
        this.y = 380;
        this.lives--;
        $('#lives').text(this.lives);

        if(this.lives === 0) {
            formatGameOver();
        };
};

Player.prototype.addScore = function(score) {
    this.score += score;
    $('#score').text(this.score);

    if (this.score % 1000 === 0) {
        nextLevel();
    }
};

Player.prototype.handleInput = function(pressedKey) {
    if(this.lives === 0) {
        gameOver();
    };

    switch(pressedKey) {
        case("left"):
            if (this.x >= 101) {
                this.x -= 101;
            };
            break;

        case ("right"):
            if (this.x <= 303) {
                this.x += 101;
            };
            break;

        case ("up"):
            if (this.y <= 380 && this.y > 48) {
                this.y -= 83;
            } else if (this.y = 48) {
                this.addScore(100);
                this.y = 380;
            };
            break;

        case("down"):
            if (this.y < 380) {
                this.y += 83;
            };
            break;
    };
    console.log(this.x, this.y);
};

// Makes the game more difficult
function nextLevel() {

};

function formatGameOver() {
    var HTMLgameOver = '<h2 id="game-over">%data%</h2>';

    var formattedGameOver = HTMLgameOver.replace('%data%', 'Game Over');

    $(formattedGameOver).insertBefore('#game-panel h1');
    //$('#game-panel h1').remove();
};

// Reload the page for a new game
function gameOver() {
    window.setTimeout(function() {
        location.reload();
    },
    300);
};

var Rock = function(y) {
    this.x = Math.floor((Math.random()*5))*101;
    this.y = y;
    this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var en1 = new Enemy(48); //48
var en2 = new Enemy(131); //131
var en3 = new Enemy(214); //214

var player = new Player(0, 380);

var allEnemies = [en1, en2, en3];

allEnemies.forEach(function(enemy, i) {
    enemy.reset();

    console.log("Enemy " + (i + 1) + " Start Point: " + enemy.x + " / Speed: "
        + enemy.speed);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
