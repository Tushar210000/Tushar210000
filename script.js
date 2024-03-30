let gameCells = document.querySelectorAll(".cell");
let player1 = document.querySelectorAll(".player1");
let player2 = document.querySelectorAll(".player2");
let currentPlayer = "X";
let nextPlayer = "0";
let playerTurn = currentPlayer;

//function to start game:
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};

// function for changing player turn:
const changePlayerTurn = () => {
  if (playerTurn === currentPlayer) {
    playerTurn = nextPlayer;
  } else {
    playerTurn = currentPlayer;
  }
};

// function for checking tie condition:
const checkTie = () => {
  let emptyCellCount = 0;
  gameCells.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCellCount++;
    }
  });
  return emptyCellCount === 0 && !checkWin();
};

// function for checking winning condition:
const checkWin = () => {
  let winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winArr.length; i++) {
    const [pos1, pos2, pos3] = winArr[i];
    if (
      gameCells[pos1].textContent != "" &&
      gameCells[pos1].textContent == gameCells[pos2].textContent &&
      gameCells[pos2].textContent == gameCells[pos3].textContent
    )
      return true;
  }
  return false;
};

// function for handle clicks:
const handleClick = (e) => {
  if (e.target.textContent == "") {
    e.target.textContent = playerTurn;
    if (checkWin()) {
      console.log(`${playerTurn} wins`);
      disableCells();
      showAlert(`${playerTurn} is a winner`);
    } else if (checkTie()) {
      console.log("Match tie");
      disableCells();
      showAlert(`Match Tie!`);
    } else {
      changePlayerTurn();
      showAlert(`Turn for player : ${playerTurn}`);
    }
  }
};

// function for disabling cells after winning or tie condition:
const disableCells = () => {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disabled");
  });
};

// function for restarting game:
const restartGame = () => {
  gameCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  startGame();
};
let restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restartGame);

// function for showing alert:
function showAlert(msg) {
  let alert = document.querySelector(".alert");
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
}

startGame();
