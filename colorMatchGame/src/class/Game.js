import Box from "./Box";
import Timer from "./Timer";


class Game{
    #colorsArray;
    #randomNumbers;
    #droppableArea;
    #cols
    #rows
    #pairs
   
    constructor(colorsArray, randomNumbers, droppableArea, rows, cols, pairs){
        this.#colorsArray = colorsArray;
        this.#randomNumbers = randomNumbers;
        this.#droppableArea = droppableArea;
        this.#cols = cols;
        this.#rows = rows;
        this.#pairs = pairs;
      
        let rn = this.createRandomNumbers();
        let cb = this.createBoxes();
        let pb = this.paintingBoxes();
    }

    get droppableArea(){
        return this.#droppableArea;
    }
    get cols(){
        return this.#cols;
    }
    get rows(){
        return this.#rows;
    }
    get pairs(){
        return this.#pairs;
    }
    get colorsArray(){
        return this.#colorsArray;
    }
    get droppableArea(){
        return this.#droppableArea;
    }


    //function to assign random number between 0 and 29 (number of colors)
    createRandomNumbers(){
        //Assign random number between 0 and 29 (number of colors)
        for(let j=0; j<this.pairs*2;j++){
            let random =(Math.random()*((this.pairs*2)-1)).toFixed();
            //if random number is not include, it is added to the new array
            if(!this.#randomNumbers.includes(random)){
                this.#randomNumbers.push(random);
                //if the array size is minor than 30, it assigns a new random number and repeat the loop
            }else if(this.#randomNumbers.length<this.pairs*2){
                for(let j=0; j<this.pairs*2;j++){
                    let random =(Math.random()*((this.pairs*2)-1)).toFixed();
                    if(!this.#randomNumbers.includes(random)){
                    this.#randomNumbers.push(random);
                    }
                }
            }
        }
        
        return this.#randomNumbers;
        
    }

    createBoxes(){   
        //If there are data on local storage
        if (localStorage.getItem('boxes')!== null){
            let attributesFromLocalStorage = JSON.parse(localStorage.getItem('boxes'));
                attributesFromLocalStorage.map(box=>{
                    let divs = document.createElement('div');
                    console.log(box.draggable, box.colors, box.color, box.status, box.seconds, box.minutes);
                    //Attribute allows drag items if it is true
                    divs.setAttribute('draggable', box.draggable); 
                    divs.setAttribute('class', 'colors');
                    //Attribute status
                    divs.setAttribute('status', box.status);
                    //Attribute data-color assigning a random color for each div
                    divs.setAttribute('data-color', box.color);
                    this.#droppableArea.appendChild(divs);
                    let timer = new Timer();
            })
        
        }else{
            
            //Create div tags and add attributes if there are not data on local storage
            for (let i=0; i<(this.pairs*2); i++){
                let divs = document.createElement('div');
                //Attribute allows drag items if it is true
                divs.setAttribute('draggable', 'false');
                //Attribute class colors
                divs.setAttribute('class', 'colors');
                 //Attribute status
                 divs.setAttribute('status', 'close');
                //Attribute data-color assigning a random color for each div
                divs.setAttribute('data-color', this.#colorsArray[Number(this.#randomNumbers[i])]);
                //Insert div tags to the section tag, index.html file   
                this.#droppableArea.appendChild(divs);
                this.arrayBoxesToLocalStorage();
                this.paintingBoxes();             
                
        }
        }
        
    }
    
    arrayBoxesToLocalStorage(){
        let currentGame = document.getElementsByTagName('div');
        let arrayCurrentGame = [];
        for (let game of currentGame){
            let currentStatus = game.getAttribute('status');
            let currentColor = game.getAttribute('data-color');
            arrayCurrentGame.push({
                color: currentColor,
                status: currentStatus,
                draggable : 'false',
                class : 'colors',
                
            });
    
            localStorage.setItem('boxes', JSON.stringify(arrayCurrentGame));
        }
    }

    paintingBoxes(){
        this.boxTemplates();
        let colors = document.getElementsByClassName('colors');        
        //Walk through the colors class elements 
        for(let c of colors){
            if(c.getAttribute('status')=='open'){
                c.style.backgroundColor = c.getAttribute('data-color')
            }else{
                //Set the box background color style
                c.style.backgroundColor = 'black';
            }
        }
    }

    boxTemplates(){
        this.droppableArea.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
        this.droppableArea.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.droppableArea.style.gap = '20px';
    }

    static setColors(){
        //Random colors code
        //create color pairs array
        this.colorsArray = ["green","green","red","red","blue","blue","yellow","yellow",
            "deeppink","deeppink","salmon","salmon", "brown","brown","blueviolet","blueviolet","gray","gray",
            "lavender","lavender","olive","olive", "lawngreen","lawngreen","navy","navy",
            "cyan","cyan","lime","lime","fuchsia", "fuchsia","darkorange","darkorange","violet","violet",
            "cornflowerblue", "cornflowerblue","hotpink","hotpink","white","white","darkolivegreen","darkolivegreen",
            "wheat", "wheat","aquamarine", "aquamarine"];
        //Create empty array
        let randomNumbers = [];
        //Select droppable area, in this case a section tag with id=container
        this.droppableArea = document.getElementById('container');
        //Select all colors class items
        let colors = document.getElementsByClassName('colors');
        
        return{
            color: this.colorsArray,
            randomNumber: randomNumbers,
            dropArea: this.droppableArea,
            getColor: colors,
            
        };
        

        }

    static getRowsCols(){
        let pairs;
        let rows;
        let cols;
        if(localStorage.getItem('pairs')!==null){
            pairs = parseInt(localStorage.getItem('pairs'));
            rows = parseInt(localStorage.getItem('rows'));
            cols = parseInt(localStorage.getItem('cols'));
        }else{
            //Ask for pairs number
            let pairs = parseInt(prompt('How many pairs do you want?'));
            //Set rows and cols
            let gameBoard = [];
            switch(true){
                case (pairs<=6):
                    let row = 2;
                    let col = pairs;
                    gameBoard.push(row);
                    gameBoard.push(col);
                    gameBoard.push(pairs);
                    break;
                case (6<pairs && pairs<=12):
                    let row2 = 4;
                    let col2 = 6;
                    gameBoard.push(row2);
                    gameBoard.push(col2); 
                    gameBoard.push(pairs);
                    break;
                case (12<pairs && pairs<=18):
                    let row3 = 6;
                    let col3 = 6;
                    gameBoard.push(row3);
                    gameBoard.push(col3); 
                    gameBoard.push(pairs);
                    break;
                case (18<pairs && pairs<=24):
                    let row4 = 8;
                    let col4 = 6;
                    gameBoard.push(row4);
                    gameBoard.push(col4); 
                    gameBoard.push(pairs);
                    break;
                }
                rows = gameBoard[0];
                cols = gameBoard[1];
                pairs = gameBoard[2];
                console.log(gameBoard);

                localStorage.setItem('pairs', pairs)
                localStorage.setItem('rows', rows)
                localStorage.setItem('cols',   cols)
                return {
                    row : rows,
                    col : cols,
                    pair : pairs,
                };  
            }
            return {
                row : rows,
                col : cols,
                pair : pairs,
            };  
                  
        }
    static resetGame(){
        localStorage.removeItem('pairs');
        localStorage.removeItem('boxes');
        localStorage.removeItem('timer');
        location.reload();
    }
}

export default Game;
