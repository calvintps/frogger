// Enemies our player must avoid
var Enemy = function( x, y ){
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  this.x = x || 0;
  this.y = y || 0;
  this.speed = 1;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug1.png';
  this.width = 100 ;
  this.height = 66 ;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x += this.speed * dt *10  ;

  if ( this.x >= 420 ) {
    this.x = -20;
  }
};

Enemy.prototype.initLocation = function( x, y ){
  this.x = x ;
  this.y = y ;
};

Enemy.prototype.moveSpeed = function(speed) {
  this.speed = speed;
};

Enemy.prototype.checkPlayer = function(player){
  //this objects variables
  var _xPosStart = this.x;
  var _xPosEnd = parseInt(this.x + this.width);
  var _yPosStart = this.y;
  var _yPosEnd = this.y + this.height;

  var _playerxPosStart = player.x;
  var _playerxPosEnd = parseInt(player.x + player.width);
  var _playeryPosStart = player.y;
  var _playeryPosEnd = player.y + player.height;


  if(
    _playerxPosStart < _xPosEnd &&
    _playerxPosEnd > _xPosStart &&
    _playeryPosStart < _yPosEnd &&
    _playeryPosEnd > _yPosEnd
  ){
    console.log('collision detected');
    player.restartPosition();
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y) {
  this.x = x || 200;
  this.y = y || 500;
  //console.log (this.x , x);
  this.moveX = 0;
  this.moveY = 0;

  this.sprite = 'images/char-boy1.png';
  this.width = 67;
  this.height = 76;
};

player.prototype.handleInput = function(input) {
  //console.log(input);
  this.moveX = 0;
  this.moveY = 0;

  //  console.log(this.x,this.y);
  switch (input) {
    case "up":
    this.moveY = -this.height;
    //console.log('up');
    break;

    case "down":
    this.moveY = this.height;
    break;

    case "left":
    this.moveX = -this.width;
    break;

    case "right":
    this.moveX = this.width;
    break;

    default:
    this.moveX = 0;
    this.moveY = 0;
    //console.log("Sorry, we are out of " + expr + ".");
  }
  //  console.log('output', this.moveX, this.moveY);
};

player.prototype.update = function(dt) {

  var startX = this.x;
  var finalX = this.x + this.moveX;
  var minX = -50;
  var maxX = 460;

  var startY = this.y;
  var finalY = this.y + this.moveY;
  var minY = -60;
  var maxY = 520;

  this.x = calculateBorder(startX,finalX,minX,maxX);
  this.y = calculateBorder(startY,finalY,minY,maxY);

  this.moveX = 0;
  this.moveY = 0;

  this.winCondition();

  function calculateBorder (startLocation, endLocation, minLimit, maxLimit) {
    //   console.log( startLocation, endLocation, minLimit, maxLimit);
    if ( endLocation >=   minLimit && endLocation <= maxLimit ){
      //   console.log(true);
      return endLocation;
    }
    return startLocation;
  }

};

player.prototype.render = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
  //console.log(this.x, this.y,this.moveX, this.moveY );
  ctx.drawImage(
    Resources.get(this.sprite),
    this.x,
    this.y,
    this.width,
    this.height
  );


};

player.prototype.winCondition = function(){

  if (this.y <= 20) {
    alert('You win!');

    this.x = 200;
    this.y = 500;
  }


};

player.prototype.restartPosition = function(){
  this.x = 200;
  this.y = 500;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(40, 140);
enemy1.moveSpeed(15);

var enemy2 = new Enemy(280, 200);
enemy2.moveSpeed(5);

var enemy3 = new Enemy(0, 260);
enemy3.moveSpeed(25);

var enemy4 = new Enemy(0, 260);
enemy4.moveSpeed(5);
var allEnemies = [
  enemy1,
  enemy2,
  enemy3,
  enemy4
];
var player = new player();


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
