// Enemies our player must avoid


var Enemy = function(x,y,v) {

    this.x = x;
    this.y = y;
    this.v = (Math.random() * 75) + 75;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

    this.x += this.v * dt;
    if (this.x >= 505) {
        this.x= 0;
    }
   this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y,v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

 Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 415;
};

Player.prototype.update = function() {
  if (this.y - 10  <= 0) {
     this.resetPosition();
     this.score += 5;
    }

    // Display Score
    ctx.clearRect(0, 0, 250, 43);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Score: " + this.score, 0, 35);
};

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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);

};

var allEnemies = [];
for  (var i = 0; i < 6; i++) {
  var player = new Player(200, 415);
  var enemy = new Enemy(0, Math.random() * 180+ 70);

  allEnemies.push(enemy);
}

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x  >= 100)
        this.x -= 100;
    if(direction == 'up' && this.y + 10 >= 10)
        this.y -= 85;
    if(direction == 'right' && this.x + 10 < 405)
        this.x += 100;
    if(direction == 'down' && this.y + 85 < 485)
        this.y += 85;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
