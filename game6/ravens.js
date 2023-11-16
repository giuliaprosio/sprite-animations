

export class Raven {
    constructor(game){
        this.frameX = 0; 
        this.frameY = 0; 
        this.frameInterval = 8; 
        this.frameTimer = 0;

        this.game = game;

        this.spriteWidth = 271; 
        this.spriteHeight = 175; 
        this.sizeModifier = Math.random()*0.8 + 0.5;
        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier; 

        this.x = this.game.width;
        this.y = this.y = Math.random()*(this.game.height - this.height); ;
        this.speedX = 2; 
        this.speedY = 0;
        this.maxFrame = 5; 

        this.directionX = Math.random()*5 +3;
        this.directionY = Math.random()*9 -3.5; 

        this.image = document.getElementById('raven'); 

        this.timeSinceFlap = 0;
    }

    update(deltatime){
        if(this.y <= 0) console.log(this.y)
        if(this.y < 0 || this.y > this.game.height - this.height){
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
       
        if(this.x < 0 -this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime; 
       
        if(this.frameTimer >= this.frameInterval){
            this.frameTimer = 0; 
            if(this.frameX <= 4 ) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer ++; 
        }

    }

    draw(context){

        context.strokeRect(this.x, this.y, this.width, this.height); 
        context.drawImage(this.image, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 

    }
}