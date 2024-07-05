// var canvas = document.getElementById("tank");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// var c = canvas.getContext('2d');

// var mouse = {
//     x: undefined,
//     y: undefined
// };

// var backButtonBounds = {
//     x: 10,
//     y: 10,
//     width: 50,
//     height: 50,
// };
// var newsButtonBounds = {
//     x: 20,
//     y: 10,
//     width: 250,
//     height: 250,
// };
// var optionsButtonBounds = {
//     x: 420,
//     y: 3,
//     width: 100,
//     height: 100,
// };
// window.addEventListener('mousemove', function(event){
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

// var maxRadius = 70;
// var minRadius = 40;
// var colorArray = [
//     '#ffaa33',
//     '#99ffaaa',
//     '#00ff00',
//     '#4411aa',
//     '#ff1100',
// ];

// function Circle(x, y, dx, dy, radius, picSrc, picSrc2) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx; // Use the provided dx
//     this.dy = dy; // Use the provided dy
//     this.pic = new Image();
//     this.pic.src = picSrc;
//     this.pic2 = new Image();
//     this.pic2.src = picSrc2
//     this.picOriginal = picSrc; // Store the original image source
//     this.picMaxRadius = picSrc2; // Image of inverse
//     this.flipped = false;
//     this.radius = minRadius;
//     this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
//     console.log('Creating Circle with:', { picSrc, picSrc2 });
//     this.draw = function() {
//         c.drawImage(this.pic, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.fillStyle = this.color;
//         c.strokeStyle = 'transparent';
//         c.stroke();
//     }
//     this.update = function() {
//         if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
//             this.dx = -this.dx;
//             saveFishes();
//         }
//         if (this.y + this.radius > canvas.height || this.y - this.radius < 0){
//             this.dy = -this.dy;
//             saveFishes();
//         }
//         this.x += this.dx;
//         this.y += this.dy;

//         if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30){
//             if (this.radius < maxRadius){
//                 this.radius = maxRadius;
//                 this.pic.src = this.picMaxRadius;
//             }
//         } else if (this.radius > minRadius){
//             this.radius =minRadius;
//             this.pic.src = this.picOriginal;
//         }

//         this.draw();
//     }
// }

// var circleArray = [];
// function loadFishes() {
//     circleArray = [];
//     var savedFishes = localStorage.getItem('fishes');
//     if (savedFishes) {
//         JSON.parse(savedFishes).forEach(fish => {
//             var dx = (Math.random() - 0.5) * 3; // Randomize dx
//             var dy = (Math.random() - 0.5) * 4; // Randomize dy
//             var newFish = new Circle(fish.x, fish.y, fish.dx, fish.dy, fish.radius, fish.pic, fish.pic2);
//             circleArray.push(newFish);
//         });
//     }
//     saveFishes(); // Save the randomized speeds
// }

// function saveFishes() {
//     localStorage.setItem('fishes', JSON.stringify(circleArray.map(fish => ({
//         x: fish.x,
//         y: fish.y,
//         dx: fish.dx,
//         dy: fish.dy,
//         radius: fish.radius,
//         pic: fish.pic.src,
//         pic2: fish.pic2.src
//     }))));
// }

// var animationFrameId;

// function animate(){
//     animationFrameId = requestAnimationFrame(animate);
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     c.drawImage(base_image, 0, 0, canvas.width, canvas.height);
//     c.drawImage(back_button, backButtonBounds.x, backButtonBounds.y, backButtonBounds.width, backButtonBounds.height); // Draw the back button at the top left corner
//     c.drawImage(news_button, newsButtonBounds.x, newsButtonBounds.y, newsButtonBounds.width, newsButtonBounds.height);
//     c.drawImage(options_button, optionsButtonBounds.x, optionsButtonBounds.y, optionsButtonBounds.width, optionsButtonBounds.height)
//     for (var i = 0; i < circleArray.length; i++){
//         circleArray[i].update();
//     }
// }

// var back_button = new Image();
// back_button.src = 'back.png';
// var news_button = new Image();
// news_button.src = 'news.png';
// var options_button = new Image();
// options_button.src = 'options.png';
// var base_image = new Image();
// base_image.src = 'fishtankimage.png';
// base_image.onload = function(){
//     c.drawImage(base_image, 0, 0, canvas.width, canvas.height);
//     if (!animationFrameId) {
//         animate();
//     }
// };


// loadFishes();

// function loadMenu() {
//     continueAnimation = false;
//     new Promise(resolve => {
//         cancelAnimationFrame(animationFrameId);
//         animationFrameId = null; // Reset animationFrameId
//         setTimeout(resolve, 1000 / 60); // Wait for the next frame (~16.7ms)
//     }).then(() => {
//         // Clear the canvas
//         c.clearRect(0, 0, canvas.width, canvas.height);

//         // Remove all event listeners (optional but recommended)
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('click', handleClick);

//         // Load the main.js script
//         var script = document.createElement('script');
//         script.src = 'main.js';
//         document.body.appendChild(script);
//     });
// }

// function loadNews() {
//     continueAnimation = false;
//     new Promise(resolve => {
//         cancelAnimationFrame(animationFrameId);
//         animationFrameId = null; // Reset animationFrameId
//         setTimeout(resolve, 1000 / 60); // Wait for the next frame (~16.7ms)
//     }).then(() => {
//         // Clear the canvas
//         c.clearRect(0, 0, canvas.width, canvas.height);

//         // Remove all event listeners (optional but recommended)
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('click', handleClick);

//         // Load the news.js script
//         var script = document.createElement('script');
//         script.src = 'news.js';
//         document.body.appendChild(script);

//         document.getElementById('news-container').style.display = 'block'; // Show the news container
//         document.getElementById('back-to-canvas').style.display = 'block'; // Show the back button
//         document.getElementById('tank').style.display = 'none'; // Hide the canvas
//     });
// }

// function handleMouseMove(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// }

// function handleClick(event) {
//     if (event.x >= backButtonBounds.x && event.x <= backButtonBounds.x + backButtonBounds.width &&
//         event.y >= backButtonBounds.y && event.y <= backButtonBounds.y + backButtonBounds.height) {
//         loadMenu();
//     }
//     else if (event.x >= newsButtonBounds.x && event.x <= newsButtonBounds.x + newsButtonBounds.width &&
//         event.y >= newsButtonBounds.y && event.y <= newsButtonBounds.y + newsButtonBounds.height) {
//         loadNews();
//     }
//     else if (event.x >= optionsButtonBounds.x && event.x <= optionsButtonBounds.x + optionsButtonBounds.width &&
//         event.y >= optionsButtonBounds.y && event.y <= optionsButtonBounds.y + optionsButtonBounds.height) {
//         loadNews();
//     }
// }

// window.addEventListener('mousemove', handleMouseMove);
// window.addEventListener('click', handleClick);

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
    x: 90,
    y: 10,
    width: 90,
    height: 50,
};
var optionsButtonBounds = {
    x: 420,
    y: 3,
    width: 100,
    height: 100,
};

var darkOverlay = document.getElementById('dark-overlay');
var resumeButton = document.getElementById('resume_button');

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

function Circle(x, y, dx, dy, radius, picSrc, picSrc2) {
    this.x = x;
    this.y = y;
    this.dx = dx; // Use the provided dx
    this.dy = dy; // Use the provided dy
    this.pic = new Image();
    this.pic.src = picSrc;
    this.pic2 = new Image();
    this.pic2.src = picSrc2
    this.picOriginal = picSrc; // Store the original image source
    this.picMaxRadius = picSrc2; // Image of inverse
    this.flipped = false;
    this.radius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    console.log('Creating Circle with:', { picSrc, picSrc2 });
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

        if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y) < 30 && bigRadiusFlag == true){
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
            var newFish = new Circle(fish.x, fish.y, fish.dx, fish.dy, fish.radius, fish.pic, fish.pic2);
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
        pic: fish.pic.src,
        pic2: fish.pic2.src
    }))));
}

var animationFrameId;

function animate(){
    animationFrameId = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    c.drawImage(back_button, backButtonBounds.x, backButtonBounds.y, backButtonBounds.width, backButtonBounds.height); // Draw the back button at the top left corner
    c.drawImage(news_button, newsButtonBounds.x, newsButtonBounds.y, newsButtonBounds.width, newsButtonBounds.height);
    c.drawImage(options_button, optionsButtonBounds.x, optionsButtonBounds.y, optionsButtonBounds.width, optionsButtonBounds.height)
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
bigRadiusFlag = true;
var back_button = new Image();
back_button.src = 'back.png';
var news_button = new Image();
news_button.src = 'news.png';
var options_button = new Image();
options_button.src = 'options.png';
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
    else if (event.x >= optionsButtonBounds.x && event.x <= optionsButtonBounds.x + optionsButtonBounds.width &&
        event.y >= optionsButtonBounds.y && event.y <= optionsButtonBounds.y + optionsButtonBounds.height) {
        bigRadiusFlag = false;
        darkOverlay.style.display = 'block'; // Show the dark overlay
        showSliders();
    }
    else if (event.x >= newsButtonBounds.x && event.x <= newsButtonBounds.x + newsButtonBounds.width &&
        event.y >= newsButtonBounds.y && event.y <= newsButtonBounds.y + newsButtonBounds.height && bigRadiusFlag==true) {
        loadNews();
    }
}

var genres = ['Politics', 'Economy', 'Health', 'Science', 'Sports'];
var genreValues = [3, 4, -2, 5, 1]; // Example values for the sliders

function showSliders() {
    var sliderContainer = document.getElementById('slider-container');
    sliderContainer.innerHTML = ''; // Clear previous content

    genres.forEach((genre, index) => {
        var sliderLabelContainer = document.createElement('div');
        sliderLabelContainer.className = 'slider-label';

        var sliderLabel = document.createElement('span');
        sliderLabel.innerText = genre;

        var sliderValue = document.createElement('span');
        sliderValue.innerText = genreValues[index];

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.min = -10;
        slider.max = 10;
        slider.value = genreValues[index];
        slider.className = 'slider';
        slider.disabled = true;

        sliderLabelContainer.appendChild(sliderLabel);
        sliderLabelContainer.appendChild(sliderValue);

        sliderContainer.appendChild(sliderLabelContainer);
        sliderContainer.appendChild(slider);
    });

    sliderContainer.style.display = 'block';
}

function resumeAnimation() {
    darkOverlay.style.display = 'none'; // Hide the dark overlay
    setTimeout(() => {
        bigRadiusFlag = true; // Load the full article on click
      }, 200);

    // if (!animationFrameId) {
    //     animate();
    // }
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleClick);

// Handle the resume button click event
resumeButton.addEventListener('click', resumeAnimation);
