/** @type {HTMLCanvasElement} */

//CANVAS 1------------------------------------------------------------
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = []; 

const enemyImage = new Image(); 

//to slow down:
let gameFrame = 0; 

class Enemy {
    constructor() {
        this.image = new Image(), 
        this.image.src = './enemies/enemy1.png', 
        //this.speed = Math.random() * 4 - 2; //random number between -2 and 2
        this.spriteWidth = 293;
        this.spriteHigth = 155; 
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHigth/2.5;
        this.x = Math.random()*(canvas.width - this.width);
        this.y = Math.random()*(canvas.height - this.height); 
        this.frame = 0;  
        this.flapSpeed = Math.floor(Math.random() *3 +1);  //1 to 4

    }
    update(){
        this.x += Math.random()* 15 - 7.5; 
        this.y += Math.random()* 10 -5; 
        //animate sprites
        if(gameFrame % this.flapSpeed === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame ++; 
        }
    }
    draw(){
        //nine parameters: 1 image, 4 crop-out size, 4 where on the canvas to place it 
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHigth, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}; 

for(let i=0; i<numberOfEnemies; i++){
    enemiesArray.push(new Enemy()); 
}

console.log(enemiesArray);

function animate() {
    //creating a loop 
    //as a class so can do many objects 
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
    
        enemy.update(); 
        enemy.draw(); 
       
    }); 
    gameFrame++;
    requestAnimationFrame(animate);
}

animate(); 

