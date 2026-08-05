// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "Which team has won the most NBA championships?",
    answers: [
      { text: "Chicago Bulls", correct: false },
      { text: "Los Angeles Lakers", correct: false },
      { text: "Boston Celtics", correct: true },
      { text: "Golden State Warriors", correct: false },
    ],
  },
  {
    question: "Who holds the NBA record for the most career three-pointers made?",
    answers: [
      { text: "Ray Allen", correct: false },
      { text: "Stephen Curry", correct: true },
      { text: "Reggie Miller", correct: false },
      { text: "Klay Thompson", correct: false },
    ],
  },
  {
    question: "How many points is a touchdown worth?",
    answers: [
      { text: "3", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: false },
      { text: "6", correct: true },
    ],
  },
  {
    question: "Which quarterback has won the most Super Bowls?",
    answers: [
      { text: "Terry Bradshaw", correct: false },
      { text: "Joe Montana", correct: false },
      { text: "Tom Brady", correct: true },
      { text: "Patrick Mahomes", correct: false },
    ],
  },
  {
    question: "How many players does each team have on the field during a play?",
    answers: [
      { text: "11", correct: true },
      { text: "10", correct: false },
      { text: "7", correct: false },
      { text: "9", correct: false },
    ],
  },
];

// Quiz State Variables 
let currentQuestionIndex=0;
let score=0;
let answersDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset variables
  currentQuestionIndex=0;
  score=0;
  scoreSpan.textContent=score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled=false;
    const currentQuestion=quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progressPercent=(currentQuestionIndex/quizQuestions.length) * 100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent=currentQuestion.question;
    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct=answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });

}

function selectAnswer(event) {
    if(answersDisabled) {
      return;
    }
    answersDisabled=true;
    const selectedButton=event.target;
    const isCorrect=selectedButton.dataset.correct ==="true";

    Array.from(answersContainer.children).forEach(button => {
      if(button.dataset.correct ==="true") {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
    });

    if(isCorrect) {
      score++;
      scoreSpan.textContent=score;
    }
}

function restartQuiz() {
  console.log("Quiz Restarted");
}