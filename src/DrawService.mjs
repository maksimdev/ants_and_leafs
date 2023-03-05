export default class DrawService {
  constructor(width, height) {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(x, y, radius, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  drawAnts() {
    window.GAME.ants.forEach(ant => this.draw(ant.position.x, ant.position.y, 2, "black"));
  }

  drawHomes() {
    window.GAME.homes.forEach(home => this.draw(home.position.x, home.position.y, 30, "black"));
  }

  drawLeafs() {
    window.GAME.leafs.forEach(leaf => this.draw(leaf.position.x, leaf.position.y, 5, "green"));
  }

  drawReservedLeafs() {
    window.GAME.reservedLeafs.forEach(leaf => this.draw(leaf.position.x, leaf.position.y, 5, "green"));
  }

  drawFrame() {
    this.clearCanvas();
    this.drawHomes();
    this.drawLeafs();
    this.drawReservedLeafs();
    this.drawAnts();
  }
}