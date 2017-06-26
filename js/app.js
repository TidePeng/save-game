// + Set the maximum range of the X axis
var CANVAS_X_SCOPE = 600;

// Enemies our player must avoid
var Enemy = function() {
    
    // + Initialize object properties
    this.sprite = 'images/char-boy2.png';
    this.width = 101;
    this.height = 80;
    this.x = Math.floor(Math.random() * (-300));
    this.y = Math.floor(Math.random() * 3) * this.height + 140;

    // + Set the enemy's acceleration
    this.vx = 0;
    this.ax = 0;
//  this.ax = Math.floor((Math.random() * 10) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   
    // + Calculate the distance between the enemy and the player
    var xdiff = player.x - this.x;
    var ydiff = player.y - this.y;
    var dist = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);

    // +   : Updates the Enemy location
    if (this.x < CANVAS_X_SCOPE) {
        this.vx += this.ax;
        this.x += this.vx * dt;
    } else {
        this.vx = 0;
        this.ax = Math.floor((Math.random() * 10) + 1);
        this.x = Math.floor(Math.random() * (-300));
        this.y = Math.floor(Math.random() * 3) * this.height + 140;
    }

    // + Handles collision with the Player
    if (dist < 30) {
        player.x = Math.floor(Math.random() * 5) * this.width;
        player.y = 460;
        clearInterval(intervalID);
        alert('恭喜你，坚持了'+timer.value);
        timer.value = '';
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 0, 77, 101, 80, this.x, this.y, 101, 80);
};

// Now write your own player class
var Player = function() {
    
    // +   : Initialize object properties
    this.sprite = 'images/char-boy.jpg';
    this.width = 101;
    this.height = 80;
    this.x = Math.floor(Math.random() * 5) * this.width;
    this.y = 460;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 0, 60, 101, 80, this.x, this.y, 101, 80);
};

// +   : Receive user input
Player.prototype.handleInput = function(whichKey) {
    if (whichKey == 'up' && this.y >= 140) {
        this.y -= 80;
        if (this.y == 60) {
            this.x = this.x;
            this.y += 80;
        } else if (this.y == 300){
        		intervalID = setInterval(function(){
		        sec++;
		        if(sec==60){
		        	min++;
		        	sec = 0;
		        }
		        if(min==60){
		        	alert('恭喜你，已经成功挑战一小时了！');
		        	clearInterval(intervalID);
		        }
		        timer.value = min +':'+ sec;
		        
		    },1000);
        }
    } else if (whichKey == 'down' && this.y <= 380) {
        this.y += 80;
        if(this.y == 380){
        	this.y -= 80;        //can't down when in the game zone
        }
    } else if (whichKey == 'left' && this.x >= 101) {
        this.x -= 101;
    } else if (whichKey == 'right' && this.x <= 304) {
        this.x += 101;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var timer = document.querySelector('#timer');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');
var min = 0;
var sec = 0;



// Place the player object in a variable called player
var player = new Player();

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
reset.addEventListener('click',function(){
	if(intervalID){
		clearInterval(intervalID);
	}
	timer.value = '';
	player.x = Math.floor(Math.random() * 5) * this.width;
    player.y = 460;
    for(var i=0;i<allEnemies.length;i++){
		allEnemies[i].ax = 0;
		allEnemies[i].vx = 0;
		allEnemies[i].x = Math.floor(Math.random() * (-300));
        allEnemies[i].y = Math.floor(Math.random() * 3) * this.height + 140;
	}
});
start.addEventListener('click',function(){
	for(var i=0;i<allEnemies.length;i++){
		allEnemies[i].ax = Math.floor((Math.random() * 10) + 1)
	}
})
