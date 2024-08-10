//Import files
import "../SASS/main.scss";
import Game from "./class/Game";
import Box from "./class/Box";

//Create reset button on index and add event click listener
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click',()=>{
    Game.resetGame();
});

//gets data and setcolor return values
let data = Game.getRowsCols();
let setColor = Game.setColors();
//Executes the Game and Box constructor with parameters
let game = new Game(setColor.color, setColor.randomNumber, setColor.dropArea, data.row, data.col, data.pair);
let box = new Box(setColor.color, setColor.randomNumber, setColor.dropArea, setColor.getColor);


