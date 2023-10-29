const startButton = document.getElementById("start-button") // this gives me access to the start button in javaScript

function timer (){ //this function starts the timmer 
let secondsLeft = 60;// this is how many seconds left for the timer
 secondsInterval = setInterval(function(){ //this set interval is to decrease the time remaining in the secondsLeft 
    secondsLeft = secondsLeft - 1 // this is math for the subtraction of the one second from the secondsLeft
    document.getElementById("timer").innerHTML = secondsLeft + " Seconds left"; //this displays the seconds left to the user
    if (secondsLeft === 0) {// this if statement is to stop the timer from decreasing below zero
        clearInterval(secondsInterval) // this stops the setInterval function which stops the timer
        document.getElementById("timer").innerHTML = "Times Up!"; //this displays Times Up! to the user when the timere hits zero
    }
}, 1000)} // this controlls how long in the setInterval. the 1000 equals 1000 miliseconds meaning the timer is set to tick every one second 

startButton.addEventListener("click", function(){ // this creates a listener for when the start button is clicked to execute the following functions 
    timer()// this is the timer function which starts the timer
})