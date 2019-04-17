const wordsArray = [
  "love",
  "andrew",
  "charlie",
  "oliver",
  "family",
  "hazel",
  "adventures",
  "marriage",
  "hubby",
  "wifey"
];

const word = document.getElementById("word");
const input = document.getElementById("input");
const board = document.getElementById("board");
const round = document.getElementById("round");
const lifecount = document.getElementById("lifecount");
const newGameBtn = document.getElementById("new-game-btn");
let wordInPlay;
let hiddenLettersArray = [];
let number = 0; // number to figure out when round is over
let roundNumber = 1;
let lives = 5;
let pressedKeyHistory = {};

// REVEAL GAMEBOARD function
function revealBoard() {
  board.removeAttribute("style");
  board.setAttribute("style", "z-index: 1000");
}

// PICK RANDOM WORD function
function pickRandomWord() {
  wordInPlayIndex = Math.floor(Math.random() * Math.floor(wordsArray.length));
  wordInPlay = [...wordsArray[wordInPlayIndex]];
  console.log(wordInPlay, wordInPlayIndex);
}

// DISPLAY HIDDEN WORD function
function displayNewHiddenWord() {
  hiddenLettersArray = [];
  for (char of wordInPlay) {
    hiddenLettersArray.push("_ ");
  }
  word.textContent = hiddenLettersArray.join("");
}

// function TO FIGURE OUT IF CHAR IS APPROPRIATE
function letterInUse() {
  event.preventDefault();
  let inputCharCode = input.value.toLowerCase().charCodeAt();

  if (
    !pressedKeyHistory[input.value.toLowerCase()] &&
    97 <= inputCharCode &&
    inputCharCode <= 122
  ) {
    pressedKeyHistory[input.value.toLowerCase()] = inputCharCode;
    letterExist();
  } else {
    input.value = "";
    return null;
  }

  input.value = "";
}

// LIFECOUNT function
function letterExist() {
  event.preventDefault();
  if (wordInPlay.indexOf(input.value.toLowerCase()) >= 0) {
    guessLetter();
  } else {
    lives--;
    lifecount.innerHTML = "Lives left: " + lives;
    window.setTimeout(gameOver, 500);
  }
}

// GUESS LETTER function
function guessLetter() {
  event.preventDefault();

  for (let i = 0; i < wordInPlay.length; i++) {
    if (wordInPlay[i] === input.value.toLowerCase()) {
      hiddenLettersArray[i] = wordInPlay[i];
      word.textContent = hiddenLettersArray.join("");
      window.setTimeout(nextRound, 800);
    }
  }
  window.setTimeout(gameOver, 500);
  input.value = "";
}

// NEXT ROUND function
function nextRound() {
  number += 1;
  if (number === wordInPlay.length) {
    alert("You won this round!");
    pickRandomWord();
    displayNewHiddenWord();
    number = 0;
    roundNumber += 1;
    round.innerHTML = "Round: " + roundNumber;
    pressedKeyHistory = {};
  }
}

// GAME OVER function
function gameOver() {
  if (lives === 0) {
    alert(`Game Over! The hidden word is "${wordInPlay.join("")}"`);
    board.setAttribute("style", "display:none");
    newGameBtn.setAttribute("style", "opacity: 1; transition: all .5s ease-in");
  }
}

function exitGame() {
  board.setAttribute("style", "display:none");
  newGameBtn.setAttribute("style", "opacity: 1; transition: all .5s ease-in");
}

// START NEW GAME function
function startGame() {
  roundNumber = 1;
  round.innerHTML = "Round: " + roundNumber;
  lives = 5;
  lifecount.innerHTML = "Lives left: " + lives;
  number = 0;
  pressedKeyHistory = {};
  revealBoard();
  pickRandomWord();
  displayNewHiddenWord();
  newGameBtn.setAttribute(
    "style",
    "opacity: 0; transition: all 2s ease-out; z-index: -1000"
  );
}
