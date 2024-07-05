// main.js
var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var startButtonBounds = {
    x: 100,
    y: 250,
    width: 400,
    height: 400,
};

// Function to draw the main menu
function drawMainMenu() {
    // console.log("Hello")
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "lightblue";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = "black";
    c.font = "48px sans-serif";
    c.fillText("AquaFeed", canvas.width / 2 - 100, canvas.height / 2 - 24);
    var start_button = new Image();
    start_button.src = 'playbutton.png';
    start_button.onload = function(){
        c.drawImage(start_button, startButtonBounds.x, startButtonBounds.y, startButtonBounds.width, startButtonBounds.height); // Draw the back button at the top left corner
    };

    // You can add more menu items and buttons here
}
function loadMenu() {
    // Clear the current animation loop

    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Remove all event listeners (optional but recommended)
    window.removeEventListener('click', handleClick);

    // Load the main.js script
    var script = document.createElement('script');
    script.src = 'canvas.js';
    document.body.appendChild(script);
}

function handleClick(event) {
    if (event.x >= startButtonBounds.x && event.x <= startButtonBounds.x + startButtonBounds.width &&
        event.y >= startButtonBounds.y && event.y <= startButtonBounds.y + startButtonBounds.height) {
        loadMenu();
    }
}


window.addEventListener('click', handleClick);

// Draw the main menu when the script is loaded
drawMainMenu();
