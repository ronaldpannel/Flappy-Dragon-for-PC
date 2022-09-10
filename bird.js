const dragonSprite = new Image()
dragonSprite.src = 'dragonSprite.png'

class Bird {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.color = "white";
    this.originalWidth = 941
    this.originalHeight = 680
    this.w = 50;
    this.h = 50;
    this.vy = 0;
    this.size = 33
    this.gravity = 0.3;
    this.frameX = 0
  }
  update() {
    let curve = Math.sin(angle) * 12;
    if (this.y >= canvas.height - this.h * 1.5 - curve) {
      this.y = canvas.height - this.h * 1.5- curve;
      this.vy = 0;
    } else {
      this.vy += this.gravity;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y <= 0 + this.h - curve) {
      this.y = 0 + this.h  - curve / 2;
      this.vy = 0;
    }
    if (spacePressed) {
      this.flap();
    }
  }
  flap() {
    this.y -= 15;
    if(this.frameX >= 3)this.frameX = 0
    else if(frame%4 === 0)this.frameX++
  }

  show() {
    ctx.fillStyle = this.color;
    ctx.beginPath()
      //ctx.arc(this.x + 25, this.y + 30, this.size -10,0, Math.PI * 2)
      ctx.fill()
    
    ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0,this.originalWidth, this.originalHeight, this.x -10, this.y, this.w * 1.3, this.h * 1.3 )
  }
}
