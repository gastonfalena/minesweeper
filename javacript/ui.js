"use strict";

var boardElement;
var nameModal;
var resultModal;
var rankingModal;

function initUI() {
  boardElement = document.getElementById("board");
  nameModal = document.getElementById("name-modal");
  resultModal = document.getElementById("result-modal");
  rankingModal = document.getElementById("ranking-modal");

  document
    .getElementById("start-game")
    .addEventListener("click", startGameWithName);
  document.getElementById("play-again").addEventListener("click", resetGame);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document
    .getElementById("show-ranking")
    .addEventListener("click", showRanking);
  document
    .getElementById("close-ranking")
    .addEventListener("click", closeRanking);
  document
    .getElementById("sort-by-score")
    .addEventListener("click", function () {
      sortRanking("score");
    });
  document
    .getElementById("sort-by-date")
    .addEventListener("click", function () {
      sortRanking("date");
    });
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  document.getElementById("github-link").href =
    "https://github.com/gastonfalena/minesweeper";

  initGame();
  renderBoard();
  showNameModal();

  loadThemePreference();
}
