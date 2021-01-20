var startScreen = document.getElementById("start-screen")
var scoreSubmission = document.getElementById("score-submission")
var quizTimer = document.getElementById("timer")
var timeLeft = 76;
var timerInterval;
document.getElementById("start-button").addEventListener("click", onStartQuizClick)
var questionsEl = document.getElementById("questions");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result")
var finalScoreEl = document.getElementById("finalScore")
var gameoverDiv = document.getElementById("gameover");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var startQuizDiv = document.getElementById("start-screen");
var startQuizButton = document.getElementById("start-button");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var startQuizButton = document.getElementById("startbtn");
var score = 0;
var currentQuestionIndex = 0;
var finalQuestionIndex = quizQuestions.length;
var correct;

function onStartQuizClick() {
    startScreen.classList.add("d-none")
    scoreSubmission.classList.remove("d-none")
    gameoverDiv.style.display = "none";
    generateQuizQuestion();
}

//Quiz Questions object
var quizQuestions = [{
    question: "In 1867, what was the cost (per acre) that the United States purchased Alaska for?",
    choiceA: "$1,000",
    choiceB: "$0.02",
    choiceC: "$350",
    choiceD: "$5",
    correctAnswer: "B"
},
{
    question: "What is the tallest peak in Alaska?",
    choiceA: "Mount Foraker",
    choiceB: "Mount Saint Elias",
    choiceC: "Redoubt",
    choiceD: "Denali",
    correctAnswer: "D"
},
{
    question: "What is Alaska's capitol city that is only accessible by boat or plane?",
    choiceA: "Juneau",
    choiceB: "Anchorage",
    choiceC: "Fairbanks",
    choiceD: "Seward",
    correctAnswer: "A"
},
{
    question: "What is Alaska's state bird?",
    choiceA: "Puffin",
    choiceB: "Ptarmigan",
    choiceC: "Raven",
    choiceD: "Seagull",
    correctAnswer: "B"
},
{
    question: "What is the state sport of Alaska?",
    choiceA: "Hockey",
    choiceB: "Baseball",
    choiceC: "Dog Mushing",
    choiceD: "Bear Wrestling",
    correctAnswer: "C"
},
{
    question: "Approximately, how many lakes are there in Alaska?",
    choiceA: "50",
    choiceB: "26",
    choiceC: "3",
    choiceD: "3,000,000",
    correctAnswer: "D"
},
{
    question: "The ony battle in WWII to take place on American soil happened on what Alaskan island?",
    choiceA: "Kodiak",
    choiceB: "Attu",
    choiceC: "Barter",
    choiceD: "Fox Island",
    correctAnswer: "B"
},
];

function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";

    function showScore() {
        quizBody.style.display = "none"
        gameoverDiv.style.display = "flex";
        clearInterval(timerInterval);
        highscoreInputName.value = "";
        finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
    }

    submitScoreBtn.addEventListener("click", function highscore() {


        if (highscoreInputName.value === "") {
            alert("Initials cannot be blank");
            return false;
        } else {
            var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
            var currentUser = highscoreInputName.value.trim();
            var currentHighscore = {
                name: currentUser,
                score: score
            };

            gameoverDiv.style.display = "none";
            highscoreContainer.style.display = "flex";
            highscoreDiv.style.display = "block";
            endGameBtns.style.display = "flex";

            savedHighscores.push(currentHighscore);
            localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
            generateHighscores();

        }

    });