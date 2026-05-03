const menuContainer = document.querySelector("#menuContainer");
const gameContainer = document.querySelector("#gameContainer");

const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#gameStatus");
const restartBtn = document.querySelector("#restartBtn");
const backToMainBtn = document.querySelector("#backToMainBtn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let vsComputerBtnClicked = false;

// start game vs Player
document.querySelector("#vsPlayerBtn").addEventListener("click", () => {
  vsComputerBtnClicked = false;
  menuContainer.style.display = "none"; // hide menu
  gameContainer.style.display = "block"; // show game
  initializeGame();
});

// start game vs Computer
document.querySelector("#vsComputerBtn").addEventListener("click", () => {
  vsComputerBtnClicked = true;
  menuContainer.style.display = "none"; // hide menu
  gameContainer.style.display = "block"; // show game
  initializeGame();
  // currentPlayer = "X";
  // gameStatus.textContent = `${currentPlayer}'s turn`;
});

cells.forEach((cell) => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);
backToMainBtn.addEventListener("click", backToMain);

// starts the game
function initializeGame() {
  running = true;
  gameStatus.textContent = `${currentPlayer}'s turn`;
}

// handles a cell click: check if valid, updates, and checks for winner
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex"); // get index from HTML attribute
  if (options[cellIndex] !== "" || !running) {
    return; // ignores if cell already filled or game stopped
  }
  updateCell(this, cellIndex); // mark the cell
  checkWinner(); // check if that move won the game

  // if playing vs Computer and still running, let computer move after delay
  if (running && vsComputerBtnClicked) {
    currentPlayer = "O"; // switch to computer
    gameStatus.textContent = "Computer is thinking...";

    setTimeout(() => {
      computerMove();
      if (running) {
        currentPlayer = "X"; // back to player
        gameStatus.textContent = `${currentPlayer}'s turn`;
      }
    }, 800); // 800ms delay
  }
}

function computerMove() {
  if (!running) return;

  // find all empty cells
  const emptyCells = options
    .map((val, idx) => (val === "" ? idx : null))
    .filter((idx) => idx !== null);
    console.log(emptyCells);
    

  if (emptyCells.length === 0) return;

  // pick a random empty cell
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const cell = cells[randomIndex];

  // Computer is always O
  currentPlayer = "O";
  updateCell(cell, randomIndex);
  checkWinner();

  // Switch back to player X if game still running
  if (running) {
    currentPlayer = "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
  }
}

// updates the clicked cell with the current player's symbol
function updateCell(cell, index) {
  options[index] = currentPlayer; // store move in array
  cell.textContent = currentPlayer; // display X or O in UI
}

// switch the turn between player X and O
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // toggle player
  if (currentPlayer === "O" && vsComputerBtnClicked) {
    gameStatus.textContent = "Computer's turn";
  } else {
    gameStatus.textContent = `${currentPlayer}'s turn`; // update status message}
  }
}

// checks if the current move caused a win, draw, or continues the game
function checkWinner() {
  let roundWon = false;
  let winningCondition = null;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue; // skip empty lines
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true; // found a winning line
      winningCondition = condition; // store the winning line
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer === "O" && vsComputerBtnClicked) {
      gameStatus.textContent = "Computer wins!";
    } else {
      gameStatus.textContent = `${currentPlayer} wins!`; // announce winner
    }
    running = false; // stop game

    // highlight the winning cells
    winningCondition.forEach((index) => {
      cells[index].classList.add("winner");
    });
  } else if (!options.includes("")) {
    gameStatus.textContent = `Draw!`; // all cells filled, no winner
    running = false;
  } else {
    changePlayer(); // continue game with next player
  }
}

// restarts the game to its initial state
function restartGame() {
  currentPlayer = "X"; // always start with X
  options = ["", "", "", "", "", "", "", "", ""]; // clear board state
  cells.forEach((cell) => {
    cell.textContent = ""; // clear UI cells
    cell.classList.remove("winner"); // remove highlight
  });
  initializeGame(); // start new game
}

// go back to main
function backToMain() {
  menuContainer.style.display = "flex";
  gameContainer.style.display = "none";

  currentPlayer = "X"; // always start with X
  options = ["", "", "", "", "", "", "", "", ""]; // clear board state
  cells.forEach((cell) => {
    cell.textContent = ""; // clear UI cells
    cell.classList.remove("winner"); // remove highlight
  });
  gameStatus.textContent = "";
  running = false;
}
