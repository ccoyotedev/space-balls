var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

// Rect
// ctx.fillRect(100, 100, 50, 100);
// ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
// ctx.fillRect(200, 75, 200, 100);

// Line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(2, 324);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// Arc / Circle

// pi / 180 radians = 1 degree
// 1 radian = 180 / pi degrees
// ctx.beginPath();
// ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
// ctx.arc(500, 500, 50, 0, Math.PI, false);
// ctx.arc(100, 500, 50, Math.PI * 2, Math.PI, true);
// ctx.stroke();

class Circle {
  constructor(x, y, radius) {
    this.radius = radius || Math.random() * 20;
    this.x = x || Math.random() * (c.width - this.radius * 2) + this.radius;
    this.y = y || Math.random() * (c.height - this.radius * 2) + this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  }
}

class SpaceBall extends Circle {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.space = true;
    this.dx = (Math.random() - 0.5) * 20;
    this.dy = ((Math.random() - 0.5) * 20);
    this.gravity = 1;
    this.friction = 0.95;
  }

  update() {
    if (this.y + this.dy >= c.height - this.radius|| this.y - this.radius <= 0 ) {
      if (this.space) {
        this.dy = -this.dy;
      } else {
        this.dy = -this.dy * this.friction;
        this.dx = this.dx * this.friction;
      }
    } else if (!this.space) {
      this.dy += this.gravity;
    }
    if (this.x >= c.width - this.radius || this.x - this.radius <= 0 ) {
      if (this.space) {
        this.dx = -this.dx;
      } else {
        this.dx = -this.dx * this.friction;
        this.dy = this.dy * this.friction
      }
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  toggleSpace() {
    this.space = !this.space;
  }
}

var ballArray = [];

for (var i = 0; i < 50; i++) {
  ballArray.push(new SpaceBall());
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, c.width, c.height);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

function toggleSpace() {
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].toggleSpace();
  }
}



function init() {
  animate();
}

init();