var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// c.fillStyle = 'rgba(255,0,0,0.5)'
// c.fillRect(100,100, 100, 100);
// c.fillStyle = 'rgba(0,255,0,0.5)'
// c.fillRect(200,300, 100, 100);
// c.fillRect(400,250, 100, 100);
// console.log(canvas);


// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle ="green"
// c.stroke();


// for(var i = 0; i<3; i++){
//     var x = Math.random()* window.innerWidth;
//     var y = Math.random()*window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30,0, Math.PI*2,false);
//     c.strokeStyle = 'red';
//     c.stroke();
// }
function Circle(x, y){
    this.x = x;
    this.y = y;

    this.draw = function(){
        
        c.beginPath();
        c.arc(x, y, radius,0, Math.PI*2,false);
        c.strokeStyle = 'red';
        c.stroke();
    }
}
var circle = new Circle(200, 200);


var x = Math.random() * canvas.width;
var y = Math.random()*canvas.height;
var dx = (Math.random() - 0.5)*5;
var dy = (Math.random() - 0.5)*5;
var radius = 30
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    circle.draw();
    if (x+ radius> canvas.width || x -radius <0){
        dx= -dx;
    }
    if(y+radius > canvas.height || y-radius<0){
        dy = -dy;
    }
    x +=dx;
    y+=dy;
}

animate();