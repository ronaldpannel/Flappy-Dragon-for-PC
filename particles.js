
let particle;
let particles = [];

class Particle {
  constructor() {
    this.x = bird.x;
    this.y = bird.y +20; 
    this.color =  "hsla(" + hue + ", 50%, 50%, 59";          
    this.size = Math.random() * 5 + 2
    this.spreadY = Math.random() * 0.5 + -0.5
  }
  update() {
   this.x -= gameSpeed * 3  
      this.y += this.spreadY;
  }
  show() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath()
  }
}

function handleParticles(){
  
  particles.push(new Particle()) 
  for(let i = 0; i < particles.length; i++){
    particles[i].update()
    particles[i].show()
    if (particles.length > 50){
      particles.splice(i, 1)
    }
  }
}

