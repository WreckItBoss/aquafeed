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
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0, Math.PI*2,false);
        c.strokeStyle = 'red';
        c.stroke();
    }
    this.update = function(){
        if (this.x+ this.radius> canvas.width || this.x -this.radius <0){
            this.dx= -this.dx;
        }
        if(this.y+this.radius > canvas.height || this.y-this.radius<0){
            this.dy = -this.dy;
        }
        this.x +=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}
var circle = new Circle(200, 200,3, 3,30 );

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    circle.update();
    
}

animate();