function checkAnswer(userAnswer) {
    const correctAnswer = 4; // For 3 × 4 = 12
    const feedback = document.getElementById("feedback");
    const monster = document.getElementById("monster");

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Great job! 3 × 4 = 12. The Slime Blob is defeated!";
        monster.classList.add("hit-animation");
        setTimeout(() => monster.style.opacity = "0", 500); // Fade out monster
    } else {
        feedback.textContent = `Oops! 3 × ${userAnswer} = ${3 * userAnswer}. Try again!`;
        monster.classList.add("hit-animation");
        setTimeout(() => monster.classList.remove("hit-animation"), 300);
    }
}
