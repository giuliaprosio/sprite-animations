/** @type {HTMLCanvasElement} */

//CANVAS3-----------------------------------------------------------------
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

CANVAS_WIDTH3 = canvas3.width = 500;
CANVAS_HEIGHT3 = canvas3.height = 1000;
const numberOfEnemies3 = 70;
const enemiesArray3 = []; 

const enemyImage3 = new Image(); 

//to slow down:
let gameFrame3 = 0; 

class Enemy3 {
    constructor() {
        this.image = new Image();
        this.image.src = './enemies/enemy3.png'; 
        this.speed = Math.random() * 4 +1; //random number between -2 and 2
        this.spriteWidth = 218;
        this.spriteHigth = 177; 
        this.width = this.spriteWidth/2;
        this.height = this.spriteHigth/2;
        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height) + 5; 
        this.frame = 0;  
        this.flapSpeed = Math.floor(Math.random() *3 +1);  //1 to 4
        this.angle = Math.random()*500; 
        this.angleSpeed = Math.random() * 0.5 + 0.5; 
        this.curve = Math.random()*200 +50;
    }
    update(){
        this.x = this.curve * Math.sin(this.angle*Math.PI/90) + (canvas3.width/2 - this.width/2); 
        this.y = this.curve * Math.cos(this.angle * Math.PI/360) + (canvas3.height/2 - this.height);
        this.angle += this.angleSpeed;  
        if(this.x + this.width < 0) this.x = canvas3.width; 
        //animate sprites
        if(gameFrame3 % this.flapSpeed === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame ++; 
        }
    }
    draw(){
        //nine parameters: 1 image, 4 crop-out size, 4 where on the canvas to place it 
        ctx3.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHigth, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}; 

for(let i=0; i<numberOfEnemies3; i++){
    enemiesArray3.push(new Enemy3()); 
}

console.log(enemiesArray3);

function animate3() {
    //creating a loop 
    //as a class so can do many objects 
    ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3);
    enemiesArray3.forEach(enemy => {
    
        enemy.update(); 
        enemy.draw(); 
       
    }); 
    gameFrame3++;
    requestAnimationFrame(animate3);
}

animate3(); 

