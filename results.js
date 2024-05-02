document.addEventListener("DOMContentLoaded", function() {
    const answers = JSON.parse(localStorage.getItem('answers'));
    const questions = JSON.parse(localStorage.getItem('questions'));

    const archetypeOptions = {
        "Wizard": [0, 0, 3, 2, 2, 3, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5],
        "Knight": [3, 0, 3, 0, 1, 1, 0, 0, 1, 1, 1, 1, 4, 1, 0, 1, 3, 1],
        "Goblin": [3, 3, 1, 1, 1, 2, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3],
        "King": [0, 1, 1, 1, 0, 0, 4, 3, 3, 2, 0, 4, 1, 0, 4, 2, 2, 2],
        "Queen": [1, 1, 1, 0, 0, 0, 1, 1, 0, 3, 3, 0, 0, 4, 2, 0, 0, 0],
        "Assassin": [2, 2, 2, 3, 3, 0, 2, 2, 2, 5, 2, 2, 2, 2, 1, 4, 1, 4]
    };

    const archetypeImages = {
        "Wizard": "img/wizard.jpg",
        "Knight": "img/knight.jpg",
        "Goblin": "img/goblin.jpg",
        "King": "img/king.jpg",
        "Queen": "img/queen.jpg",
        "Assassin": "img/assassin.jpg"
    };

    let archetypeCounts = {};

    for (const archetype in archetypeOptions) {
        archetypeCounts[archetype] = 0;
    }

    answers.forEach((answer, index) => {
        Object.entries(archetypeOptions).forEach(([archetype, options]) => {
            if (options.includes(parseInt(answer))) {
                archetypeCounts[archetype]++;
            }
        });
    });

    let maxCount = 0;
    let dominantArchetype = null;
    for (const [archetype, count] of Object.entries(archetypeCounts)) {
        if (count > maxCount) {
            maxCount = count;
            dominantArchetype = archetype;
        }
    }

    const resultElement = document.getElementById('result');
    let resultText = "Your character archetype is: " + dominantArchetype;
    resultElement.textContent = resultText;

    const resultImageElement = document.getElementById('result-image');

    if (dominantArchetype && archetypeImages.hasOwnProperty(dominantArchetype)) {
        resultImageElement.src = archetypeImages[dominantArchetype];
        resultImageElement.style.display = "block"; // Display the image container
    } else {
        resultElement.textContent = "Result image not found!";
    }
});