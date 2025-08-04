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
function renderBoard() {
  boardElement.innerHTML = "";

  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;

      var cellData = board[i][j];
      if (cellData.isRevealed) {
        cell.classList.add("revealed");
        if (cellData.isMine) {
          cell.classList.add("mine");
          cell.textContent = "💣";
        } else if (cellData.value > 0) {
          cell.textContent = cellData.value;
          cell.dataset.value = cellData.value;
        }
      } else if (cellData.isFlagged) {
        cell.classList.add("flagged");
        cell.textContent = "🚩";
      }

      cell.addEventListener("click", function () {
        var row = parseInt(this.dataset.row);
        var col = parseInt(this.dataset.col);
        revealCell(row, col);
        renderBoard();
      });

      cell.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var row = parseInt(this.dataset.row);
        var col = parseInt(this.dataset.col);
        toggleFlag(row, col);
        renderBoard();
      });

      boardElement.appendChild(cell);
    }
  }
}
function showNameModal() {
  nameModal.style.display = "flex";
  document.getElementById("player-name").value = "";
  document.getElementById("player-name").focus();
}
function hideNameModal() {
  nameModal.style.display = "none";
}

function startGameWithName() {
  var nameInput = document.getElementById("player-name");
  var name = nameInput.value.trim();

  if (name.length >= 3 && /^[a-zA-Z0-9]+$/.test(name)) {
    playerName = name;
    hideNameModal();
    initGame();
    renderBoard();
  } else {
    alert(
      "Por favor ingresa un nombre válido (mínimo 3 caracteres alfanuméricos)"
    );
    nameInput.focus();
  }
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

function resetGame() {
  hideResultModal();
  initGame();
  renderBoard();
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
  } // TODO:
}

document.addEventListener("DOMContentLoaded", initUI);
