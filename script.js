document.addEventListener("DOMContentLoaded", function() {
    const characterImages = [
        './img/assassin (2).jpg',
        './img/assassin.jpg',
        './img/demon.jpg',
        './img/goblin.jpg',
        './img/king.jpg',
        './img/knight (2).jpg',
        './img/knight.jpg',
        './img/wizard.jpg'
    ];
    const numCharacters = characterImages.length;
    const background = document.getElementById('background');

    for (let i = 0; i < numCharacters; i++) {
        const character = document.createElement('div');
        character.classList.add('character');
        character.style.backgroundImage = `url('${characterImages[i]}')`;
        character.style.top = Math.random() * window.innerHeight + 'px';
        character.style.left = Math.random() * window.innerWidth + 'px';
        character.style.animationDuration = (Math.random() * 10 + 5) + 's';
        background.appendChild(character);
    }
});