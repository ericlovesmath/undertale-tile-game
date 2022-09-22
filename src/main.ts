import "./style.css";
import { tileGame } from "./game";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const flavorText = document.querySelector<HTMLDivElement>("#flavor")!;
const game = new tileGame(12, 6, 100, canvas);

game.setRandomField();
game.drawGame();
updateFlavor();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown":
      game.moveDown();
      updateFlavor();
      break;
    case "ArrowUp":
      game.moveUp();
      updateFlavor();
      break;
    case "ArrowRight":
      game.moveRight();
      updateFlavor();
      break;
    case "ArrowLeft":
      game.moveLeft();
      updateFlavor();
      break;
    default:
  }
});

function updateFlavor() {
  flavorText.textContent = `Flavor: ${game.flavor.toString()}`;
}
