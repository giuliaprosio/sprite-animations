const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

const div = document.getElementById('div'); 

const collisionCanvas = document.getElementById('collisionCanvas'); 
const collisionCtx = collisionCanvas.getContext('2d'); 
collisionCanvas.width = window.innerWidth; 
collisionCanvas.height = window.innerHeight;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './background1/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './background1/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './background1/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './background1/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './background1/layer-5.png';

let score = 0;
let gameOver = false; 
ctx.font = '50px Impact'; 

let timeToNextRaven = 10;
let ravenInterval = 600;
let lastTime = 0;

let ravens = []; 
class Raven {
    constructor(){
        this.spriteWidth = 271; 
        this.spriteHeight = 175; 
        this.sizeModifier = Math.random()*1.2 + 0.5;
        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier; 
        this.x = canvas.width; 
        this.y = Math.random()*(canvas.height -this.height); 
        this.directionX = Math.random()*5 +3;
        this.directionY = Math.random()*5 -2.5; 
        this.markedForDeletion = false; 
        this.image = new Image(); 
        this.image.src = './images/raven.png';
        this.frame = 0; 
        this.maxFrame = 4; 
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random()*50 + 50; 
        this.randomColors = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
        this.color = 'rgb('+this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltatime){
        if(this.y <= 0) console.log(this.y)
        if(this.y < 0 || this.y > canvas.height -this.height){
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
       
        if(this.x < 0 -this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime; 
        if(this.timeSinceFlap > this.flapInterval){
            if(this.frame > this.maxFrame) this.frame = 0; 
            else this.frame ++;
            this.timeSinceFlap = 0;
            particles.push(new Particle(this.x, this.y, this.width, this.color)); 
        }
        if(this.x < 0 - this.width) gameOver = true; 
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height); 
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 
    }
}

let explosions = []; 

class Explosion {
    constructor(x,y, size){ //where it happens
        this.image = new Image(); 
        this.image.src = './images/boom.png'; 
        this.sound = new Audio(); 
        this.sound.src = './sound-effects/boom.wav'; 
        this.spriteWidth = 200; 
        this.spriteHeight = 179; 
        this.size = size; 
        this.x = x;
        this.y = y; 
        this.frame = 0; 
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false; 
        
    }
    update(deltatime){
        if(this.frame === 0) this.sound.play(); 
        this.timeSinceLastFrame += deltatime; 
        if(this.timeSinceLastFrame > this.frameInterval){
            this.frame++; 
            this.timeSinceLastFrame = 0;
            if(this.frame > 5) this.markedForDeletion = true; 
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size);    
    }

}

let particles = []; 
let gameSpeed = 5; 
class Particle {
    constructor(x,y,size,color){
        this.size = size; 
        this.x = x + this.size/2; 
        this.y = y + this.size/3; 
        this.radius = Math.random() * this.size / 9; 
        this.maxRadius = Math.random()*20 + 35; 
        this.markedForDeletion = false;
        this.speedX = Math.random()*1 +0.8;
        this.color = color; 

    }
    update(){
        this.x += this.speedX; 
        this.radius += 0.5; 
        if(this.radius > this.maxRadius-5) this.markedForDeletion = true; 

    }
    draw(){
        ctx.save();
        ctx.globalAlpha = 1- (this.radius/this.maxRadius)*0.5; 
        ctx.beginPath(); 
        ctx.fillStyle = this.color;  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*4);
        ctx.fill();  
        ctx.restore();
    }
}

class Layer {
    constructor(image, speedmModifier) {
        this.x = 0; //set x property on object created rn
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = image; //parameter passed will be attribute
        this.speedmModifier = speedmModifier; //how fast
        this.speed = gameSpeed * this.speedmModifier; //each layer has different speed linked to general
    }
    update() {
        this.speed = gameSpeed * this.speedmModifier;

        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = this.x - this.speed;

        //this.x = gameFrame*this.speed % this.width; 
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    }
}

const layer1 = new Layer(backgroundLayer1, 1.5);
const layer2 = new Layer(backgroundLayer2, 0.5);
const layer3 = new Layer(backgroundLayer3, 0.8);
const layer4 = new Layer(backgroundLayer4, 0.6); //creates new object of class, calling its constructor 
//as it expects 2 parameters passed 
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];


function drawScore(){
    ctx.fillStyle = 'black'; 
    ctx.fillText('Score: '+ score, 50, 75); 
    ctx.fillStyle = 'white'; 
    ctx.fillText('Score: '+ score, 55, 80); 
}

function drawGameOver(){
    let endAudio = new Audio(); 
    endAudio.src = './sound-effects/end.wav'
    endAudio.play(); 
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black'; 
    ctx.fillText('GAME OVER, YOUR SCORE IS: '+ score, canvas.width/2, canvas.height/2); 

    ctx.fillStyle = 'white'; 
    ctx.fillText('GAME OVER, YOUR SCORE IS: '+ score, canvas.width/2 +5, canvas.height/2 +5); 

    let btn = div.appendChild(document.createElement("button"));
    btn.style.position = "absolute"; 
    btn.style.left = "50%";
    btn.style.top = "55%";
    btn.style.border = "3px solid black";
    btn.style.width = "80px";
    btn.style.fontWeight = "900";
    btn.innerText = "back to menu"; //to add button on click

    btn.setAttribute("onclick", "location.href='index.html'");
    //btn.onclick = "location.href='index.html'";
}

window.addEventListener('click', function(e){
   const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1); 
   console.log(detectPixelColor); 
   const pc = detectPixelColor.data;
   ravens.forEach(object => {
        if(object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
            //collision detected

            object.markedForDeletion = true; 
            score ++; 
            explosions.push(new Explosion(object.x, object.y, object.width));
            console.log(explosions);
        }
   })
})

 

function animate(timestamp){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    gameObjects.forEach(layer => {
        layer.update(); 
        layer.draw(); 
    }); 

    collisionCtx.clearRect(0,0,canvas.width, canvas.height); 
    let deltatime = timestamp - lastTime;
    lastTime = timestamp; 
    timeToNextRaven += deltatime;
    if(timeToNextRaven > ravenInterval){
        ravens.push(new Raven()); 
        timeToNextRaven = 0;
        ravens.sort(function(a,b){
            return a.width - b.width;
        }); 
    }; 
    //create a new array expanding ravens array
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(obj => obj.update(deltatime)); 
    [...particles, ...ravens, ...explosions].forEach(obj => obj.draw()); 
    ravens = ravens.filter(obj => !obj.markedForDeletion); 
    explosions = explosions.filter(obj => !obj.markedForDeletion); 
    particles = particles.filter(obj => !obj.markedForDeletion); 
    
    if(!gameOver) requestAnimationFrame(animate); 
    else drawGameOver(); 
        
    

}

animate(0); 