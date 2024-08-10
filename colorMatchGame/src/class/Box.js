//Import files
import Timer from "./Timer";

class Box{
    #colorsArray;
    #randomNumbers;
    #droppableArea;
    #colors;
    #click;
    constructor(colorsArray, randomNumbers, droppableArea, colors){
        this.#colorsArray = colorsArray;
        this.#randomNumbers = randomNumbers;
        this.#droppableArea = droppableArea;
        this.#colors = colors;
        this.#click = [];
        let aec = this.addEventClick();
    }
    
    //getting private properties
    get colors(){
        return this.#colors;
    }
    get click(){
        return this.#click;
    }
    get droppableArea(){
        return this.#droppableArea;
    }

    addEventClick(){
        for (let c of this.colors){
            //Add event click to every box
            c.addEventListener('click', ()=>{
                //Get seconds label
                let seconds = document.getElementById("seconds");
                //If time is stop
                if(seconds.innerText == '00'){
                     //when click, get real color from the attribute data-color 
                     let color = c.dataset.color;
                     //Reveal the real color 
                     c.style.backgroundColor = color;
                      //Activate drag function changing the attribute state
                     c.setAttribute('draggable', 'true');
                     //add color to the empty array
                     this.click.push(c);
                     //Start timer
                     let timer = new Timer();
                     //if there is 2 boxes that not match, they turn back to black and unable drag
                     if(this.click.length > 1){
                         c.style.backgroundColor = 'black';
                         c.setAttribute('draggable', 'false');
                     }
                }else{                    
                    //when click, get real color from the attribute data-color 
                    let color = c.dataset.color;
                    //Reveal the real color 
                    c.style.backgroundColor = color;
                     //Activate drag function changing the attribute state
                    c.setAttribute('draggable', 'true');
                    //add color to the empty array
                    this.click.push(c);
                    //if there is 2 boxes that not match, they turn back to black
                    if(this.click.length > 1){
                        c.style.backgroundColor = 'black';
                    }
                }
                let click = this.click;
                let drag = this.dragStart(c);
                let drop = this.dropItem(click,c);
                let dragOv = this.dragOver();
            });
        }
    }

    dragStart(c){
        //Drag and drop code
        //Drag event
        c.addEventListener ('dragstart', (e)=>{
        //get a reference to the element that the user dragged, get real color from drag area(box)
        e.dataTransfer.setData('color', e.target.dataset.color);
        let dragColor = e.target.dataset.color;
    });
    }

    dropItem(click){
        for (let c of this.colors){
            //Drop event
            c.addEventListener('drop', function dropp (e){
                e.preventDefault();
                //Get real color from drop area(box)
                const data = e.dataTransfer.getData('color');
                //if drag area color equal to drop area color and the click had changed the attribute value to true
                if (e.target.dataset.color === data && click[0].getAttribute('draggable') === 'true'){
                    //Get the real color
                    let color = c.dataset.color;
                    //Keep the real color over the box
                    c.style.backgroundColor = color;
                    //Attribute status to open
                    c.setAttribute('status', 'open');
                    click[0].setAttribute('status', 'open');
                    //Change the drop area attribute to false and remove the drop event, in order to keep it in that way
                    c.setAttribute('draggable', 'false');
                    c.removeEventListener('drop', dropp);
                    //Change the drag area attibute to false and remove the drop event, in order to keep it in that way
                    click[0].setAttribute('draggable', 'false');
                    click[0].removeEventListener('drop', dropp);
                    //Empty array click to start again
                    click.splice(0, click.length);

                    //Code to check if the color match had been completed
                    //Select all div elements
                    let divsColors = document.getElementsByTagName('div');
                    //Number of div tags
                    let numberOfDivs = divsColors.length;
                    let counter=0;
                    //Walk through the colors backgrounds
                    for (let d of divsColors){
                    //If the color is different to black the counter add 1
                        if(d.style.backgroundColor !== 'black'){
                            counter = counter+1;
                            // if counter is equal to number of div tags, the game is over
                            if(counter == numberOfDivs){
                                //Create a new p tag
                                let youWon = document.createElement('p');
                                //Get timer values from Local Storage
                                let timeFromLocalStorage = JSON.parse(localStorage.getItem('timer'));
                                let minutesLabel = timeFromLocalStorage.min;
                                let secondsLabel = timeFromLocalStorage.sec;
                                //Add text and style
                                youWon.textContent = `You WON, Your time was ${minutesLabel}:${secondsLabel}`;
                                youWon.style.fontSize = '50px';
                                youWon.style.color = 'red';
                                youWon.style.backgroundColor = 'yellow';
                                youWon.style.textAlign = 'center';
                                //Insert to the index.html the text "you won" and the time 
                                let firstMain = document.getElementById('clock');
                                firstMain.insertBefore(youWon,firstMain.firstElementChild);
                                //Remove timer labels
                                let min = document.getElementById('minutes');
                                let sec = document.getElementById('seconds');
                                let col = document.getElementById('colon');
                                min.remove();
                                sec.remove();
                                col.remove();
                            }
                        }
                    }

                    //Local Storage current game
                    //Get divs
                    let currentGame = document.getElementsByTagName('div');
                    //Create empty array
                    let arrayCurrentGame = [];
                    //Walk through the HTML Collection
                    for (let game of currentGame){
                        //get current status (open or close) and color
                        let currentStatus = game.getAttribute('status');
                        let currentColor = game.getAttribute('data-color');
                        //Append current game to the empty array
                        arrayCurrentGame.push({
                            color: currentColor,
                            status: currentStatus,
                            draggable : 'false',
                            class : 'colors',
                        });
                        //Save on Local Storage named boxes
                        localStorage.setItem('boxes', JSON.stringify(arrayCurrentGame));
                    }               
                //if drag area color different to drop area color, then, it changes the attribute value to false and color to black
                }else{
                    click[0].style.backgroundColor = 'black';
                    click[0].setAttribute('draggable', 'false');
                    //Set the array to empty to start again
                    click.splice(0, click.length);  
                }
            });
        }       
    }    


    dragOver(){
        //Dragover event
        this.droppableArea.addEventListener('dragover', (e)=>{
        //enables it to receive drop events
        e.preventDefault();
        }); 
    }
}

//Export class
export default Box;