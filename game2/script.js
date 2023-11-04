//Parallax effect: foreground layer moves faster than background

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

//control scrolling speed: 
let gameSpeed = 5;
//let gameFrame = 0; 

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

window.addEventListener('load', function () {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function (e) {
        console.log(e.target.value);
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    //animation loop
    //image is 2400px, second image starts when first ends

    class Layer {
        constructor(image, speedmModifier) {
            this.x = 0; //set x property on object created rn
            this.y = 0;
            this.width = 2400;
            this.height = 700;
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

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        })

        //gameFrame--; 
        requestAnimationFrame(animate);

    };

    animate();
});


