const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const choiceContainer = document.querySelector('.choice-container');
const timerEl = document.getElementById('timer');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: 'What does HTML stand for?',
		choice1: 'Hyper Text MarkUp Language',
		choice2: 'Hurry Time Marker Low',
		choice3: 'High Tech Modem Language',
		choice4: 'Hype Texts Managing Life',
		answer: 1,
	},
	{
		question:
			'String values must be enclosed within ______ when being assigned to variables.',
		choice1: 'Curly Brackets',
		choice2: 'Commas',
		choice3: 'Quotes',
		choice4: 'Parenthesis',
		answer: 1,
	},
	{
		question: 'Commonly used data types DO NOT inclde:',
		choice1: 'Strings',
		choice2: 'Alerts',
		choice3: 'Booleans',
		choice4: 'Numbers',
		answer: 3,
	},
	{
		question:
			'The condition in an if / else statement is enclosed with ______.',
		choice1: 'Quotes',
		choice2: 'Curly Brackets',
		choice3: 'Parenthesis',
		choice4: 'Square Brackets',
		answer: 3,
	},
	{
		question: 'Arrays in JavaScript can be used to store _______.',
		choice1: 'Booleans',
		choice2: 'Other arrays',
		choice3: 'Numbers and strings',
		choice4: 'all of the above',
		answer: 4,
	},
];

// const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;
const CORRECT_BONUS = 10;
const TIME_DOWN = -10;

function countdown() {
	var timeLeft = 60;
	// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
	var timeInterval = setInterval(function () {
		// As long as the `timeLeft` is greater than 1
		if (timeLeft > 1) {
			// Set the `textContent` of `timerEl` to show the remaining seconds
			timerEl.textContent = 'Time Left: ' + timeLeft + ' seconds remaining';
			// Decrement `timeLeft` by 1
			timeLeft--;
		} else if (timeLeft === 1) {
			// When `timeLeft` is equal to 1, rename to ‘second’ instead of ‘seconds’
			timerEl.textContent = 'Time Left: ' + timeLeft + ' second remaining';
			timeLeft--;
		} else {
			// Once `timeLeft` gets to 0, set `timerEl` to an empty string
			timerEl.textContent = '';
			// Use `clearInterval()` to stop the timer
			clearInterval(timeInterval);
			// Call the `displayMessage()` function
			displayMessage();
		}
	}, 1000);
}

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

decreaseScore = (num) => {
	score -= num;
	scoreText.innerText = score;
};

decreaseTime = (num) => {
	timerEl -= 10;
};


startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('./end.html');
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;

		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToApply === 'correct') {
			incrementScore(CORRECT_BONUS);
		}

		if (classToApply === 'incorrect') {
			decreaseScore(CORRECT_BONUS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});


countdown();
startGame();
