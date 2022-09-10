const dragonBreath = new Image();
dragonBreath.src = "ballLightning.png";

let fireParticle;
let fireParticles = [];

class FireParticle {
  constructor() {
    this.x = bird.x + 50;
    this.y = bird.y;
    this.color = "hsl(24, 100%, 50%)";
    this.size = 15;
    this.spreadY = Math.random() * 0.5 + -0.5;
    this.vel = gameSpeed * 6 ;
  }
  update() {
    this.x += this.vel;
    // this.y += this.spreadY;
  }
  show() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // ctx.arc(this.x + 7, this.y + 32, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(
      dragonBreath,
      this.x - 20,
      this.y,
      this.size * 4,
      this.size * 4
    );
  }
}

function handleFireParticles() {
  for (let i = 0; i < fireParticles.length; i++) {
    fireParticles[i].update();
    fireParticles[i].show();
    if (fireParticles[i].x > canvas.width - 50) {
      fireParticles.splice(i, 1);
    }
  }
}

let distance;
function fireParticleCollision() {
  for (let i = 0; i < fireParticles.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      let dx = fireParticles[i].x - enemies[j].x;
      let dy = fireParticles[i].y - enemies[j].y;
      distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < fireParticles[i].size + enemies[j].size) {
        fireParticles.splice(i, 1);
        enemies.splice(j, 1);
        score += 10;
      }
    }
  }
}
