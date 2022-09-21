enum Colors {
  Pink = "pink",
  Green = "green",
  Red = "red",
  Yellow = "yellow",
  Orange = "orange",
  Purple = "purple",
  Blue = "blue",
}

enum Flavor {
  None = "None",
  Orange = "Orange",
  Lemon = "Lemon",
}

enum Move {
  Go,
  Stop,
  Slide,
}

// TODO: Comment Code
export class tileGame {
  width: number;
  height: number;
  size: number;
  ctx: CanvasRenderingContext2D;

  field: Colors[][];

  x: number;
  y: number;
  flavor: Flavor;

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

    this.flavor = Flavor.None;
    this.x = 0;
    this.y = 0;
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

  drawGame() {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.ctx.fillStyle = this.field[i][j];
        this.ctx.fillRect(j * this.size, i * this.size, this.size, this.size);
      }
    }
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.y * this.size + 25, this.x * this.size + 25, 50, 50);
  }

  moveLeft() {
    if (this.y == 0) return;
    switch (this.checkNeighbor(this.x, this.y - 1)) {
      case Move.Go:
        this.y -= 1;
        break;
      case Move.Slide:
        this.y -= 1;
        this.moveLeft();
        break;
    }
    this.drawGame();
  }

  moveRight() {
    if (this.y == this.width - 1) return;
    switch (this.checkNeighbor(this.x, this.y + 1)) {
      case Move.Go:
        this.y += 1;
        break;
      case Move.Slide:
        this.y += 1;
        this.moveRight();
        break;
    }
    this.drawGame();
  }

  moveUp() {
    if (this.x == 0) return;
    switch (this.checkNeighbor(this.x - 1, this.y)) {
      case Move.Go:
        this.x -= 1;
        break;
      case Move.Slide:
        this.x -= 1;
        this.moveUp();
        break;
    }
    this.drawGame();
  }

  moveDown() {
    if (this.x == this.height - 1) return;
    switch (this.checkNeighbor(this.x + 1, this.y)) {
      case Move.Go:
        this.x += 1;
        break;
      case Move.Slide:
        this.x += 1;
        this.moveDown();
        break;
    }
    this.drawGame();
  }

  checkNeighbor(x: number, y: number): Move {
    switch (this.field[x][y]) {
      case Colors.Pink:
      case Colors.Green:
        return Move.Go;

      case Colors.Red:
      case Colors.Yellow:
        return Move.Stop;

      case Colors.Orange:
        this.flavor = Flavor.Orange;
        return Move.Go;

      case Colors.Purple:
        this.flavor = Flavor.Lemon;
        return Move.Slide;

      case Colors.Blue:
        if (this.flavor === Flavor.Orange) return Move.Stop;
        if (
          [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
          ].some(
            ([dx, dy]) =>
              x + dx >= 0 &&
              x + dx < this.height &&
              y + dy >= 0 &&
              y + dy < this.width &&
              this.field[x + dx][y + dy] === Colors.Yellow
          )
        ) {
          return Move.Stop;
        }
        return Move.Go;
    }
  }
}
