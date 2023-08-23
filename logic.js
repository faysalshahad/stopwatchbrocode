const
timeDisplay = document.querySelector("#timeDisplay"),
startButton = document.querySelector("#startButton"),
pauseButton = document.querySelector("#pauseButton"),
stopButton = document.querySelector("#stopButton");
 
let
startTime = 0, elapsedTime = 0, currentTime = 0, paused = true, intervalID,
hours = 0, minutes = 0, seconds = 0;

startButton.addEventListener("click", ()=>{
    if (paused) {
        paused = false;
        /**Date.now() will give the current date and time in miliseconds.*/
        startTime = Date.now() - elapsedTime;
        /**invoking this function every 1000 miliseconds */
        intervalID = setInterval(updateTime, 1000);
    }
});
pauseButton.addEventListener("click", ()=>{
    if (!paused) {
        paused = true;
        /**This process will save how much time has passed in miliseconds. */
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalID);
    }
});
stopButton.addEventListener("click", ()=>{
    paused = true;
    clearInterval(intervalID);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime() {
    /**How much time has passed we are calculating that here. Time will be 
     * calculated in miliseconds.*/
    elapsedTime = Date.now() - startTime;
    /**We are going to format it so that we can display actual regular time
     * in our stop watch. We are dividing 1000 because normally it is in 
     * miliseconds.*/
    seconds = Math.floor((elapsedTime / 1000) % 60);
    /**Multiplying extra 60 is because every minute has 60 seconds */
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    /**Multiplying extra 60 and 60 is because every hour has 60 seconds and
     * 60 minutes.*/
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
    seconds = pad(seconds);
    minutes = pad(minutes);
    hours = pad(hours);
    /**Creating function which will help us to add 0 in front of a single
     * digit values.*/
    function pad(unit) {
        /**Creating a ternary operator */
        return ((("0") + unit).length > 2 ? unit : "0" + unit);
    }
        /**Displaying time in our stop watch now */
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}