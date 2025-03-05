// Multiplication facts for tables 2-5
const multiplicationFacts = [];
for (let i = 2; i <= 5; i++) {
    for (let j = 1; j <= 10; j++) {
        multiplicationFacts.push({ num1: i, num2: j, product: i * j });
    }
}

let score = 0;
let currentFact, correctAnswer;

const monster = document.getElementById('monster');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const feedbackDiv = document.getElementById('feedback');
const scoreDiv = document.getElementById('score');

// Start the game
generateProblem();

function generateProblem() {
    // Reset monster state
    monster.style.opacity = '1';
    monster.classList.remove('shake');
    feedbackDiv.textContent = '';

    // Pick a random multiplication fact
    currentFact = multiplicationFacts[Math.floor(Math.random() * multiplicationFacts.length)];
    correctAnswer = Math.floor(currentFact.product / currentFact.num1);

    // Generate question
    questionDiv.textContent = `The Slime Blob has ${currentFact.product} hit points. Your gun shoots ${currentFact.num1} bullets per shot. How many shots?`;

    // Generate 4 options
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = correctAnswer + Math.floor(Math.random() * 4) - 2;
        if (randomOption >= 1 && randomOption <= 10 && !options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    shuffleArray(options);

    // Display options
    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (selected === correctAnswer) {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        feedbackDiv.textContent = `Great job! ${currentFact.num1} × ${correctAnswer} = ${currentFact.product}`;
        animateBullets();
        monster.classList.add('shake');
        setTimeout(() => {
            monster.style.opacity = '0';
            setTimeout(generateProblem, 1000); // New problem after 1 second
        }, 500); // Fade out after bullets
    } else {
        feedbackDiv.textContent = `Oops! ${currentFact.num1} × ${correctAnswer} = ${currentFact.product}. Try again!`;
    }
}

function animateBullets() {
    const monsterRect = monster.getBoundingClientRect();
    const startX = monsterRect.left + monsterRect.width / 2;
    const startY = monsterRect.bottom;

    for (let i = 0; i < currentFact.num1; i++) {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${startX + (i * 15 - (currentFact.num1 * 7.5))}px`; // Spread bullets
        bullet.style.top = `${startY}px`;
        document.body.appendChild(bullet);
        setTimeout(() => bullet.remove(), 500); // Remove after animation
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
