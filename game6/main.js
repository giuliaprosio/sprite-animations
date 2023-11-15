import {Player} from './player.js'; 
import { InputHandler } from './inputHandler.js';
import { Layer } from './layers.js';
import { Raven } from './ravens.js';

let lastTime = 0; 

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1'); 
    const ctx = canvas.getContext('2d'); 
    canvas.width = 1400; 
    canvas.height = 700;

    //game session
    class Game {
        constructor(width, height){
            this.width = width; 
            this.height = height; 
            this.player = new Player(this);
            this.input= new InputHandler(); 
            
            this.back1 = new Layer(document.getElementById('background-1')); 
            this.back2 = new Layer(document.getElementById('background-2')); 
            this.back3 = new Layer(document.getElementById('background-3')); 
            this.back4 = new Layer(document.getElementById('background-4')); 
            this.back5 = new Layer(document.getElementById('background-5')); 

            this.ravens = []; 
            this.ravensTimer = 0;
            this.ravensInterval = 1000; 
            
        }
        update(deltatime){
            // this.input.keys = [];
       
            this.player.update(this.input.keys);
            this.back5.update(this.player.x); 
            this.back4.update(this.player.x); 
            this.back3.update(this.player.x); 
            this.back2.update(this.player.x);
            this.back1.update(this.player.x);
            if(this.ravensTimer > this.ravensInterval){
                this.addRaven(); 
                this.ravensTimer = 0; 
            }else{ 
                this.ravensTimer += deltatime; 
            }

            this.ravens.forEach(obj => {
                obj.update(deltatime); 
            });
            
        }
        draw(context){
            
            this.back1.draw(context); 
            this.back2.draw(context);
            this.back3.draw(context); 
            this.back4.draw(context);
            this.back5.draw(context);
            this.player.draw(context); 
            this.ravens.forEach( raven => {
                raven.draw(context); 
            });
            
        }

        addRaven(){

            this.ravens.push(new Raven(this)); 
            console.log(this.ravens);
            
        }
    }

    const game = new Game(canvas.width, canvas.height); 
    console.log(game); 
   

    function animate(timestamp){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        let deltatime = timestamp - lastTime; 
        lastTime = timestamp; 
        game.draw(ctx); 
        game.update(deltatime);
        requestAnimationFrame(animate); 
    }

    animate(0); 


});