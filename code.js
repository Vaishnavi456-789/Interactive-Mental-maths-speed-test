let score = 0;
let correct = 0;
let totalQuestions = 0;

let timeLeft = 60;
let timer;

let correctAnswer;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const feedback = document.getElementById("feedback");

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");


// Start the test
startBtn.addEventListener("click", startTest);


function startTest() {

    score = 0;
    correct = 0;
    totalQuestions = 0;

    timeLeft = 60;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    questionNumber.textContent = totalQuestions;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    answer.focus();

    generateQuestion();

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endTest();
        }

    }, 1000);
}


// Generate random maths question
function generateQuestion() {

    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;

    const operations = ["+", "-", "×"];

    let operation =
        operations[Math.floor(Math.random() * operations.length)];


    if (operation === "+") {

        correctAnswer = num1 + num2;

    } else if (operation === "-") {

        // Avoid negative answers
        if (num2 > num1) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }

        correctAnswer = num1 - num2;

    } else {

        correctAnswer = num1 * num2;
    }


    question.textContent =
        `${num1} ${operation} ${num2} = ?`;

    answer.value = "";

    feedback.textContent = "";

    questionNumber.textContent = totalQuestions + 1;
}


// Check answer
submitBtn.addEventListener("click", checkAnswer);


function checkAnswer() {

    if (timeLeft <= 0) {
        return;
    }

    const userAnswer = Number(answer.value);

    if (answer.value.trim() === "") {
        feedback.textContent = "Please enter an answer.";
        return;
    }


    totalQuestions++;


    if (userAnswer === correctAnswer) {

        correct++;

        score += 10;

        feedback.textContent = "✅ Correct!";

    } else {

        feedback.textContent =
            `❌ Wrong! Correct answer was ${correctAnswer}`;

    }


    scoreDisplay.textContent = score;

    setTimeout(() => {

        if (timeLeft > 0) {
            generateQuestion();
        }

    }, 400);
}


// End test
function endTest() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");


    document.getElementById("finalScore").textContent = score;

    document.getElementById("correctAnswers").textContent = correct;

    document.getElementById("totalQuestions").textContent =
        totalQuestions;


    let accuracy = 0;

    if (totalQuestions > 0) {
        accuracy =
            Math.round((correct / totalQuestions) * 100);
    }


    document.getElementById("accuracy").textContent =
        accuracy + "%";
}


// Restart test
restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

});