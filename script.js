const word = document.getElementById("word");
const input = document.getElementById("input");
const board = document.getElementById("board");
const round = document.getElementById("round");
const lifecount = document.getElementById("lifecount");
const newGameBtn = document.getElementById("new-game-btn");
const hint = document.getElementById("hint");
let wordInPlay;
let hiddenLettersArray = [];
let number = 0; // number to figure out when round is over
let roundNumber = 1;
let lives = 5;
let pressedKeyHistory = {};

// CONNECT API

// REVEAL GAMEBOARD function
function revealBoard() {
  board.removeAttribute("style");
  board.setAttribute("style", "z-index: 1000");
}

// PICK RANDOM WORD function
function pickRandomWord() {
  fetch(
    "https://wordsapiv1.p.rapidapi.com/words/?random=true&frequencymax=5&letterPattern=^[a-z]{3,8}$",
    {
      method: "get",
      headers: {
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        "X-RapidAPI-Key": "3308a4d56emsheca7117613a12c3p1e0e5cjsn8ca39034f796"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      let testRegex = /^[a-zA-Z]{1,10}$/;
      if (testRegex.test(data.word)) {
        wordInPlay = [...data.word];
        hint.innerHTML = "Hint not available";
        showDefinition();
        console.log(wordInPlay);
      } else {
        console.log("bad word");
        pickRandomWord();
      }
    })
    .then(displayNewHiddenWord)
    .catch(error => console.log("error is", error));
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
  newGameBtn.setAttribute(
    "style",
    "opacity: 0; transition: all 2s ease-out; z-index: -1000"
  );
  revealBoard();
  pickRandomWord();
}

// DISPLAY HINT function
function showDefinition() {
  fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordInPlay.join("")}`, {
    method: "get",
    headers: {
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      "X-RapidAPI-Key": "3308a4d56emsheca7117613a12c3p1e0e5cjsn8ca39034f796"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.results[0].definition);
      hint.innerHTML = "Hint: " + data.results[0].definition;
    });
}
