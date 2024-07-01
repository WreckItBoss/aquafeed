var canvas = document.getElementById("tank");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.fillStyle = 'rgba(255,0,0,0.5)'
c.fillRect(100,100, 100, 100);
c.fillStyle = 'rgba(0,255,0,0.5)'
c.fillRect(200,300, 100, 100);
c.fillRect(400,250, 100, 100);
console.log(canvas);


c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle ="green"
c.stroke();

c.beginPath();
c.arc(300, 300, 30,0, Math.PI*2,false);
c.strokeStyle = 'red';
c.stroke();