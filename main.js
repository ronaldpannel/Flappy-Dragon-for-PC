/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
const button = document.getElementById("btn");
const hsResetBtn = document.getElementById("hsBtn");
let spacePressed = false;
let sPressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 1;
let pipes = [];
let enemies = [];
let bird;
let pipe;
let highestScore = localStorage.getItem("fbHighScore") || 0;
const bgImg = new Image();
bgImg.src = "BG.png";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBg() {
  if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
  else BG.x1 -= gameSpeed;
  if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
  else BG.x2 -= gameSpeed;
  ctx.drawImage(bgImg, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(bgImg, BG.x2, BG.y, BG.width, BG.height);
}
function setHighestScore() {
  if (score > localStorage.getItem("fbHighScore")) {
    localStorage.setItem("fbHighScore", score);
    let hsScore = localStorage.getItem("fbHighScore");
    highestScore = hsScore;
  }

  ctx.font = "20px Aerial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.strokeText("Highest Sore  " + highestScore, 450, 30);
  ctx.fillText("Highest Sore  " + highestScore, 450, 30);
}

bird = new Bird();
enemy = new Enemy();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBg();
  enemyCollision();
  fireParticleCollision();
  collision();
  handleParticles();
  handleFireParticles();
  handlePipes();
  handleEnemies();
  bird.show();
  bird.update();
  setHighestScore();

  //score text
  ctx.fillStyle = "white";
  ctx.font = "20px Aerial";
  ctx.strokeText(score, 50, 30);
  ctx.fillText(score, 50, 30);
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    spacePressed = true;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") {
    spacePressed = false;
    bird.frameX = 0;
  }
});

window.addEventListener("keydown", function (e) {
  if (e.code === "KeyS") {
    fireParticles.push(new FireParticle());
  }
});

const bang = new Image();
bang.src = "bang.png";

const crashSound = document.createElement("audio");
crashSound.src = "slideWhistle.wav";
function collision() {
  for (let i = 0; i < pipes.length; i++) {
    if (
      (bird.x + bird.w > pipes[i].x - pipes[i].width &&
        bird.x < pipes[i].x + pipes[i].width &&
        bird.y + bird.w < pipes[i].top) ||
      (bird.x > pipes[i].x - pipes[i].width &&
        bird.x < pipes[i].x + pipes[i].width &&
        bird.y + bird.w > canvas.height - pipes[i].bot)
    ) {
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
      hsResetBtn.classList.add('active')
      animate = false;
      return true;
    }
  }
}
button.addEventListener("click", resetGame);

function resetGame() {
  window.location.reload();
}

hsResetBtn.addEventListener("click", resetHighScore);

function resetHighScore() {
  localStorage.setItem("fbHighScore", 0);
   window.location.reload();
}
