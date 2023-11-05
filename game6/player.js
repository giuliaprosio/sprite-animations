
export class Player{
    constructor(game){
        this.game = game; 
        this.width = 100;
        this.height = 91.3;  
        this.sizeModifier = 1.2;
        this.x = 0;
        this.y = this.game.height - this.height - 100;
        this.image = document.getElementById("player"); 
        this.flipped_image = document.getElementById("player_flipped"); 
        this.frame = 0; 
        //which position of the player
        this.sy = 0;
        this.mirroring = false; 
        this.roll = false; 
        this.jump = false; 
        this.groundX = 0;
        this.groundY = this.game.height - this.height;

    }
    update(input){
        if(this.y !== this.groundY){
            this.y = this.groundY;     
        }
        if(input.includes('ArrowRight')) {
            this.mirroring = false;
            this.x+=2; 
            if(this.frame < 6){
                this.frame++; 
                this.sy = 273.9;
            }else{
                this.frame = 0;
            }
            if(input.includes('ArrowDown')){
                this.x = this.x +4;
                this.sy = 547.8; 
            }
            if(input.includes('ArrowUp')){
                //animation per se
                this.frame = 0;
                this.jump = true;
                this.y -= 100;      
            }
        }
        else if (input.includes('ArrowLeft')){
            this.mirroring = true; 
            this.x -=2;
            if(this.frame > 0){
                this.frame--; 
                this.sy = 273.9;
            }else{
                this.frame = 5;
            }
            if(input.includes('ArrowDown')){
                this.x -= 4;
                this.sy = 547.8; 
            
            }
            if(input.includes('ArrowUp')){
                //animation per se
                this.frame = 0;
                this.jump = true;
                this.y -= 100;      
            }    
        }
        else if(input.includes('ArrowDown')){
            if(this.frame < 6){
                this.frame++; 
                this.sy = 547.8;
            }else{
                this.frame = 0;
            }
        }
        else if(input.includes('ArrowUp')){
            //animation per se
            this.jump = true;
            this.y -= 100;      
        }    
        else{
            this.sy = 0;

        }
       
    }
    draw(context){
        context.fillStyle = "red"; 
        context.strokeRect(this.x, this.y, this.width, this.height); 
        if(!this.mirroring){
            
                context.drawImage(this.image, this.frame*this.width, this.sy, this.width, this.height, this.x, this.y, this.width, this.height); 
            
        }
        else{
            context.drawImage(this.flipped_image, this.image.width - (this.frame+1)*this.width, this.sy, this.width, this.height, this.x, this.y, this.width, this.height); 
      
        }

    }

}


    
