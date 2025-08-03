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
