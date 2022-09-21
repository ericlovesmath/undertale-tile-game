import "./style.css";

enum Colors {
  Pink = "pink",
  Green = "green",
  Red = "red",
  Yellow = "yellow",
  Orange = "orange",
  Purple = "purple",
  Blue = "blue",
}

class tileGame {
  width: number;
  height: number;
  size: number;
  ctx: CanvasRenderingContext2D;
  field: Colors[][];

  constructor(
    width: number,
    height: number,
    size: number,
    canvas: HTMLCanvasElement
  ) {
    canvas.width = width * size;
    canvas.height = height * size;

    this.width = width;
    this.height = height;
    this.size = size;
    this.ctx = canvas.getContext("2d")!;

    this.field = [];
    for (var i = 0; i < height; i++) {
      let row: Colors[] = [];
      for (var j = 0; j < width; j++) {
        row.push(Colors.Purple);
      }
      this.field.push(row);
    }
  }

  setRandomField() {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.field[i][j] = (i + j) % 2 == 0 ? Colors.Red : Colors.Blue;
      }
    }
  }
  drawField() {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.ctx.fillStyle = this.field[i][j];
        this.ctx.fillRect(j * this.size, i * this.size, this.size, this.size);
      }
    }
  }
}

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const game = new tileGame(12, 6, 100, canvas);

game.setRandomField();
game.drawField();
