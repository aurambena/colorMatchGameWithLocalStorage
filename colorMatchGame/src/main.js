import "../SASS/main.scss";
import Game from "./class/Game";
import Box from "./class/Box";

//Ask for pairs number
let pairs = parseInt(prompt('How many pairs do you want?'));

//Set rows and cols
let board = [];
switch(true){
    case (pairs<=6):
        let row = 2;
        let col = pairs;
        board.push(row);
        board.push(col);
        break;
    case (6<pairs && pairs<=12):
        let row2 = 4;
        let col2 = 6;
        board.push(row2);
        board.push(col2); 
        break;

    case (12<pairs && pairs<=18):
        let row3 = 6;
        let col3 = 6;
        board.push(row3);
        board.push(col3); 
        break;

    case (18<pairs && pairs<=24):
        let row4 = 8;
        let col4 = 6;
        board.push(row4);
        board.push(col4); 
        break;
}

let rows = board[0];
let cols = board[1];
console.log(board);

//Random colors code
//create color pairs array
let colorsArray = ["green","green","red","red","blue","blue","yellow","yellow",
    "deeppink","deeppink","salmon","salmon", "brown","brown","blueviolet","blueviolet","gray","gray",
    "lavender","lavender","olive","olive", "lawngreen","lawngreen","navy","navy",
    "cyan","cyan","lime","lime","fuchsia", "fuchsia","darkorange","darkorange","violet","violet",
    "cornflowerblue", "cornflowerblue","hotpink","hotpink","white","white","darkolivegreen","darkolivegreen",
    "wheat", "wheat","aquamarine", "aquamarine"];
//Create empty array
let randomNumbers = [];
//Select droppable area, in this case a section tag with id=container
let droppableArea = document.getElementById('container');
//Select all colors class items
let colors = document.getElementsByClassName('colors');

let game = new Game(colorsArray, randomNumbers, droppableArea, rows, cols, pairs);
let box = new Box(colorsArray, randomNumbers, droppableArea, colors);
