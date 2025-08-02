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
