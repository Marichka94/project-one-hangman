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
const livesLeft = document.getElementById("livesLeft");
let wordInPlay;
let hiddenLettersArray = [];
let number = 0; // number to figure out when round is over
let roundNumber = 1;
let lives = 5;
let pressedKeyHistory = {};

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
    guessLetter();
    console.log(pressedKeyHistory);
  } else {
    console.log(input.value.toLowerCase().charCodeAt());
    input.value = "";
    return null;
  }

  input.value = "";
}

// REVEAL GAMEBOARD function
function revealBoard() {
  board.removeAttribute("class");
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
  gameOver();
  input.value = "";
}

// NEXT ROUND function
function nextRound() {
  number += 1;
  if (number === wordInPlay.length) {
    alert("you win this round");
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
    alert("Game Over!");
    startGame();
  }
}

// START NEW GAME function
function startGame() {
  roundNumber = 1;
  round.innerHTML = "Round: " + roundNumber;
  lives = 5;
  livesLeft.innerHTML = "Lives left: " + lives;
  number = 0;
  pressedKeyHistory = {};
  revealBoard();
  pickRandomWord();
  displayNewHiddenWord();
}
