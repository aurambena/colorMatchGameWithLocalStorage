import "../SASS/main.scss";
import Game from "./class/Game";
import Box from "./class/Box";
import Timer from "./class/Timer";

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click',()=>{
    Game.resetGame();
});

let data = Game.getRowsCols();
let setColor = Game.setColors();
let game = new Game(setColor.color, setColor.randomNumber, setColor.dropArea, data.row, data.col, data.pair);
let box = new Box(setColor.color, setColor.randomNumber, setColor.dropArea, setColor.getColor);
console.log(game);


