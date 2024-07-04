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

var maxRadius = 70;
var minRadius = 40;
var colorArray = [
    '#ffaa33',
    '#99ffaaa',
    '#00ff00',
    '#4411aa',
    '#ff1100',
];

function Circle(x, y, dx, dy, radius, picSrc) {
    this.x = x;
    this.y = y;
    this.dx = dx; // Use the provided dx
    this.dy = dy; // Use the provided dy
    this.pic = new Image();
    this.pic.src = picSrc;
    this.picOriginal = picSrc; // Store the original image source
    this.picMaxRadius = 'Fish3-1.png'; // Image for max radius
    this.flipped = false;
    this.radius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function() {
        c.drawImage(this.pic, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.strokeStyle = 'transparent';
        c.stroke();
    }
    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
            saveFishes();
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy = -this.dy;
            saveFishes();
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30){
            if (this.radius < maxRadius){
                this.radius = maxRadius;
                this.pic.src = this.picMaxRadius;
            }
        } else if (this.radius > minRadius){
            this.radius =minRadius;
            this.pic.src = this.picOriginal;
        }

        this.draw();
    }
}

var circleArray = [];
function loadFishes() {
    circleArray = [];
    var savedFishes = localStorage.getItem('fishes');
    if (savedFishes) {
        JSON.parse(savedFishes).forEach(fish => {
            var dx = (Math.random() - 0.5) * 3; // Randomize dx
            var dy = (Math.random() - 0.5) * 4; // Randomize dy
            var newFish = new Circle(fish.x, fish.y, fish.dx, fish.dy, fish.radius, fish.pic);
            circleArray.push(newFish);
        });
    }
    saveFishes(); // Save the randomized speeds
}

function saveFishes() {
    localStorage.setItem('fishes', JSON.stringify(circleArray.map(fish => ({
        x: fish.x,
        y: fish.y,
        dx: fish.dx,
        dy: fish.dy,
        radius: fish.radius,
        pic: fish.pic.src
    }))));
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
    if (!animationFrameId) {
        animate();
    }
};


loadFishes();

function loadMenu() {
    continueAnimation = false;
    new Promise(resolve => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null; // Reset animationFrameId
        setTimeout(resolve, 1000 / 60); // Wait for the next frame (~16.7ms)
    }).then(() => {
        // Clear the canvas
        c.clearRect(0, 0, canvas.width, canvas.height);

        // Remove all event listeners (optional but recommended)
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);

        // Load the main.js script
        var script = document.createElement('script');
        script.src = 'main.js';
        document.body.appendChild(script);
    });
}

function loadNews() {
    continueAnimation = false;
    new Promise(resolve => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null; // Reset animationFrameId
        setTimeout(resolve, 1000 / 60); // Wait for the next frame (~16.7ms)
    }).then(() => {
        // Clear the canvas
        c.clearRect(0, 0, canvas.width, canvas.height);

        // Remove all event listeners (optional but recommended)
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);

        // Load the news.js script
        var script = document.createElement('script');
        script.src = 'news.js';
        document.body.appendChild(script);

        document.getElementById('news-container').style.display = 'block'; // Show the news container
        document.getElementById('back-to-canvas').style.display = 'block'; // Show the back button
        document.getElementById('tank').style.display = 'none'; // Hide the canvas
    });
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
    else if (event.x >= newsButtonBounds.x && event.x <= newsButtonBounds.x + newsButtonBounds.width &&
        event.y >= newsButtonBounds.y && event.y <= newsButtonBounds.y + newsButtonBounds.height) {
        loadNews();
    }
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleClick);
