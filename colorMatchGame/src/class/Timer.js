class Timer{
    minutesLabel;
    secondsLabel;
    totalSeconds;
    constructor(minutesLabel ,secondsLabel){
        this.minutesLabel = minutesLabel;
        this.secondsLabel = secondsLabel;
        this.totalSeconds = 0; 
        this.setTime();
    }

    setTime(){
        setInterval(() => {
            
        ++this.totalSeconds;
        let minutes = document.getElementById("minutes");
        let seconds = document.getElementById("seconds");
    
        seconds.innerHTML = this.pad(this.totalSeconds%60);
        minutes.innerHTML = this.pad(parseInt(this.totalSeconds/60));
        }, 1000);
    }

    pad(val)
        {
            
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

