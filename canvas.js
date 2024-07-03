var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
const img = document.getElementById("fishtank");
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
var mouse = {
    x:undefined,
    y:undefined
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

var maxRadius = 60;
var minRadius = 10;
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
    // this.minRadius = Math.random()*3+1
    // this.radius = this.minRadius;
    this.radius = minRadius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)];
    this.draw = function(){
        c.drawImage(this.pic, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0, Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = 'transparent';
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

        if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y-this.y)<50){
            if(this.radius < maxRadius){
                this.radius +=1;
            }
        }else if(this.radius>minRadius){
            this.radius -=1;
        }

        this.draw();
    }
}
var circleArray = [];
// var circle = new Circle(200, 200,3, 3,30 );
for (var i=0; i<1; i++){
    pic = new Image();
    pic.src = 'Fish1.png';
    var radius = 30;
    var x = Math.random()*(canvas.width-radius*2)+radius;
    var y = Math.random()*(canvas.height-radius*2)+radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random()-0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius, pic));
} 
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    c.drawImage(base_image,0,0, canvas.width, canvas.height)
    for(var i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}

base_image = new Image();
base_image.src ='fishtankimage.png';
base_image.onload = function(){
        c.drawImage(base_image,0,0, canvas.width, canvas.height)
        animate();
}
// animate();