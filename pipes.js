class Pipe {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3
    this.bot = (Math.random() * canvas.height) / 3 ;
    this.width = 30;
    this.x = canvas.width + this.width;
    this.color = "hsl(" + hue + ", 50%, 50%)";
    this.counted = false;
  }
  show() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bot, this.width, this.bot);
  }
  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.show();
  }
}

function handlePipes() {
  if (frame % 200 === 0) {
    pipes.unshift(new Pipe());
  }
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].update();
  }
  if (pipes.length > 20) {
    pipes.pop(pipes[0]);
  }
}
