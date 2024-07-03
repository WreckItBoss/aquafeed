// main.js
var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Function to draw the main menu
function drawMainMenu() {
    console.log("Hello")
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "lightblue";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = "black";
    c.font = "48px sans-serif";
    c.fillText("Main Menu", canvas.width / 2 - 100, canvas.height / 2 - 24);

    // You can add more menu items and buttons here
}

// Draw the main menu when the script is loaded
drawMainMenu();
