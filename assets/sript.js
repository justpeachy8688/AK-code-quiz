var startScreen = document.getElementById("start-screen")
var scoreSubmission = document.getElementById("score-submission")

function onStartQuizClick() {
    startScreen.classList.add("d-none")
    scoreSubmission.classList.remove("d-none")
}

document.getElementById("start-button").addEventListener("click", onStartQuizClick)


//Questions
var quizQuestions = [{
    question: ""
    question: ""
    question: ""
    question: ""
    question: ""
    question: ""
    question: ""
}]
//In 1867, what was the cost (per acre) that the United States purchased Alaska for?
//What is the tallest peak in Alaska?
//What is Alaska's capitol city that is only accessible by boat or plane?
//What is Alaska's state bird?
//What is the state sport of Alaska?
//Approximately, how many lakes are there in Alaska?
//The ony battle in WWII to take place on American soil happened on what Alaskan island?


//submit button