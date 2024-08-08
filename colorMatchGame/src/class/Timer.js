class Timer{
    minutesLabel;
    secondsLabel;
    totalSeconds;
    constructor(){
        
        if (localStorage.getItem('timer') !== null){
            
            let timeFromLocalStorage = JSON.parse(localStorage.getItem('timer'));
            this.minutesLabel = parseInt(timeFromLocalStorage.min);
            this.secondsLabel = parseInt(timeFromLocalStorage.sec);
            this.totalSeconds = parseInt(timeFromLocalStorage.total); 
            console.log(this.minutesLabel, this.secondsLabel, this.totalSeconds);
            this.setTime();
        }else{
            
            this.minutesLabel = 0;
            this.secondsLabel = 0;
            this.totalSeconds = 0; 
            this.setTime();
        }
        
    }

    setTime(){
        setInterval(() => {
        ++this.totalSeconds;
        let minutes = document.getElementById("minutes");
        let seconds = document.getElementById("seconds");
        let currentTime = {
            sec : seconds.innerHTML,
            min : minutes.innerHTML,
            total : this.totalSeconds
        }
        seconds.innerHTML = this.pad(this.totalSeconds%60);
        minutes.innerHTML = this.pad(parseInt(this.totalSeconds/60));
        localStorage.setItem('timer', JSON.stringify(currentTime));
        }, 1000);
    }

    pad(val){
            let valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
}      
}

export default Timer;

