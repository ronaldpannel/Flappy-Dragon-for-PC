const flyingEye = new Image();
flyingEye.src = "oneEyeFlyer.png";

let enemy;
class Enemy {
  constructor() {
    this.x = canvas.width;
    this.y = (Math.random() * canvas.height) - 50;
    this.size = 50;
    this.vel = gameSpeed * 3;
  }
  update() {
    this.x -= this.vel;
    this.show();
  }
  show() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    //ctx.arc(this.x + 7, this.y + 33, this.size-30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(
      flyingEye,
      this.x - 20,
      this.y - 20,
      this.size + 30,
      this.size * 1.8
    );
  }
}

function handleEnemies() {
  if (frame % 200 === 0) {
    enemies.unshift(new Enemy());
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if (enemies[i].x + enemies[i].size <= 0) {
      enemies.pop(enemies[i]);
    }
  }
}

function enemyCollision() {
  for (let i = 0; i < enemies.length; i++) {
    let dx = bird.x - enemies[i].x;
    let dy = bird.y - enemies[i].y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < bird.size + enemies[i].size) {
      crashSound.play(bird);
      ctx.drawImage(bang, bird.x, bird.y - 40, 80, 80);
      ctx.font = "20px Aerial";
      ctx.fillStyle = "white";
      ctx.fillText("Game Over Your Score =  " + score, 200, canvas.height / 2);
      ctx.fillText(
        "Press Space to fly Dragon, and S to shoot Fire Balls",
        100,
        canvas.height / 2 + 20
      );
      button.classList.add("active");
      hsResetBtn.classList.add("active");
      animate = false;
      return true;
    }
  }
}
