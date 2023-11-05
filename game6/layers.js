export class Layer {
    constructor(image) {
        this.x = 0; //set x property on object created rn
        this.y = -100;
        this.width = 2400;
        this.height = 940;
        this.image = image; //parameter passed will be attribute
        //this.speedmModifier = Math.random()*0.3 ; //how fast
        //this.speed = gameSpeed * this.speedmModifier; //each layer has different speed linked to general
    }
    update(x) {

        this.x = -x -3; 

        if (this.x <= -this.width) {
            this.x = 0;
        }
 
    
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    }
}


