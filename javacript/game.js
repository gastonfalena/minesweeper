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
