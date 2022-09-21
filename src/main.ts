import "./style.css";
import { tileGame } from "./game";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const game = new tileGame(12, 6, 100, canvas);

game.setRandomField();
game.drawField();
