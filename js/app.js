// Enemies our player must avoid
//The main Enemy object
var Enemy = function(x,y,v) {
    // Variables applied to each of our instances,
    // The image/sprite for our enemies, this uses
    // a helper is provided to easily load images

    this.x = x;
    this.y = y;
    this.v = (Math.random() * 75) + 75;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // Multiplies any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.v * dt;
    if (this.x >= 505) {
        this.x= 0;
    }
   this.checkCollision();

};
//checks Collision between player and enemy bugs
Enemy.prototype.checkCollision = function() {
    if (player.x <  this.x + 90 &&
        player.x + 75 > this.x &&
        player.y < this.y + 50 &&
        player.y + 70 > this.y) {

    player.resetPosition();
    player.score -= 5;
    player.x = 200;
    player.y = 415;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The main Player Object
var Player = function(x,y,v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};
//Function used to reset player in Player.prototype
// and Enemy.prototype.checkCollision functions
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 415;
};
//Check to see if player reaches water; reset and score.
Player.prototype.update = function() {
    if (
     this.y - 10  <= 0) {

     this.resetPosition();
     this.score += 5;
    }

    // Display Score
     ctx.clearRect(0, 0, 250, 43);
     ctx.fillStyle = 'black';
     ctx.font = '30px Arial';
     ctx.fillText("Score: " + this.score, 0, 35);
};

Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 415);

Player.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x  >= 100)
        this.x -= 100;
    if (direction == 'up' && this.y + 10 >= 10)
        this.y -= 85;
    if (direction == 'right' && this.x + 10 < 405)
        this.x += 100;
    if (direction == 'down' && this.y + 85 < 485)
        this.y += 85;
};

var allEnemies = [];
    for (var i = 0; i < 5; i++) {
     var enemy = new Enemy(0, Math.random() * 180+ 70);
     allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
     var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
};

    player.handleInput(allowedKeys[e.keyCode]);
});
