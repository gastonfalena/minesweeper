"use strict";

var board = [];
var boardSize = 8;
var mineCount = 10;
var flaggedCount = 0;
var revealedCount = 0;
var gameOver = false;
var firstClick = true;
var timerInterval;
var seconds = 0;
var playerName = "";
var difficulty = "easy";

var difficultySettings = {
  easy: { size: 8, mines: 10 },
  medium: { size: 12, mines: 25 },
  hard: { size: 16, mines: 40 },
};
function initGame() {
  board = [];
  flaggedCount = 0;
  revealedCount = 0;
  gameOver = false;
  firstClick = true;
  clearInterval(timerInterval);
  seconds = 0;

  boardSize = difficultySettings[difficulty].size;
  mineCount = difficultySettings[difficulty].mines;

  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = {
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        value: 0,
      };
    }
  }

  updateMinesCounter();
  updateTimer();
}

function placeMines(firstClickRow, firstClickCol) {
  var minesPlaced = 0;

  while (minesPlaced < mineCount) {
    var row = Math.floor(Math.random() * boardSize);
    var col = Math.floor(Math.random() * boardSize);

    var isAdjacent =
      Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1;

    if (
      !board[row][col].isMine &&
      !(row === firstClickRow && col === firstClickCol) &&
      !isAdjacent
    ) {
      board[row][col].isMine = true;
      minesPlaced++;

      updateAdjacentCells(row, col);
    }
  }
}

function updateAdjacentCells(row, col) {
  for (
    var i = Math.max(0, row - 1);
    i <= Math.min(boardSize - 1, row + 1);
    i++
  ) {
    for (
      var j = Math.max(0, col - 1);
      j <= Math.min(boardSize - 1, col + 1);
      j++
    ) {
      if (!(i === row && j === col)) {
        board[i][j].value++;
      }
    }
  }
}
function revealCell(row, col) {
  var cell = board[row][col];

  if (cell.isRevealed || cell.isFlagged || gameOver) return;

  if (firstClick) {
    placeMines(row, col);
    startTimer();
    firstClick = false;
  }

  if (cell.isMine) {
    gameOver = true;
    revealAllMines();
    endGame(false);
    return;
  }

  cell.isRevealed = true;
  revealedCount++;

  if (cell.value === 0) {
    revealAdjacentCells(row, col);
  }

  if (revealedCount === boardSize * boardSize - mineCount) {
    gameOver = true;
    endGame(true);
  }
}

function revealAdjacentCells(row, col) {
  for (
    var i = Math.max(0, row - 1);
    i <= Math.min(boardSize - 1, row + 1);
    i++
  ) {
    for (
      var j = Math.max(0, col - 1);
      j <= Math.min(boardSize - 1, col + 1);
      j++
    ) {
      if (!(i === row && j === col)) {
        revealCell(i, j);
      }
    }
  }
}

function toggleFlag(row, col) {
  var cell = board[row][col];

  if (cell.isRevealed || gameOver) return;

  if (cell.isFlagged) {
    cell.isFlagged = false;
    flaggedCount--;
  } else {
    cell.isFlagged = true;
    flaggedCount++;
  }

  updateMinesCounter();
}

function revealAllMines() {
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (board[i][j].isMine) {
        board[i][j].isRevealed = true;
      }
    }
  }
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimer();
  timerInterval = setInterval(function () {
    seconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  var timerElement = document.querySelector(".timer");
  if (timerElement) {
    timerElement.textContent = seconds.toString().padStart(3, "0");
  }
}

function updateMinesCounter() {
  var minesCounterElement = document.querySelector(".mines-counter");
  if (minesCounterElement) {
    var remainingMines = mineCount - flaggedCount;
    minesCounterElement.textContent = remainingMines
      .toString()
      .padStart(3, "0");
  }
}
function endGame(isWin) {
  clearInterval(timerInterval);

  if (isWin) {
    saveGameResult({
      name: playerName,
      score: calculateScore(),
      date: new Date().toISOString(),
      duration: seconds,
      difficulty: difficulty,
    });
  }
  function calculateScore() {
    var difficultyFactor = 1;
    if (difficulty === "medium") difficultyFactor = 2;
    if (difficulty === "hard") difficultyFactor = 3;

    return Math.floor(
      (boardSize * boardSize * difficultyFactor * 100) / (seconds + 1)
    );
  }
  function setDifficulty(newDifficulty) {
    difficulty = newDifficulty;
    initGame();
    renderBoard();
  }
}
