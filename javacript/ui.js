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

function showNameModal() {
  nameModal.style.display = "flex";
  document.getElementById("player-name").value = "";
  document.getElementById("player-name").focus();
}

function showResultModal(isWin) {
  var resultTitle = document.getElementById("result-title");
  var resultMessage = document.getElementById("result-message");

  if (isWin) {
    resultTitle.textContent = "You win!";
    resultMessage.textContent = `Congratulations ${playerName}! You completed the game in ${seconds} seconds.`;
  } else {
    resultTitle.textContent = "You lost!";
    resultMessage.textContent = `Sorry ${playerName}, you found a mine. Try again`;
  }

  resultModal.style.display = "flex";
}

function hideResultModal() {
  resultModal.style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  var themeToggle = document.getElementById("theme-toggle");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";

  localStorage.setItem(
    "themePreference",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
}
function loadThemePreference() {
  var theme = localStorage.getItem("themePreference");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-toggle").textContent = "Light Mode";
  } // TODO: html
}
