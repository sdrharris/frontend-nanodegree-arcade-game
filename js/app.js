// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Properties
    this.x = x; // x pos
    this.y = y + 55; // y pos
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101; // Step property
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not  passed boundary
    if(this.x < this.boundary) { 
        // Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        // Reset pos to start
        this.x = this.resetPos;
    }
};

// Check for collision between player and enemies

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Hero class
class Hero {
    constructor() { // Constructor
        // Properties
        this.sprite = 'images/char-boy.png'; // Sprite image
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX; // x pos
        this.y = this.startY; // y pos
        this.victory = false;
    }

    // Reset Hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }
            
    // Render
    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handle keyboard input
    /**
     * Update hero's x and y property according to input
     * 
     * @param {string} input - Direction to travel
     */
    handleInput(input) {
        switch(input) { 
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
    // Update position
    update() {
        // Check collision here
        for(let enemy of allEnemies) {
            
            // Did player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }
        } 
        // Check win here?
            // Did player x and y reach final tile?
            if(this.y === 55) {
                this.victory = true;
            }
    }
}

// Now instantiate your objects.

// Place the player object in a variable called player
const player = new Hero(); // Instantiate New Hero Object
const bug1 = new Enemy(-101, 0, 200); // instantiate enemy object
const bug2 = new Enemy(-101, 83, 300); // instantiate enemy object
const bug3 = new Enemy((-101*2.5), 83, 300);
const bug4 = new Enemy(-101, 165, 350); // instantiate enemy object
const allEnemies = []; // Place all enemy objects in an array called allEnemies
allEnemies.push(bug1, bug2, bug3, bug4); // For each enemy create and push new Enemy object into above array
console.log(allEnemies); // Init allEnemies array


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
