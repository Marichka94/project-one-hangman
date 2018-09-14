//SCORE COUNT
const score = document.querySelector('#score')
const bScore = document.querySelector('#best-score')
let scoreCount = 0;
let bestScore = 0
score.textContent = 'Score: ' + scoreCount
bScore.textContent = 'Best score: ' + bestScore


//WORDS LIBRARY
const words = [
	["D", "O", "G"],
	["C", "A", "T"],
	["H", "O", "R", "S", "E"],
	["W", "H", "A", "L", "E"],
	["W", "O", "L", "F"],
	["B", "E", "A", "R"],
  ["L", "I", "O", "N"],
  ["F", "O", "X"],
  ["H", "A", "R", "E"],
  ["T","I", "G", "E", "R"],
  ["C", "O", "W"],
  ["H", "E", "N"],
  ["D", "U", "C", "K"],
  ["P", "I", "G"],
  ["M", "O", "N", "K", "E", "Y"],
  ["Z", "E", "B", "R", "A"],
  ["A", "N", "D", "R", "E", "W"],
	["O", "X"],
	["O", "W", "L"],
	["W", "O", "R", "M"],
	["S", "N", "A", "K", "E"],
	["F", "I", "S", "H"]
	["B", "U", "G"],
	["C", "R", "O", "W"],
	["D", "R", "A", "G", "O", "N", "F", "L","Y"],
	["S", "H", "A", "R", "K"]
]


//RANDOM WORDS, HIDDEN PLACEHOLDERS
const wordBoard = document.querySelector('#word-board')
let fullWord = words[Math.floor(Math.random() * (words.length - 1))]
let hiddenWord = new Array(fullWord.length)
for (let i = 0; i < hiddenWord.length; i++) {
	hiddenWord[i] = "_ "
}
function printPlaceholders() {
	for (let i = 0; i < hiddenWord.length; i++) {
		let letter = document.createTextNode(hiddenWord[i])
		wordBoard.appendChild(letter)
		}
	}
printPlaceholders()


// CHECK MATCHING LETTERS
let hangman = document.querySelector('#image')
let livesUsed = 0
let usedLetters = document.querySelector('#used-letters-holder')


//MATCH AND NO MATCH - START OF A VERY HUGE FUNCTION - FUNCTIONZILLA IS BORN
function checkMatch() {
	let inputLetter = document.querySelector('.input-field').value.toUpperCase()
  if(fullWord.indexOf(inputLetter) >= 0) {
    hiddenWord[fullWord.indexOf(inputLetter)] = inputLetter + " "
  } else {
    let letter = document.createTextNode(' ' + inputLetter)
    usedLetters.appendChild(letter)
    console.log(letter)
    livesUsed++
    hangman.src = 'images/hangman' + livesUsed + '.png'
  }
  inputLetter = ''
	let wordPrint = document.querySelector('#word-board')
 	wordPrint.innerHTML=''
 	printPlaceholders()

					// END OF THE GAME
	let allLettersOpened = true
	for (var i = 0; i < hiddenWord.length; i++){
	  if(hiddenWord[i] === "_ ") {
		  allLettersOpened = false;
  	}
	}

					//WIN - LOOSE
	setTimeout(function() {
  	if(allLettersOpened) {
      scoreCount++
			score.textContent = 'Score: ' + scoreCount
  		$("#winModal").modal("show");
			$(".input-field").unbind()
			$(".input-field").keypress(function(e) {
				if(e.which == 13) {
					e.preventDefault()
					$("#winModal").modal("hide")
					$(".input-field").unbind()
					$(".input-field").keypress(function(e) {
						if(e.which == 13) {
							e.preventDefault()
							checkMatch();
							document.querySelector(".input-field").value = ''
						}
					});
				}
			})
			fullWord = ""
      $("#word-board").empty()
    	$("#used-letters-holder").empty()
  		fullWord = words[Math.floor(Math.random() * (words.length - 1))]
    	hiddenWord = new Array(fullWord.length)
    	for (let i = 0; i < hiddenWord.length; i++) {
     		hiddenWord[i] = "_ "
     	}
    	printPlaceholders()
    }
		if (livesUsed === 6) {
    	if (scoreCount > bestScore) {
      	bestScore = scoreCount
    	}
			$(".input-field").keypress(function(e) {
	    	if(e.which == 13) {
			    e.preventDefault()
					$(".input-field").unbind()
			    newGame()
			 		$("#gameOverModal").modal("hide")
			   }
			 })
      $("#gameOverModal").modal("show");
      $("new-game").show()
      $("#new-game").click(function(){
        $("#gameOverModal").modal("hide");
      	});
    }
	}, 500)
} //FUNCTIONZILLA IS DEAD


//SUBMIT BUTTON + ENTER INPUT
$('.submit').click(function(e) {
  checkMatch()
  document.querySelector(".input-field").value = ''
})

$(".input-field").keypress(function(e) {
  if(e.which == 13) {
    e.preventDefault()
    checkMatch();
    document.querySelector(".input-field").value = ''
  }
});

$('#new-game').click(newGame)

function newGame (){
  if (scoreCount > bestScore) {
    bestScore = scoreCount
  }
  bScore.textContent = 'Best score: ' + bestScore
  scoreCount = 0
  score.textContent = 'Score: ' + scoreCount
  fullWord = ""
  fullWord = words[Math.floor(Math.random() * (words.length - 1))]
  hiddenWord = new Array(fullWord.length)
  for (let i = 0; i < hiddenWord.length; i++) {
  	hiddenWord[i] = "_ "
  }
  hangman.src = "images/hangman0.png"
  livesUsed = 0
  $("#word-board").empty()
  $("#used-letters-holder").empty()
  printPlaceholders()
	$(".input-field").keypress(function(e) {
	  if(e.which == 13) {
	    e.preventDefault()
	      checkMatch();
	      document.querySelector(".input-field").value = ''
	  }
	});
}
