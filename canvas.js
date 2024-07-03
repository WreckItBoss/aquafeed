var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

var backButtonBounds = {
    x: 10,
    y: 10,
    width: 50,
    height: 50,
};
var newsButtonBounds = {
    x: 20,
    y: 10,
    width: 250,
    height: 250,
};
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// window.addEventListener('click', function(event){
//     if (event.x >= backButtonBounds.x && event.x <= backButtonBounds.x + backButtonBounds.width &&
//         event.y >= backButtonBounds.y && event.y <= backButtonBounds.y + backButtonBounds.height) {
//         loadMenu();
//     }
// });

var maxRadius = 60;
var minRadius = 30;
var colorArray = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100',
];

function Circle(x, y, dx, dy, radius, pic){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.pic = pic;
    this.flipped = false;
    this.radius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
        c.drawImage(this.pic, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.strokeStyle = 'transparent';
        c.stroke();
    }
    this.update = function(){
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
            if (this.radius < maxRadius){
                this.radius += 1;
            }
        } else if (this.radius > minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
for (var i = 0; i < 1; i++){
    var pic = new Image();
    pic.src = 'Fish1.png';
    var radius = 30;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius, pic));
} 

var animationFrameId;

function animate(){
    animationFrameId = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    c.drawImage(back_button, backButtonBounds.x, backButtonBounds.y, backButtonBounds.width, backButtonBounds.height); // Draw the back button at the top left corner
    c.drawImage(news_button, newsButtonBounds.x, newsButtonBounds.y, newsButtonBounds.width, newsButtonBounds.height);
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

var back_button = new Image();
back_button.src = 'back.png';
var news_button = new Image();
news_button.src = 'news.png';
var base_image = new Image();
base_image.src = 'fishtankimage.png';
base_image.onload = function(){
    c.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    animate();
};

function loadMenu() {
    // Clear the current animation loop
    cancelAnimationFrame(animationFrameId);

    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Remove all event listeners (optional but recommended)
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick);

    // Load the main.js script
    var script = document.createElement('script');
    script.src = 'main.js';
    document.body.appendChild(script);
}
function loadNews() {
    // Clear the current animation loop
    cancelAnimationFrame(animationFrameId);

    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Remove all event listeners (optional but recommended)
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick);

    // Load the main.js script
    var script = document.createElement('script');
    script.src = 'news.js';
    document.body.appendChild(script);
}

function handleMouseMove(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

function handleClick(event) {
    if (event.x >= backButtonBounds.x && event.x <= backButtonBounds.x + backButtonBounds.width &&
        event.y >= backButtonBounds.y && event.y <= backButtonBounds.y + backButtonBounds.height) {
        loadMenu();
    }
    if (event.x >= newsButtonBounds.x && event.x <= newsButtonBounds.x + newsButtonBounds.width &&
        event.y >= newsButtonBounds.y && event.y <= newsButtonBounds.y + newsButtonBounds.height) {
        loaNews();
    }
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleClick);
