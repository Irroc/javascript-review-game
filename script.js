const startButton = document.getElementById("start-button")
const topScores = document.getElementById("top-scores")
const displayQuestions = document.getElementById("questions")
const answerCheck = document.getElementById("answer-check")
const initials = document.getElementById('initials')
const submitDisplay = document.getElementById("submit")
let highScoreUl = document.getElementById("ul")
const a = document.getElementById('a')
const b = document.getElementById('b')
const c = document.getElementById('c')
const d = document.getElementById('d')
const returnToStart = document.getElementById('return')
const clearScores = document.getElementById('clear-scores')
let inputAndScore = []
let numberCorrectAnswers = 0
let randomAnswer = 0 //this is to transfer the randomly generated answer to be brought outside the scope of the function itself to another in the global scope function 
let secondsLeft = 60 // this is how many seconds left for the timer, it needs to be global for the seconds to be deducted 
let running = false;
const questions = [{//this is an array of objects, the objects are each of the questions available including the question itself the choicesand the answers. ps this may be able to fo in the random answer function
    question: "The terms True and False are what kind of object?",
    multipleChoice: "String, Boolean, Element, Functions",
    answer: "Boolean"
}, {
    question: " asdasdasd",
    multipleChoice: "asdasdasd, Boolean, Element, Functions",
    answer: "asdasdasd"
}
]
function submitScore() {
    let input = document.getElementById("initials").value;
    if (input == '') {
        return
    } else {
        inputAndScore.push([numberCorrectAnswers, input])
        console.log(inputAndScore)
        topScores.style.display = 'block'
        answerCheck.style.display = 'none'
        submitDisplay.style.display = 'none'
        initials.style.display = 'none'
        startButton.style.display = 'block' // this displays the hidded start button again to offer restart
        startButton.textContent = 'Restart'// this changes the text to offer restarting 
        numberCorrectAnswers = 0
    }
}
function topScoreInput() {
    displayQuestions.style.display = 'none'
    a.style.display = 'none'
    b.style.display = 'none'
    c.style.display = 'none'
    d.style.display = 'none'
    answerCheck.textContent = 'Congradulations you got ' + numberCorrectAnswers + ' correct! Please leave initials for the Top Scores'
    initials.style.display = 'block'
    submitDisplay.style.display = 'block'
}

function timer() { //this function starts the timmer and action needed to perform properly
    startButton.style.display = 'none'// this hides the button to not be clicked multiple times
    displayQuestions.style.display = 'block'
    answerCheck.textContent = ''
    answerCheck.style.display = 'block'
    if (running == false) {// this permits timer to only start if not currently running
        secondsInterval = setInterval(function () { //this set interval is to decrease the time remaining in the secondsLeft 
            secondsLeft = secondsLeft - 1 // this is math for the subtraction of the one second from the secondsLeft
            document.getElementById("timer").innerHTML = secondsLeft + " Seconds left";// this displays the seconds left to the user
            running = true; //this tells the function its running so it cannot be launched a second time and have two timers displaying at once
            if (secondsLeft <= 0) {// this if statement triggers to stop the timer when its zero or below from penalty 
                clearInterval(secondsInterval) // this actually stops the setInterval function which stops the timer
                document.getElementById("timer").innerHTML = "Times Up!"; //this displays Times Up! to the user when the timere hits zero
                topScoreInput()
                secondsLeft = 60 // this resets timer to 60 for next attempt
                running = false;// this tells the timer function its not running anymore and can restart 
            }

        }, 1000) // this controlls how long in the setInterval. the 1000 equals 1000 miliseconds meaning the timer is set to tick every one second 
    }
    else { //this else statement returns if the set interval is already running to stop multiple timers happening at the same time
        return
    }
}


function questionChange() { //function randomly picks question from questions array
    const randomQuestion = Math.floor(Math.random() * questions.length);//picks random number from question array, random number equates to a random object being selected in the array
    displayQuestions.textContent = questions[randomQuestion].question //this displays the question associated with the random object selected
    randomAnswer = questions[randomQuestion].answer//this writes the current answer to an element outside the functions scope to verify the correct answer in a later function
    choices = questions[randomQuestion].multipleChoice.split(', ') //this splits the list of multiple choice answers and put it in an array called choices
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
    event.preventDefault()// this stops the form from doing default things like providing a blank page
    timer()// this calls the timer function which starts the timer
    questionChange()//this calls the funtion to randomly select a new question to answer
    topScores.style.display = 'none'
})
submitDisplay.addEventListener("click", function (event) {
    event.preventDefault()
    submitScore()
})
topScores.addEventListener("click", function () {
    topScores.style.display = 'none'
    startButton.style.display = 'none'
    returnToStart.style.display = 'block'
    returnToStart.textContent = 'Back to Review'
    clearScores.style.display = 'block'
    clearScores.textContent = 'Clear Scores'
    highScoreUl.style.display = 'block'
    const liElement = document.getElementById("ul")
    for (let i = 0; i < inputAndScore.length; i++) {
        let lis = document.createElement("li")
        lis.textContent = inputAndScore[i].toLocaleString()
        liElement.appendChild(lis)
    }
})
returnToStart.addEventListener("click", function (event) {
    event.preventDefault()
    topScores.style.display = 'block'
    startButton.style.display = 'block'
    returnToStart.style.display = 'none'
    clearScores.style.display = 'none'
    highScoreUl.style.display = 'none'
    for (let i = 0; i < inputAndScore.length; i++) {
        highScoreUl.removeChild(highScoreUl.firstElementChild);
    }
})
clearScores.addEventListener("click", function(event){
    event.preventDefault()
    const emptyArray = []
    for (let i = 0; i < inputAndScore.length; i++) {
        highScoreUl.removeChild(highScoreUl.firstElementChild);
    }
    inputAndScore = emptyArray
    highScoreUl.style.display = 'none'
})





a.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault()
    function checkAnswer() {

        if (a.textContent == randomAnswer) {// this determines if answer is correct
            answerCheck.textContent = 'Correct!'// this displays correct to the user
            questionChange()// this loads a new question to the user
            numberCorrectAnswers = numberCorrectAnswers + 1 //adds one to the count or correct answers
        } else {
            answerCheck.textContent = 'Wrong'// this displays wrong to the user
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
b.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault() // this stops unwanted default actions from happening
    function checkAnswer() {

        if (b.textContent == randomAnswer) {
            answerCheck.textContent = 'Correct!'
            questionChange()
            numberCorrectAnswers = numberCorrectAnswers + 1
        } else {
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
c.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault()// this stops unwanted default actions from happening
    function checkAnswer() {

        if (c.textContent == randomAnswer) {
            answerCheck.textContent = 'Correct!'
            questionChange()
            numberCorrectAnswers = numberCorrectAnswers + 1
        } else {
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
d.addEventListener("click", function (event) {//this executes the check answer function to verify if the answer from the user is correct or not
    event.preventDefault()// this stops unwanted default actions from happening
    function checkAnswer() {

        if (d.textContent == randomAnswer) {
            answerCheck.textContent = 'Correct!'
            questionChange()
            numberCorrectAnswers = numberCorrectAnswers + 1
        } else {
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})