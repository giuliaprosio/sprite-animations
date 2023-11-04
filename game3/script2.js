/** @type {HTMLCanvasElement} */

//CANVAS2-----------------------------------------------------------------
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

CANVAS_WIDTH2 = canvas2.width = 500;
CANVAS_HEIGHT2 = canvas2.height = 1000;
const numberOfEnemies2 = 70;
const enemiesArray2 = []; 

const enemyImage2 = new Image(); 

//to slow down:
let gameFrame2 = 0; 

class Enemy2 {
    constructor() {
        this.image = new Image(), 
        this.image.src = './enemies/enemy2.png', 
        this.speed = Math.random() * 4 +1; //random number between -2 and 2
        this.spriteWidth = 265;
        this.spriteHigth = 185; 
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHigth/2.5;
        this.x = Math.random()*(canvas2.width - this.width);
        this.y = Math.random()*(canvas2.height - this.height); 
        this.frame = 0;  
        this.flapSpeed = Math.floor(Math.random() *3 +1);  //1 to 4
        this.angle = Math.random()*2; 
        this.angleSpeed = Math.random() * 0.2; 
        this.curve = Math.random()*4; 
    }
    update(){
        this.x -= this.speed; 
        this.y += this.curve * Math.sin(this.angle);
        this.angle += 0.05;  
        if(this.x + this.width < 0) this.x = canvas2.width; 
        //animate sprites
        if(gameFrame2 % this.flapSpeed === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame ++; 
        }
    }
    draw(){
        //nine parameters: 1 image, 4 crop-out size, 4 where on the canvas to place it 
        ctx2.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHigth, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}; 

for(let i=0; i<numberOfEnemies2; i++){
    enemiesArray2.push(new Enemy2()); 
}

console.log(enemiesArray2);

function animate2() {
    //creating a loop 
    //as a class so can do many objects 
    ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
    enemiesArray2.forEach(enemy => {
    
        enemy.update(); 
        enemy.draw(); 
       
    }); 
    gameFrame2++;
    requestAnimationFrame(animate2);
}

animate2(); 

