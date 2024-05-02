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
    let characterArchetypes = [];
    Object.entries(archetypeCounts).forEach(([archetype, count]) => {
        if (count > maxCount) {
            maxCount = count;
            characterArchetypes = [archetype];
        } else if (count === maxCount) {
            characterArchetypes.push(archetype);
        }
    });

    const resultElement = document.getElementById('result');
    let result = "Your character archetype is: ";
    if (characterArchetypes.length === 1) {
        result += characterArchetypes[0];
    } else {
        result += "a combination of ";
        result += characterArchetypes.join(" and ");
    }
    resultElement.textContent = result;

    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        let texts = document.getElementsByClassName("text");

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";

        setTimeout(showSlides, 15000);

        for (let i = 0; i < texts.length; i++) {
            texts[i].style.display = "none";
        }
        texts[slideIndex - 1].style.display = "block";
    }
});