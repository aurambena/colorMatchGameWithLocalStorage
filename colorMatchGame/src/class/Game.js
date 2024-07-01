import Box from "./Box";

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

    //function to assign random number between 0 and 29 (number of colors)
    createRandomNumbers(){
        //Assign random number between 0 and 29 (number of colors)
        for(let j=0; j<this.pairs*2;j++){
            let random =(Math.random()*((this.pairs*2))-1).toFixed();
            //if random number is not include, it is added to the new array
            if(!this.#randomNumbers.includes(random)){
                this.#randomNumbers.push(random);
                //if the array size is minor than 30, it assigns a new random number and repeat the loop
            }else if(this.#randomNumbers.length<this.pairs*2){
                for(let j=0; j<this.pairs*2;j++){
                    let random =(Math.random()*((this.pairs*2))-1).toFixed();
                    if(!this.#randomNumbers.includes(random)){
                    this.#randomNumbers.push(random);
                    }
                }
            }
        }
        return this.#randomNumbers;
    }

    createBoxes(){
        //Create div tags and add attributes
        for (let i=0; i<(this.pairs*2); i++){
            let divs = document.createElement('div');
            //Attribute allows drag items if it is true
            divs.setAttribute('draggable', 'false');
            //Attribute class colors
            divs.setAttribute('class', 'colors');
            //Attribute data-color assigning a random color for each div
            divs.setAttribute('data-color', this.#colorsArray[Number(this.#randomNumbers[i])]);
            //Insert div tags to the section tag, index.html file
            this.#droppableArea.appendChild(divs);
       }
    }

    paintingBoxes(){
        this.boxTemplates();
        
        let colors = document.getElementsByClassName('colors');
        //Walk through the colors class elements
        
        for(let c of colors){
            
            //Set the box background color style
            c.style.backgroundColor = 'black';
        }
    }
    
    boxTemplates(){
        this.droppableArea.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
        this.droppableArea.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.droppableArea.style.gap = '20px';
    }
}

export default Game;
