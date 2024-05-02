document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            question: "Which element would you master as a wizard?",
            options: ["Fire", "Water", "Air", "Earth"],
        },
        {
            question: "As a knight, what weapon would you wield?",
            options: ["Sword", "Axe", "Mace", "Spear"],
        },
        {
            question: "What's your preferred mode of transportation as a goblin?",
            options: ["Running", "Riding a wolf", "Climbing", "Teleportation"],
        },
        {
            question: "As a ruler, what's your approach to governance?",
            options: ["Fair and just", "Authoritarian", "Democratic", "Mysterious and enigmatic"],
        },
        {
            question: "What's your preferred attire as a queen?",
            options: ["Regal gown", "Armor", "Robes of secrecy", "Elegant suit"],
        },
        {
            question: "What's your preferred method of eliminating targets as an assassin?",
            options: ["Poison", "Stealthy blade", "Explosives", "Mind control"],
        },
        {
            question: "Which trait best describes you?",
            options: ["Courageous", "Loyal", "Cunning", "Sneaky", "Sinister", "Intelligent"],
        },
        {
            question: "What's your preferred weapon in combat?",
            options: ["Sword", "Shield", "Dagger", "Traps", "Claws", "Staff"],
        },
        {
            question: "What's your typical role in a group setting?",
            options: ["Leader", "Protector", "Spy", "Scout", "Instigator", "Strategist"],
        },
        {
            question: "How do you handle conflicts?",
            options: ["Resolve diplomatically", "Fight head-on", "Manipulate from the shadows", "Avoid confrontation", "Stir chaos", "Outsmart opponents"],
        },
        {
            question: "What motivates you the most?",
            options: ["Power", "Honor", "Wealth", "Survival", "Destruction", "Knowledge"],
        },
        {
            question: "What's your preferred environment?",
            options: ["Castle", "Battlefield", "Dark alley", "Forest", "Hellish landscape", "Library or laboratory"],
        },
        {
            question: "How do you deal with betrayal?",
            options: ["Forgive and move on", "Seek revenge", "Plan a cunning retaliation", "Betray others first", "Embrace it", "Outsmart the betrayer"],
        },
        {
            question: "What's your view on authority?",
            options: ["Deserve respect", "Serve honorably", "Challenge it", "Ignore it", "Subvert it", "Seek to control it"],
        },
        {
            question: "How do you prefer to spend your free time?",
            options: ["Training", "Adventuring", "Planning", "Causing mischief", "Spreading chaos", "Studying"],
        },
        {
            question: "What's your preferred method of travel?",
            options: ["Royal carriage", "Horseback", "In disguise", "Through shadows", "Teleportation", "Magical portal"],
        },
        {
            question: "What's your relationship with magic?",
            options: ["Master it", "Use enchanted weapons", "Utilize dark magic", "Fear it", "Embrace demonic powers", "Study it intensely"],
        },
        {
            question: "How do you inspire loyalty?",
            options: ["Through charisma", "By leading by example", "By offering rewards", "By instilling fear", "By dominating others", "By sharing knowledge"],
        },
    ];

    let currentQuestion = 0;
    let answers = [];

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submitBtn');

    function loadQuestion() {
        const q = questions[currentQuestion];
        questionElement.textContent = q.question;
        optionsElement.innerHTML = '';
    
        q.options.forEach((option, index) => {
            const optionElement = document.createElement('input');
            optionElement.type = 'radio';
            optionElement.name = 'option';
            optionElement.value = index;
            optionsElement.appendChild(optionElement);
    
            const labelElement = document.createElement('label');
            labelElement.textContent = option;
            optionsElement.appendChild(labelElement);
    
            optionsElement.appendChild(document.createElement('br'));
        });
    }
    
    function calculateResult() {
        const archetypeCounts = {
            "Wizard": 0,
            "Knight": 0,
            "Goblin": 0,
            "King": 0,
            "Queen": 0,
            "Assassin": 0
        };
    
        const archetypeOptions = {
            "Wizard": [0, 0, 3, 2, 2, 3, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5],
            "Knight": [3, 0, 3, 0, 1, 1, 0, 0, 1, 1, 1, 1, 4, 1, 0, 1, 3, 1],
            "Goblin": [3, 3, 1, 1, 1, 2, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3],
            "King": [0, 1, 1, 1, 0, 0, 4, 3, 3, 2, 0, 4, 1, 0, 4, 2, 2, 2],
            "Queen": [1, 1, 1, 0, 0, 0, 1, 1, 0, 3, 3, 0, 0, 4, 2, 0, 0, 0],
            "Assassin": [2, 2, 2, 3, 3, 0, 2, 2, 2, 5, 2, 2, 2, 2, 1, 4, 1, 4]
        };
    
        answers.forEach((answer, index) => {
            Object.entries(archetypeOptions).forEach(([archetype, options]) => {
                if (options.includes(parseInt(answer))) {
                    archetypeCounts[archetype]++;
                }
            });
        });
    
        let maxCount = 0;
        let dominantArchetype = null;
        Object.entries(archetypeCounts).forEach(([archetype, count]) => {
            if (count > maxCount) {
                maxCount = count;
                dominantArchetype = archetype;
            }
        });
    
        const resultElement = document.getElementById('result');
        resultElement.textContent = "Your character archetype is: " + dominantArchetype;
    
        const imageElement = document.createElement('img');
        imageElement.src = "./img/" + dominantArchetype.toLowerCase() + ".jpg";
        imageElement.alt = "Character Archetype Image";
        resultElement.appendChild(imageElement);
    
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('questions', JSON.stringify(questions));
    }
    
    function submitHandler() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            answers.push(selectedOption.value);
            currentQuestion++;
    
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                calculateResult();
                window.location.href = 'results.html';
            }
        } else {
            alert('Please select an option!');
        }
    }
    
    submitButton.addEventListener('click', submitHandler);
    
    loadQuestion();
});