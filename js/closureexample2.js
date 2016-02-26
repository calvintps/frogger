var baseObject = function ( obj, x, y, w, h) {
  obj.x = x || 0;
  obj.y = y || 0;

  //for this example all default sprites are bugs
  obj.sprite = 'images/enemy-bug1.png';
  obj.width = w || 0 ;
  obj.height = h || 0 ;
  obj.render = render;

  obj.update = function (dt){
    this.x += this.speed * dt * 10 ;
    if ( this.x >= 420 ) {
      this.x = -20;
    }
  };



  return obj;
};

var addSpeedVariable = function( obj, speed){
  obj.speed = speed;
  return obj;
};

var render = function(){
  //  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var addCollisionDetection = function (obj) {

  obj.checkPlayer = function(player){
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

  return obj;

};


var changeToPlayer = function (baseobj) {
  baseobj.x=200;
  baseobj.y=500;
  baseobj.sprite = 'images/char-boy1.png';
  baseobj.width = 67;
  baseobj.height = 76;

  baseobj.handleInput = function (input){
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

  };

  baseobj.restartPosition = function(){
    this.x = 200;
    this.y = 500;
  };
  return baseobj;
};

var playerUpdateOverloading = function (baseobj) {

  baseobj.update = function(dt){

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

  return baseobj;
};

var playeraddWinCondition = function (baseobj){
  baseobj.winCondition = function(){
    if (this.y <= 20) {
      alert('You win!');
      this.x = 200;
      this.y = 500;
    }
  };

  return baseobj;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = baseObject( {}, 40, 140, 100, 66);
addSpeedVariable(enemy1, 15);
addCollisionDetection(enemy1);

var enemy2 = baseObject( {}, 280, 200, 100, 66);
addSpeedVariable(enemy2, 35);
addCollisionDetection(enemy2);

var enemy3 = baseObject( {}, 0, 260, 100, 66);
addSpeedVariable(enemy3, 12);
addCollisionDetection(enemy3);

var enemy4 = baseObject( {}, 0, 400, 100, 66);
addSpeedVariable(enemy4, 4);
addCollisionDetection(enemy4);


var player = baseObject( {} );
changeToPlayer(player);
playerUpdateOverloading(player);
playeraddWinCondition(player);


var allEnemies = [
  enemy1,
  enemy2,
  enemy3,
  enemy4
];


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
