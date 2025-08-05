"use strict";

function saveGameResult(gameResult) {
  var games = getGameResults();
  games.push(gameResult);
  localStorage.setItem("minesweeperGames", JSON.stringify(games));
}

function getGameResults() {
  var games = localStorage.getItem("minesweeperGames");
  return games ? JSON.parse(games) : [];
}

function clearGameResults() {
  localStorage.removeItem("minesweeperGames");
}
