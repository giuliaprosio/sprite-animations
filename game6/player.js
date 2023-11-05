export class Player{
    constructor(game){
        this.game = game; 

        //this 2 lines for dynamic link
        //this.image = new Image(); 
        //this.image.src = "./images/player.png"; 

        //player - to be sure it's loaded link the img to html
        //how big is a frame? window.width/12
        this.width = 100;
        this.height = 91.3;  
        this.x = 0;
        this.y = this.game.height - this.height; 
        //taking image from html
        this.image = document.getElementById("player"); 
        this.frame = 0; 

    }
    update(input){
        if(input.includes('ArrowRight')) this.x++; 
        else if (input.includes('ArrowLeft')) this.x--; 
       
    }
    draw(context){
        context.fillStyle = "red"; 
        context.strokeRect(this.x, this.y, this.width, this.height); 
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height); 
    }
}