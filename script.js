document.addEventListener("DOMContentLoaded", function() {
const homePage = document.getElementById("home-page");
const gamePage = document.getElementById("game-page");
const endPage = document.getElementById("end-page");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const questionDiv = document.getElementById("question");
const answerInput = document.getElementById("answer");
const timerDiv = document.getElementById("time-left");
const feedbackDiv = document.getElementById("feedback");
const rightAnswersDiv = document.getElementById("rightAnswers");
const wrongAnswersDiv = document.getElementById("wrongAnswers");

let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let timer;
let timeLeft;

let question;
let answer;

let rightAnswers;
let wrongAnswers;

function showPage(page) {
    homePage.style.display = "none";
    gamePage.style.display = "none";
    endPage.style.display = "none";
    page.style.display = "block";
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 8) + 2; // Tabla del 2 al 9
    const num2 = Math.floor(Math.random() * 8) + 2;
    question = `${num1} × ${num2}`;
    answer = num1 * num2;
}

function startGame() {
    showPage(gamePage);
    score = 0;
    rightAnswers = 0;
    wrongAnswers = 0;
    askQuestion();
}

function updateTimer() {
    timeLeft--;
    timerDiv.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        endGame();
    }
}

function askQuestion() {
    generateQuestion();
    questionDiv.textContent = question;
    answerInput.value = "";
    answerInput.focus();
    timeLeft = 10; // 15 seconds to answer
    timerDiv.textContent = timeLeft;
    timer = setInterval(updateTimer, 1000);

    submitBtn.addEventListener("click", submitHandler);
    answerInput.addEventListener("keypress", keypressHandler);
}

function submitHandler() {
    checkAnswer(answer);
}

function keypressHandler(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer(answer);
    }
}

function checkAnswer(correctAnswer) {
    const userAnswer = parseInt(answerInput.value);
    
    if (userAnswer === correctAnswer) {
        feedbackDiv.textContent = "Great!";
        rightAnswers++;
        score += 1 + timeLeft;
    } else {
        feedbackDiv.textContent = `The right answer is : ${correctAnswer}`;
        wrongAnswers++;
    }
    rightAnswersDiv.textContent = rightAnswers;
    wrongAnswersDiv.textContent = wrongAnswers;

    clearInterval(timer);
    askQuestion();
}

function endGame() {
    showPage(endPage);

    rightAnswersDiv.textContent = 0;
    wrongAnswersDiv.textContent = 0;

    if (score > bestScore) {
        document.getElementById("score-final").textContent = score;
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("best-score").textContent = bestScore;
    } else {
        document.getElementById("score-final").textContent = score;
        if (score < 0) {
            document.getElementById("score-final").style.color = "red";
        }
    }

    submitBtn.removeEventListener("click", submitHandler);
    answerInput.removeEventListener("keypress", keypressHandler);
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

showPage(homePage);
});