class Timer{
    minutesLabel;
    secondsLabel;
    totalSeconds;
    si;
    constructor(){
        //If there are data on local storage
        if (localStorage.getItem('timer') !== null){
            //Get values from Local Storage
            let timeFromLocalStorage = JSON.parse(localStorage.getItem('timer'));
            this.minutesLabel = parseInt(timeFromLocalStorage.min);
            this.secondsLabel = parseInt(timeFromLocalStorage.sec);
            this.totalSeconds = parseInt(timeFromLocalStorage.total); 
            this.setTime();
        }else{
            //Set properties
            this.minutesLabel = 0;
            this.secondsLabel = 0;
            this.totalSeconds = 0; 
            this.setTime();
        }   
    }

    setTime(){
        //Set interval every second
        this.si = setInterval(() => { 
        //Count each second
        ++this.totalSeconds;
        //Get minutes and seconds label
        let minutes = document.getElementById("minutes");
        let seconds = document.getElementById("seconds");
        //Save data to Storage
        let currentTime = {
            sec : seconds.innerHTML,
            min : minutes.innerHTML,
            total : this.totalSeconds
        }
        //Get label number and send to pad method
        seconds.innerHTML = this.pad(this.totalSeconds%60);
        minutes.innerHTML = this.pad(parseInt(this.totalSeconds/60));
        //Save on Local Storage
        localStorage.setItem('timer', JSON.stringify(currentTime));               
        }, 1000);        
    }

    pad(val){
        //Get value and define if it keeps adding seconds or minutes
        let valString = val + "";
        if(valString.length < 2){
                return "0" + valString;
        }else{
            return valString;
        }
    }   
}

//Export class
export default Timer;

