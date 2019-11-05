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

var mouse = {
  x: 0,
  y: 0
}

var colors = [
  '#171A21',
  '#594E36',
  '#617073',
  '#8BBEB2',
  '#3A506B'
]

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener('mousemove',
  function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
  }
)

window.addEventListener('resize', 
  function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
)

window.addEventListener('click',
  function() {
    toggleSpace();
  }
)

class Circle {
  constructor(x, y, radius) {
    this.radius = radius;
    this.x = x || Math.random() * (c.width - this.radius * 2) + this.radius;
    this.y = y || Math.random() * (c.height - this.radius * 2) + this.radius;
    this.color = randomColor();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = backgroundColour === 'black' ? 'white' : this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class SpaceBall extends Circle {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.space = true;
    // v = velocity
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    // a = accelaration
    this.ax = 0;
    this.ay = 0;

    this.mass = Math.PI * Math.sqrt(this.radius);

    this.gravity = 1;
    this.friction = 0.95;

    this.radians = Math.PI * 2;
  }

  updatePositionVectors() {
    this.x += this.vx;
    this.y += this.vy;
  };
  
  updateVelocityVectors() {
    // a = accelaration
    this.vx += this.ax;
    this.vy += this.ay;
  }
  
  updateAccelerationVectors() {
    // d = distance
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;

    const distSq = dx * dx + dy * dy;
    const f =
    (25 * this.mass) /
    (distSq * Math.sqrt(distSq));

    this.ax = dx * f;
    this.ay = dy * f;
  }

  update() {
    // Bounce off walls
    if (this.y + this.radius + this.vy >= c.height || this.y - this.radius + this.vy <= 0 ) {
      if (this.space) {
        this.vy = -this.vy;
      } else {
        this.vy = -this.vy * this.friction;
        this.vx = this.vx * this.friction;
      }
    } else if (!this.space) {
      this.vy += this.gravity;
    }
    if (this.x + this.radius + this.vx >= c.width || this.x - this.radius + this.vx <= 0 ) {
      if (this.space) {
        this.vx = -this.vx;
      } else {
        this.vx = -this.vx * this.friction;
        this.vy = this.vy * this.friction
      }
    }



    // Interactivity
    this.circulate();
    

    this.draw();
  }

  circulate() {
    this.updatePositionVectors();
    if (this.space) {
      this.updateAccelerationVectors();
    }
    this.updateVelocityVectors();
  }

  toggleSpace() {
    this.space = !this.space;
    this.ax = 0;
    this.ay = 0;
  }
}

var backgroundColour = 'black'

function toggleSpace() {
  if (backgroundColour === 'white') {
    backgroundColour = 'black';
  } else {
    backgroundColour = 'white'
  }
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].toggleSpace();
  }
}

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = backgroundColour;
  ctx.fillRect(0, 0, c.width, c.height);
  // ctx.clearRect(0, 0, c.width, c.height);
  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

// Create Balls
var ballArray = [];

function init() {
  for (var i = 0; i < 100; i++) {
    ballArray.push(
      new SpaceBall(
        null,
        null,
        Math.random() * 20
      )
    );
  }
  animate()
}

init();

