const groounds = document.querySelectorAll('.ground');
const moles = document.querySelectorAll('.mole');
let interval;
let timerInSec = 5
let score = 0;

function startGame() {
    setScore();
    setUpMoles();
    peep();
}

function endGame() {
    // setTimeout(() => {
    clearInterval(interval);
    saveScore();
    cleanupMoles();
    // }, timerInSec * 1000);
}

function saveScore() {
    localStorage.setItem('hScore', JSON.stringify({ score: score, timerInSec: timerInSec }))
}

/**
 * generates random number between the given minimum and maximum limits
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function randomeNumberGenerator(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function peep() {
    clearInterval(interval);
    const moleIndex = randomeNumberGenerator(0, moles.length - 1);
    console.log('mole to peep: ', moleIndex);
    moles[moleIndex].classList.add('up');

    interval = setInterval(() => {
        moles[moleIndex].classList.remove('up');
        peep();
        showTime(timerInSec--);
    }, 1000)
}

function showTime(secs) {
    if (secs <= 0) {
        endGame();
    }
    let mins = Math.floor(secs / 60);
    let remainingSecs = secs % 60;
    const timeNode = document.querySelector('.time > h3 > span');
    // console.log(timeNode, mins, remainingSecs);
    timeNode.textContent = `${santizeTimeDisplay(mins)} : ${santizeTimeDisplay(remainingSecs)}`
}

function setScore() {
    const scoreSpan = document.querySelector('.time > .score > span');
    scoreSpan.textContent = '' + score;
}

function santizeTimeDisplay(time) {
    return time < 10 ? `0${time}` : time;
}

function setUpMoles() {
    moles.forEach(x => x.addEventListener('click', onClickMole));
}

function cleanupMoles() {
    moles.forEach(x => x.removeEventListener('click', onRemoveClick));
}

function onClickMole(e) {
    e.preventDefault();
    console.log(e);
    if (!e.isTrusted) {
        console.log('cheater!');
    }
    ++score;
    console.log('caught a mole');
    setScore();
}

function onRemoveClick(e){
    console.log('Ah! the game is over!');
}

startGame();
// endGame();