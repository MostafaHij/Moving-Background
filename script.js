const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;

const slider = document.getElementById('slider');
const showGameSpeed = document.getElementById('showGameSpeed');

slider.value = gameSpeed;
showGameSpeed.innerHTML = gameSpeed;

// changing slider value to change game speed
slider.addEventListener('change', e => {
    gameSpeed = e.target.value;
    slider.value = gameSpeed;
    showGameSpeed.innerHTML = gameSpeed;
});

// background layers
const bck_Layer1 = new Image();
bck_Layer1.src = 'images/layer-1.png';

const bck_Layer2 = new Image();
bck_Layer2.src = 'images/layer-2.png';

const bck_Layer3 = new Image();
bck_Layer3.src = 'images/layer-3.png';

const bck_Layer4 = new Image();
bck_Layer4.src = 'images/layer-4.png';

const bck_Layer5 = new Image();
bck_Layer5.src = 'images/layer-5.png';


class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400; // width of each bck layer
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier; // speed of bck layer
        this.speed = gameSpeed * this.speedModifier; // speed of bck layer depends with game speed
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.width) { // if bck layer comes to end ( - width of layer)
            this.x = 0; // return layer to 0 X position
        }
        this.x = Math.floor(this.x - this.speed); // decreasing x position (to move to right) depend on game speed
    }

    draw() {
        // drawing two layers for each backlayer (one close to another)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

// Creating 5 Layers With Different Speeds
const layer1 = new Layer(bck_Layer1, 0.2);
const layer2 = new Layer(bck_Layer2, 0.4);
const layer3 = new Layer(bck_Layer3, 0.6);
const layer4 = new Layer(bck_Layer4, 0.8);
const layer5 = new Layer(bck_Layer5, 1);

const layersArr = [layer1, layer2, layer3, layer4, layer5];

// Animation loop to draw and update layers position
function animate() {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < layersArr.length; i++) {
        layersArr[i].update();
        layersArr[i].draw();
    }
    requestAnimationFrame(animate);

}
animate();
