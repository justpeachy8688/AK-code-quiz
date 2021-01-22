var startScreen = document.getElementById("start-screen")
var quizTimer = document.getElementById("timer")
var timeLeft = 76;
var timerInterval;
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
var score = 0;
var currentQuestionIndex = 0;
var correct;

//function onStartQuizClick() {
//     startScreen.classList.add("d-none")
//     quizBody.classList.remove("d-none")
//     // gameoverDiv.style.display = "none";
//     generateQuizQuestion();
// }

//Quiz Questions object
var quizQuestions = [{
    question: "In 1867, what was the cost (per acre) that the United States purchased Alaska for?",
    choiceA: "$1,000",
    choiceB: "$0.02",
    choiceC: "$350",
    choiceD: "$5",
    correctAnswer: "b"
},
{
    question: "What is the tallest peak in Alaska?",
    choiceA: "Mount Foraker",
    choiceB: "Mount Saint Elias",
    choiceC: "Redoubt",
    choiceD: "Denali",
    correctAnswer: "d"
},
{
    question: "What is Alaska's capitol city that is only accessible by boat or plane?",
    choiceA: "Juneau",
    choiceB: "Anchorage",
    choiceC: "Fairbanks",
    choiceD: "Seward",
    correctAnswer: "a"
},
{
    question: "What is Alaska's state bird?",
    choiceA: "Puffin",
    choiceB: "Ptarmigan",
    choiceC: "Raven",
    choiceD: "Seagull",
    correctAnswer: "b"
},
{
    question: "What is the state sport of Alaska?",
    choiceA: "Hockey",
    choiceB: "Baseball",
    choiceC: "Dog Mushing",
    choiceD: "Bear Wrestling",
    correctAnswer: "c"
},
{
    question: "Approximately, how many lakes are there in Alaska?",
    choiceA: "50",
    choiceB: "26",
    choiceC: "3",
    choiceD: "3,000,000",
    correctAnswer: "d"
},
{
    question: "The ony battle in WWII to take place on American soil happened on what Alaskan island?",
    choiceA: "Kodiak",
    choiceB: "Attu",
    choiceC: "Barter",
    choiceD: "Fox Island",
    correctAnswer: "b"
},
];

function generateQuizQuestion() {
    // gameoverDiv.style.display = "none";
    if (currentQuestionIndex === quizQuestions.length) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz() {
    startScreen.classList.add("d-none")
    quizBody.classList.remove("d-none")

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
}

function showScore() {
    quizBody.classList.add("d-none")
    gameoverDiv.removeAttribute("class")
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
    highscoreContainer.removeAttribute("class")

    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        }
    };


    //highscoreContainer.style.display = "flex";
    //highscoreDiv.style.display = "block";
    //endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
}
);

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    };
};

//function showHighscore() {
//startQuizDiv.style.display = "none"
//gameoverDiv.style.display = "none";
//highscoreContainer.style.display = "flex";
//highscoreDiv.style.display = "block";
//endGameBtns.style.display = "flex";

//generateHighscores();
//}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
    location.reload();
}

function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct) {
        score++;
        alert("That Is Correct!");

        //display in the results div that the answer is correct.
    } else {
        alert("That Is Incorrect.")

        //display in the results div that the answer is wrong.
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === quizQuestions.length) {
        showScore();

    } else {
        generateQuizQuestion();

    }
    console.log(currentQuestionIndex)
}
startQuizButton.addEventListener("click", startQuiz);