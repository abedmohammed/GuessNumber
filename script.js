'use strict';

let numberToGuess;
let score;
let gameOver;
let highScore = 0;
const element = document.body;

//start game
restart();

//handle button clicks
document.querySelector('.check').addEventListener('click', evalState);
document.querySelector('.again').addEventListener('click', restart);

//reset game state
function restart() {
  numberToGuess = Math.trunc(Math.random() * 20) + 1;
  gameOver = false;
  score = 10;

  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = score;
  element.classList.remove('backWin');
  element.classList.add('back');
}

//game logic
function evalState() {
  const guess = Number(document.querySelector('.guess').value);

  if (gameOver) {
    //no input
  } else if (!guess) {
    displayMessage('🚫 No Number!');

    //lost game
  } else if (guess !== numberToGuess && score <= 1) {
    gameOver = true;
    score--;

    displayMessage('💣 You Lost!');
    //won game
  } else if (guess === numberToGuess) {
    gameOver = true;

    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = numberToGuess;
    document.querySelector('.number').style.width = '30rem';
    element.classList.remove('back');
    element.classList.add('backWin');

    if (highScore < score) highScore = score;
    document.querySelector('.highscore').textContent = highScore;

    //guess too high
  } else if (guess > numberToGuess) {
    displayMessage('📈 Too High!');
    score--;

    //guess too low
  } else if (guess < numberToGuess) {
    displayMessage('📉 Too Low!');
    score--;
  }

  document.querySelector('.score').textContent = score;
}

//display message
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}
