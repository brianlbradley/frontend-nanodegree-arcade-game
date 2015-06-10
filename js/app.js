// Enemies our player must avoid


var Enemy = function(x,y,v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.v = (Math.random() * 75) + 75;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.v * dt;
    if (this.x >= 505) {
        this.x= 0;
    }
checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.score = 0;

    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
    if(
        player.y - 10  <= 0) {


    console.log('You Won!');
    player.x = 200;
    player.y = 415;
    this.score += 5;

    }

    // Display Score
    ctx.clearRect(0, 0, 250, 43);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Score: " + this.score, 0, 35);
};

var checkCollision = function (bugs) {
    if(
    player.x <  bugs.x + 90
    && player.x + 75 > bugs.x
    && player.y < bugs.y + 50
    && player.y + 70 > bugs.y) {

    this.score -= 5;
    console.log('Game Over!');
    player.x = 200;
    player.y = 415;


    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
    //ctx.fillRect(200, 200, 100, 55); //squares are 100 wide and 80 high; 200 x and 465 y
   // ctx.clearRect(200,475,75, 75)




};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for  (var i = 0; i < 7; i++) {
  var player = new Player(200, 415);
  var enemy = new Enemy(0, Math.random() * 180+ 70);

  allEnemies.push(enemy);

};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x  >= 100)
        this.x -= 100;
    if(direction == 'up' && this.y + 10 >= 10)
        this.y -= 85;
    if(direction == 'right' && this.x + 10 < 405)
        this.x += 100;
    if(direction == 'down' && this.y + 85 < 485)
        this.y += 85;
}


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
