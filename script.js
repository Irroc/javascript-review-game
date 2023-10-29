const startButton = document.getElementById("start-button") // this gives me access to the start button in javaScript
const displayQuestions = document.getElementById("questions")
let randomAnswer = 0
const a = document.getElementById('a')
const b = document.getElementById('b')
const c = document.getElementById('c')
const d = document.getElementById('d')
let running = false;
const questions = [{
    question: "The terms True and False are what kind of object?",
    multipleChoice: "String, Boolean, Element, Functions",
    answer: "Boolean"
}, {
    question: " asdasdasd",
    multipleChoice: "asdasdasd, Boolean, Element, Functions",
    answer: "asdasdasd"
}
]

function timer() { //this function starts the timmer 
    let secondsLeft = 60;// this is how many seconds left for the timer
    startButton.style.display = 'none'// this hides the button to not be clicked multiple times
    if (running == false) {// this permits timer to only start if not currently running
        secondsInterval = setInterval(function () { //this set interval is to decrease the time remaining in the secondsLeft 
            secondsLeft = secondsLeft - 1 // this is math for the subtraction of the one second from the secondsLeft
            document.getElementById("timer").innerHTML = secondsLeft + " Seconds left";
            running = true; //this displays the seconds left to the user
            if (secondsLeft === 0) {// this if statement is to stop the timer from decreasing below zero
                clearInterval(secondsInterval) // this stops the setInterval function which stops the timer
                document.getElementById("timer").innerHTML = "Times Up!"; //this displays Times Up! to the user when the timere hits zero
               startButton.style.display = 'block' // this displays the hidded start button again to offer restart
               startButton.textContent = 'Restart'// this changes the text to offer restarting 
                running = false;
            }

        }, 1000) // this controlls how long in the setInterval. the 1000 equals 1000 miliseconds meaning the timer is set to tick every one second 
    }
    else { //this returns if the set interval is already running to stop multiple timers happening at the same time
        return
    }
}


function questionChange() {
    const randomQuestion = Math.floor(Math.random() * questions.length);
    displayQuestions.textContent = questions[randomQuestion].question
    randomAnswer = questions[randomQuestion].answer
    choices = questions[randomQuestion].multipleChoice.split(', ')
    a.style.display = 'block'
    a.textContent = choices[0]

    b.style.display = 'block'
    b.textContent = choices[1]


    c.style.display = 'block'
    c.textContent = choices[2]


    d.style.display = 'block'
    d.textContent = choices[3]

}

startButton.addEventListener("click", function (event) { // this creates a listener for when the start button is clicked to execute the following functions 
    event.preventDefault()
    timer()// this is the timer function which starts the timer
    questionChange()
})
a.addEventListener("click", function(event) {
    event.preventDefault()
    function checkAnswer() {
        
        if (a.textContent == randomAnswer) {
            console.log('Correct!')
        } else {
            console.log('Wrong')
        }
    }
    checkAnswer()
})
b.addEventListener("click", function(event) {
    event.preventDefault()
    function checkAnswer() {
        
        if (b.textContent == randomAnswer) {
            console.log('Correct!')
        } else {
            console.log('Wrong')
        }
    }
    checkAnswer()
})
c.addEventListener("click", function(event) {
    event.preventDefault()
    function checkAnswer() {
        
        if (c.textContent == randomAnswer) {
            console.log('Correct!')
        } else {
            console.log('Wrong')
        }
    }
    checkAnswer()
})
d.addEventListener("click", function(event) {
    event.preventDefault()
    function checkAnswer() {
        
        if (d.textContent == randomAnswer) {
            console.log('Correct!')
        } else {
            console.log('Wrong')
        }
    }
    checkAnswer()
})

console.log(questions[1].multipleChoice)