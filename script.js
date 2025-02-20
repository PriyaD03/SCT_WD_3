const questions = [
    {
        type: 'multiple-choice',
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        type: 'multiple-choice',
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        type: 'fill-in-the-blank',
        question: "The Eiffel Tower is located in _____.",
        correctAnswer: "Paris"
    },
    {
        type: 'multiple-choice',
        question: "Which programming language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correctAnswer: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const fillInContainer = document.getElementById('fill-in-container');
const nextButton = document.getElementById('next-button');
const scoreText = document.getElementById('score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Reset previous answers
    answersContainer.innerHTML = '';
    fillInContainer.style.display = 'none';

    questionContainer.textContent = currentQuestion.question;

    if (currentQuestion.type === 'multiple-choice') {
        // Show multiple-choice options
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            answersContainer.appendChild(button);
        });
    } else if (currentQuestion.type === 'fill-in-the-blank') {
        // Show fill-in-the-blank input
        fillInContainer.style.display = 'block';
        nextButton.onclick = () => checkFillInAnswer();
    }

    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }
    nextQuestion();
}

function checkFillInAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = document.getElementById('fill-in-answer').value.trim();
    if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.textContent = 'Quiz Complete!';
    answersContainer.innerHTML = '';
    fillInContainer.style.display = 'none';
    nextButton.style.display = 'none';
    scoreText.textContent = `Your score: ${score} out of ${questions.length}`;
}

nextButton.onclick = nextQuestion;

loadQuestion();