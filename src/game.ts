enum Colors {
  Pink = "pink",
  Green = "green",
  Red = "red",
  Yellow = "yellow",
  Orange = "orange",
  Purple = "purple",
  Blue = "blue",
}

export class tileGame {
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
    const colors = [
      Colors.Pink,
      Colors.Green,
      Colors.Red,
      Colors.Yellow,
      Colors.Orange,
      Colors.Purple,
      Colors.Blue,
    ];
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.field[i][j] = colors[Math.floor(Math.random() * colors.length)];
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
