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
let inputAndScore = [] // this needs to start empty to be able to push items to the array. also needs to be let because it will be able to be cleared
let numberCorrectAnswers = 0 // this lets the total numbers of the correct answersers be used in more than just on function by declaring it here instead of in the function itself
let randomAnswer = 0 //this is to transfer the randomly generated answer to be brought outside the scope of the function itself to another in the global scope function 
let secondsLeft = 60 // this is how many seconds left for the timer, it needs to be global for the seconds to be deducted 
let running = false; // this lets other functions know if the timer is running or not
const questions = [{//this is an array of objects, the objects are each of the questions available including the question itself the choices and the answers. ps this may be able to go in the random answer function but its working now
    question: "The terms True and False are what kind of object?",
    multipleChoice: "String, Boolean, Element, Functions",
    answer: "Boolean"
}, {
    question: "Which one is not a way JavaScript stores data?",
    multipleChoice: "Boolean, String, Number, Server",
    answer: "Server"
}, {
    question: "In a for loop. How many conditions should there be?",
    multipleChoice: "1, 2, 3, 4",
    answer: "3"
}, {
    question: "What is not one of the 3 conditions of a for loop?",
    multipleChoice: "Initialization, Condition, Afterthought, Execution",
    answer: "Execution"
}, {
    question: "What is the strictest for of checking equality?",
    multipleChoice: "=, ==, ===, ====",
    answer: "==="
}, {
    question: "What does '.addEventListener' do in JavaSccript?",
    multipleChoice: "Adds an event to a list., Adds accessibility for those hard of hearing., Adds accessibility for those who can not see., Adds a listener for a specified event on the page.",
    answer: "Adds a listener for a specified event on the page."
}, {
    question: "What kind of data is stored in parentheses?",
    multipleChoice: "Boolean, String, Number, Server",
    answer: "String"
}, {
    question: "What kind of data is 1110001010101000100010110001000100010000?",
    multipleChoice: "Boolean, String, Number, Server",
    answer: "Number"
}, {
    question: "What is a pop-up displays box with text and only an OK button?",
    multipleChoice: "alert(), confirm(), prompt(), getSelection()",
    answer: "alert()"
}, {
    question: "what is a pop-up displays box with text, an OK button and a cancel?",
    multipleChoice: "alert(), confirm(), prompt(), getSelection()",
    answer: "confirm()"
}, {
    question: "What is a pop-up displays box with text and a user input text box?",
    multipleChoice: "alert(), confirm(), prompt(), getSelection()",
    answer: "prompt()"
}, {
    question: "Is JavaScript the same thing as Java?(choose the most correct answer)",
    multipleChoice: "Yes, No, Yes but only when you link Java to a Script, No JavaScript is a singular part of Java as a whole",
    answer: "No"
}, {
    question: "Can you edit css style in JavaScript?(choose the most correct answer)",
    multipleChoice: "Yes, No, Yes but only when you link the css file to the JavaScript, No JavaScript does not edit pages at all",
    answer: "Yes"
}
]
function submitScore() { // this function takes the users input for their initials or username and their score and stores it on a previously empty array
    let input = document.getElementById("initials").value; // this allows the javascript to know the value input by the user
    if (input == '') { //this wont allow the user to submit an empty name
        return
    } else {
        inputAndScore.push([numberCorrectAnswers, input]) // this is what pushes the data to the array for storage
        topScores.style.display = 'block' // all these style.displays hide and show nuttons only when they should be pressed to avoid bugs
        answerCheck.style.display = 'none'
        submitDisplay.style.display = 'none'
        initials.style.display = 'none'
        startButton.style.display = 'block' 
        startButton.textContent = 'Restart'// this renames start after the first game to restart since the user has alredy played the game once
        numberCorrectAnswers = 0 // this resetss the wins to 0 after submitting the score to the scores array named 'inputAndScore'
    }
}
function topScoreInput() {
    displayQuestions.style.display = 'none'//all these style.displays are to hide buttons that shouldnt display on the score screen and reveal the submit score button and username box 
    a.style.display = 'none'
    b.style.display = 'none'
    c.style.display = 'none'
    d.style.display = 'none'
    answerCheck.textContent = 'Congradulations you got ' + numberCorrectAnswers + ' correct! Please leave initials or username for the Score Board'
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
                secondsLeft = 60 // this resets timer to 60 seconds for next attempt
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
topScores.addEventListener("click", function () { // this is the button to take you to the score screen
    topScores.style.display = 'none'
    startButton.style.display = 'none'
    returnToStart.style.display = 'block'
    returnToStart.textContent = 'Back to Review'
    clearScores.style.display = 'block'
    clearScores.textContent = 'Clear Scores'
    highScoreUl.style.display = 'block'
    const liElement = document.getElementById("ul")
    for (let i = 0; i < inputAndScore.length; i++) {// this for loop displays all scores made so far
        let lis = document.createElement("li")
        lis.textContent = inputAndScore[i].toLocaleString()
        liElement.appendChild(lis)
    }
})
returnToStart.addEventListener("click", function (event) {// this takes you back to the start screen from the score screen
    event.preventDefault()
    topScores.style.display = 'block'
    startButton.style.display = 'block'
    returnToStart.style.display = 'none'
    clearScores.style.display = 'none'
    highScoreUl.style.display = 'none'
    for (let i = 0; i < inputAndScore.length; i++) {// this for loop deletes all the scores off the screen to return to the start screen, it does not delete the scores stored in the inputAndScore array
        highScoreUl.removeChild(highScoreUl.firstElementChild);
    }
})
clearScores.addEventListener("click", function(event){ // this clears all the scores from the inputAndScore array 
    event.preventDefault()
    const emptyArray = []
    for (let i = 0; i < inputAndScore.length; i++) {// this for loop resets the li of displayed scores to let the user see the appearence that they have been deleted
        highScoreUl.removeChild(highScoreUl.firstElementChild);
    }
    inputAndScore = emptyArray // this makes the array inputAndScore blank again effectivly deleting the old scores and usernames 
    highScoreUl.style.display = 'none' // this rehides the ul that would cause an unwanted space otherwise
})





a.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault()
    function checkAnswer() {

        if (a.textContent == randomAnswer) {// this desides if the input answer is correct and adds one point if it is
            answerCheck.textContent = 'Correct!'
            questionChange()// this loads a new question if the answer is correct
            numberCorrectAnswers = numberCorrectAnswers + 1 
        } else {// if the answer given is not correct they loose 5 seconds and are topd they were wrong. this does not give the next question to allow the user to try again
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
b.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault() // this stops unwanted default actions from happening
    function checkAnswer() {

        if (b.textContent == randomAnswer) { // this desides if the input answer is correct and adds one point if it is
            answerCheck.textContent = 'Correct!'
            questionChange() // this loads a new question if the answer is correct
            numberCorrectAnswers = numberCorrectAnswers + 1 
        } else { // if the answer given is not correct they loose 5 seconds and are topd they were wrong. this does not give the next question to allow the user to try again
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
c.addEventListener("click", function (event) {//this executes the checks the selected answer to verify if the answer from the user is correct or not
    event.preventDefault()// this stops unwanted default actions from happening
    function checkAnswer() {

        if (c.textContent == randomAnswer) {// this desides if the input answer is correct and adds one point if it is
            answerCheck.textContent = 'Correct!'
            questionChange()// this loads a new question if the answer is correct
            numberCorrectAnswers = numberCorrectAnswers + 1
        } else {// if the answer given is not correct they loose 5 seconds and are topd they were wrong. this does not give the next question to allow the user to try again
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})
d.addEventListener("click", function (event) {//this executes the check answer function to verify if the answer from the user is correct or not
    event.preventDefault()// this stops unwanted default actions from happening
    function checkAnswer() {

        if (d.textContent == randomAnswer) {// this desides if the input answer is correct and adds one point if it is
            answerCheck.textContent = 'Correct!'
            questionChange()// this loads a new question if the answer is correct
            numberCorrectAnswers = numberCorrectAnswers + 1
        } else {// if the answer given is not correct they loose 5 seconds and are topd they were wrong. this does not give the next question to allow the user to try again
            answerCheck.textContent = 'Wrong'
            secondsLeft = secondsLeft - 5
        }
    }
    checkAnswer()
})