/** @type {HTMLCanvasElement} */

//CANVAS4-----------------------------------------------------------------
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

CANVAS_WIDTH4 = canvas4.width = 500;
CANVAS_HEIGHT4 = canvas4.height = 1000;
const numberOfEnemies4 = 20;
const enemiesArray4 = []; 

const enemyImage4 = new Image(); 

//to slow down:
let gameFrame4 = 0; 

class Enemy4 {
    constructor() {
        this.image = new Image();
        this.image.src = './enemies/enemy4.png'; 
        this.speed = Math.random() * 4 +1; //random number between -2 and 2
        this.spriteWidth = 213;
        this.spriteHigth = 205; 
        this.width = this.spriteWidth/2;
        this.height = this.spriteHigth/2;
        this.x = Math.random() * (canvas4.width - this.width);
        this.y = Math.random() * (canvas4.height - this.height);
        this.newX = Math.random() * (canvas4.width - this.width);
        this.newY = Math.random() * (canvas4.height - this.height);
        this.frame = 0;  
        this.flapSpeed = Math.floor(Math.random() *3 +1);  //1 to 4
        this.interval = Math.floor(Math.random() * 200 + 50); 
    }
    update(){
        if(gameFrame % this.interval === 0){
            this.newX = Math.random() * (canvas4.width - this.width);
            this.newY = Math.random() * (canvas4.height - this.height);
        }
        let dx = this.x - this.newX; 
        let dy = this.y - this.newY; 
        this.x -= dx/20; 
        this.y -= dy/20; 
        
        if(this.x + this.width < 0) this.x = canvas4.width; 
        //animate sprites
        if(gameFrame4 % this.flapSpeed === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame ++; 
        }
    }
    draw(){
        //nine parameters: 1 image, 4 crop-out size, 4 where on the canvas to place it 
        ctx4.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHigth, this.x, this.y, this.width, this.height);
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}; 

for(let i=0; i<numberOfEnemies4; i++){
    enemiesArray4.push(new Enemy4()); 
}

console.log(enemiesArray4);

function animate4() {
    //creating a loop 
    //as a class so can do many objects 
    ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4);
    enemiesArray4.forEach(enemy => {
    
        enemy.update(); 
        enemy.draw(); 
       
    }); 
    gameFrame4++;
    requestAnimationFrame(animate4);
}

animate4(); 

