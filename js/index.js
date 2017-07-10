var playerSym;
var computerSym;
var turnCount = 0;
var playerWin = 0;
var compWin = 0;

var whoseTurn;
var grid = [];
var winFlag = false;
var playerScore = 0;
var compScore = 0;
var winningLine;
var emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function initialiseGrid() {

  var k = 0;
  for (var i = 0; i < 9; i++) {

    grid[i] = document.getElementById(k);
    k++;

  }
}

function enterPlayerChoice(eventSrc) {

  document.getElementById("easy").disabled = true;
  document.getElementById("difficult").disabled = true;

  if (!(document.getElementById("x").checked || document.getElementById("o").checked)) {

    alert("Choose Your Symbol");
    return;

  }

  var target = eventSrc.target;
  if (target.innerText !== "")
    return;

  turnCount++;
  var txtNode = document.createTextNode(playerSym);
  target.appendChild(txtNode);
  updateEmptyBox(Number(target.id));

  whoseTurn = "Player";

  if (turnCount > 3) {
    if (checkWin())
      return;
  }

  if (isDraw(turnCount, winFlag)) {
    gameReset();
    return;
  } else
    computersTurn();

}

function computersTurn() {

  whoseTurn = "Computer";
  if (document.getElementById("easy").checked)
    playEasy();

  else
    playHard();

}

function isDraw(turnCount, winFlag) {
  if (turnCount > 8 && !winFlag) {
    return confirm("It's A Draw");
  }
  return false;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playEasy() {

  turnCount++;
  var boxNum;
  boxNum = emptyBoxes[getRandomNum(0, emptyBoxes.length - 1)];

  insertCompChoice(boxNum);
  updateEmptyBox(boxNum);

  if (turnCount > 3) {
    if (checkWin())
      return;
  }

  if (isDraw(turnCount, winFlag))
    gameReset();
}

function insertCompChoice(boxNum) {

  var txtNode = document.createTextNode(computerSym);
  document.getElementById(boxNum).appendChild(txtNode);

}

function updateEmptyBox(boxNum) {

  var boxIndex = emptyBoxes.indexOf(boxNum);
  emptyBoxes.splice(boxIndex, 1);
  //alert(emptyBoxes);

}

function returnEmptyBoxes(possibleBoxes) {

  var empty = [];
  var i = 0;
  while (i < possibleBoxes.length) {
    if (emptyBoxes.indexOf(possibleBoxes[i]) !== -1)
      empty.push(possibleBoxes[i]);

    i++;
  }

  return empty;

}

function checkRowOrColumnOrDiagonal(cell1, cell2, cell3, symbol) {

  if (cell1.innerText == symbol && cell2.innerText == symbol) {

    if (cell3.innerText == symbol) {
      winningLine = [cell1.id, cell2.id, cell3.id];
      winFlag = true;
    } else {
      if (document.getElementById(cell3.id).innerText === "")
        return Number(cell3.id);
    }
  } else if (cell1.innerText == symbol && cell3.innerText == symbol) {

    if (cell2.innerText == symbol) {
      winFlag = true;
    } else {
      if (document.getElementById(cell2.id).innerText === "")
        return Number(cell2.id);
    }
  } else if (cell3.innerText == symbol && cell2.innerText == symbol) {

    if (cell1.innerText == symbol) {
      winFlag = true;
    } else {
      if (document.getElementById(cell1.id).innerText === "")
        return Number(cell1.id);
    }
  }
  return null;

}

function checkForWin() {

  //diagonal left to right
  if (checkRowOrColumnOrDiagonal(grid[0], grid[4], grid[8], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[4], grid[8], computerSym);

  //diagonal right to left
  else if (checkRowOrColumnOrDiagonal(grid[2], grid[4], grid[6], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[2], grid[4], grid[6], computerSym);

  //first row
  else if (checkRowOrColumnOrDiagonal(grid[0], grid[1], grid[2], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[1], grid[2], computerSym);

  //second row
  else if (checkRowOrColumnOrDiagonal(grid[3], grid[4], grid[5], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[3], grid[4], grid[5], computerSym);

  //third Row
  else if (checkRowOrColumnOrDiagonal(grid[6], grid[7], grid[8], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[6], grid[7], grid[8], computerSym);

  //first coloumn
  else if (checkRowOrColumnOrDiagonal(grid[0], grid[3], grid[6], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[3], grid[6], computerSym);

  //second column
  else if (checkRowOrColumnOrDiagonal(grid[1], grid[4], grid[7], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[1], grid[4], grid[7], computerSym);

  //third column
  else if (checkRowOrColumnOrDiagonal(grid[2], grid[5], grid[8], computerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[2], grid[5], grid[8], computerSym);

  return -1;

}

function blockOppWin() {

  //diagonal left to right
  if (checkRowOrColumnOrDiagonal(grid[0], grid[4], grid[8], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[4], grid[8], playerSym);

  //diagonal right to left
  else if (checkRowOrColumnOrDiagonal(grid[2], grid[4], grid[6], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[2], grid[4], grid[6], playerSym);

  //first row
  else if (checkRowOrColumnOrDiagonal(grid[0], grid[1], grid[2], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[1], grid[2], playerSym);
  //second row
  else if (checkRowOrColumnOrDiagonal(grid[3], grid[4], grid[5], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[3], grid[4], grid[5], playerSym);

  //third Row
  else if (checkRowOrColumnOrDiagonal(grid[6], grid[7], grid[8], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[6], grid[7], grid[8], playerSym);

  //first coloumn
  else if (checkRowOrColumnOrDiagonal(grid[0], grid[3], grid[6], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[0], grid[3], grid[6], playerSym);

  //second column
  else if (checkRowOrColumnOrDiagonal(grid[1], grid[4], grid[7], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[1], grid[4], grid[7], playerSym);

  //third column
  else if (checkRowOrColumnOrDiagonal(grid[2], grid[5], grid[8], playerSym) !== null)
    return checkRowOrColumnOrDiagonal(grid[2], grid[5], grid[8], playerSym);

  return -1;

}

function isDiagonalFork(cell1, cell2, cell3) {

  if (cell1.innerText !== "" && cell2.innerText !== "" && cell3.innerText !== "") {

    if (cell1.innerText == cell2.innerText) {
      return [2, 6, 0, 8];
    } else if (cell2.innerText == cell3.innerText) {
      return [2, 6, 0, 8];
    } else if (cell1.innerText == cell3.innerText) {
      return [1, 3, 5, 7];
    }

  }

  return false;

}

function isArrowHeadFork(left, topOrBottom, right) {

  if (topOrBottom.innerText === "")
    return false;

  else if (left.innerText == topOrBottom.innerText) {
    return [Number(topOrBottom.id) - 1, Number(left.id) + 3, Number(left.id) - 3];
  } else if (topOrBottom.innerText == right.innerText) {
    return [Number(topOrBottom.id) - 1, Number(right.id) + 3, Number(right.id) - 3];
  }
}

function blockOppFork() {

  var possibleBlockMoves = [];
  var suggestedMove;

  if (isDiagonalFork(grid[2], grid[4], grid[6]) || isDiagonalFork(grid[0], grid[4], grid[8])) {

    if (isDiagonalFork(grid[0], grid[4], grid[8]))
      possibleBlockMoves = isDiagonalFork(grid[0], grid[4], grid[8]);

    else if (isDiagonalFork(grid[2], grid[4], grid[6]))
      possibleBlockMoves = isDiagonalFork(grid[2], grid[4], grid[6]);

    possibleBlockMoves = returnEmptyBoxes(possibleBlockMoves);
    if (possibleBlockMoves.length > 0) {
      suggestedMove = possibleBlockMoves[getRandomNum(0, possibleBlockMoves.length - 1)];
      return suggestedMove;
    }
  }

  if (isArrowHeadFork(grid[3], grid[7], grid[5])) {
    possibleBlockMoves = isArrowHeadFork(grid[3], grid[7], grid[5]);
    possibleBlockMoves = returnEmptyBoxes(possibleBlockMoves);
    suggestedMove = possibleBlockMoves[getRandomNum(0, possibleBlockMoves.length - 1)];
    if (possibleBlockMoves.length > 0) {
      suggestedMove = possibleBlockMoves[getRandomNum(0, possibleBlockMoves.length - 1)];
      return suggestedMove;
    }
  }

  if (isArrowHeadFork(grid[3], grid[1], grid[5])) {
    possibleBlockMoves = isArrowHeadFork(grid[3], grid[1], grid[5]);
    possibleBlockMoves = returnEmptyBoxes(possibleBlockMoves);
    suggestedMove = possibleBlockMoves[getRandomNum(0, possibleBlockMoves.length - 1)];
    if (possibleBlockMoves.length > 0) {
      suggestedMove = possibleBlockMoves[getRandomNum(0, possibleBlockMoves.length - 1)];
      return suggestedMove;
    }
  }

  return -1;

}

function oppCorner() {

  if (!(grid[0].innerText !== "" && grid[4].innerText !== "" && grid[8].innerText !== "")) {
    if (grid[0].innerText !== "")
      return Number(grid[8].id);
    else if (grid[8].innerText !== "")
      return Number(grid[0].id);
  }

  if (!(grid[2].innerText !== "" && grid[4].innerText !== "" && grid[6].innerText !== "")) {
    if (grid[2].innerText !== "")
      return Number(grid[6].id);
    else if (grid[6].innerText !== "")
      return Number(grid[2].id);
  }

  return -1;
}

function takeCorner() {

  var corners = [0, 2, 6, 8];
  var possibilities = returnEmptyBoxes(corners);
  if (possibilities.length > 0) {
    var suggestedMove = possibilities[getRandomNum(0, possibilities.length - 1)];
    return suggestedMove;
  }

  return -1;

}

function playHard() {

  /*
  //////////////////////
  The first two turns decide the game.
  
  First Turn:
  Take corner or center.
  
  Second Turn:
  If Center is empty take it.
  If not, take a corner.
  
  From third turn onwards,
    1) play for win
    2) block opp win
    3) block fork
        a) diagonal Fork
        b) arrowhead Fork
    4) play center if open
    6) play Opp corner
    7) play corner
    8) play sidecenter.
  //////////////////////
  */

  turnCount++;
  var boxNum;

  if ((turnCount == 1)) {

    boxNum = 2 * getRandomNum(0, 4);
    insertCompChoice(boxNum);
    updateEmptyBox(boxNum);

  } else if (turnCount == 2) {

    if (emptyBoxes.indexOf(4) !== -1)
      boxNum = 4;

    else {
      var cornersAndCenter = [0, 2, 4, 6, 8];
      var possibilities = returnEmptyBoxes(cornersAndCenter);
      boxNum = possibilities[getRandomNum(0, possibilities.length - 1)];
    }
    insertCompChoice(boxNum);
    updateEmptyBox(boxNum);

  } else if (turnCount > 2) {

    if (checkForWin() !== -1) {
      boxNum = checkForWin();
      insertCompChoice(boxNum);
      checkWin();
      updateEmptyBox(boxNum);
    } else if (blockOppWin() !== -1) {
      boxNum = blockOppWin();
      insertCompChoice(boxNum);
      updateEmptyBox(boxNum);
    } else if (blockOppFork() !== -1) {
      boxNum = blockOppFork();
      insertCompChoice(boxNum);
      updateEmptyBox(boxNum);
    } else if (emptyBoxes.indexOf(4) !== -1) {
      insertCompChoice(4);
      updateEmptyBox(boxNum);
    } else if (oppCorner() !== -1) {
      boxNum = oppCorner();
      insertCompChoice(boxNum);
      updateEmptyBox(boxNum);
    } else if (takeCorner() !== -1) {
      boxNum = takeCorner();
      insertCompChoice(boxNum);
      updateEmptyBox(boxNum);
    } else {
      var sideCenters = [1, 3, 5, 7];
      var possibilities = returnEmptyBoxes(sideCenters);
      boxNum = possibilities[getRandomNum(0, possibilities.length - 1)];
      insertCompChoice(boxNum);
      updateEmptyBox(boxNum);
    }

  }

  if (isDraw(turnCount, winFlag))
    gameReset();

}

function checkWin() {

  var symToCompare;

  if (whoseTurn == "Player")
    symToCompare = playerSym;
  else if (whoseTurn == "Computer")
    symToCompare = computerSym;

  checkRowOrColumnOrDiagonal(grid[0], grid[1], grid[2], symToCompare);
  checkRowOrColumnOrDiagonal(grid[3], grid[4], grid[5], symToCompare);
  checkRowOrColumnOrDiagonal(grid[6], grid[7], grid[8], symToCompare);
  checkRowOrColumnOrDiagonal(grid[0], grid[3], grid[6], symToCompare);
  checkRowOrColumnOrDiagonal(grid[1], grid[4], grid[7], symToCompare);
  checkRowOrColumnOrDiagonal(grid[2], grid[5], grid[8], symToCompare);
  checkRowOrColumnOrDiagonal(grid[0], grid[4], grid[8], symToCompare);
  checkRowOrColumnOrDiagonal(grid[2], grid[4], grid[6], symToCompare);

  if (winFlag) {
    
    addOrRemoveCSS(winningLine);

    //alert(winningLine);
    if (whoseTurn == "Player")
      playerScore++;
    else
      compScore++;

    updateScore();

    if (confirm(whoseTurn + " wins. Play Again??"))
      gameReset();

    return true;
  }
  return false;
}
/*/////////////////////////////////////////////////////////
Check 
/////////////////////////////////////////////////////////*/
function addOrRemoveCSS(line) {

  var i = 0;
  while (i < 3) {
    //alert(typeof line[i]);
    var cell = $("#"+line[i]);
    cell.toggleClass("winningCSS");
    i++;
  }
}

function updateScore() {

  $("#playerScores").empty();
  $("#compScores").empty();

  var textNodePlayer = document.createTextNode(playerScore);
  var textNodeComp = document.createTextNode(compScore);
  document.getElementById("playerScores").appendChild(textNodePlayer);
  document.getElementById("compScores").appendChild(textNodeComp);

}

function gameReset() {

  var cells = document.getElementsByClassName("box");

  var i = 0;
  while (i < cells.length) {
    cells[i++].innerText = "";
  }
  document.getElementById("easy").disabled = false;
  document.getElementById("difficult").disabled = false;
  turnCount = 0;
  whoseTurn = "";
  winFlag = false;
  emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  addOrRemoveCSS(winningLine);
  winningLine=[];
  
}

window.addEventListener("load", initialiseGrid);
document.getElementById("symChange").addEventListener("click", function() {

  if (!turnCount) {
    document.getElementById("o").disabled = false;
    document.getElementById("x").disabled = false;
  } else {
    alert("You cannot change Your Symbol during a game");
  }

});

document.getElementById("easy").addEventListener("click", function() {

  document.getElementById("easy").disabled = true;
  document.getElementById("difficult").disabled = true;

});

document.getElementById("difficult").addEventListener("click", function() {

  document.getElementById("easy").disabled = true;
  document.getElementById("difficult").disabled = true;

});

document.getElementById("x").addEventListener("click", function() {

  playerSym = "X";
  computerSym = "O";
  document.getElementById("o").disabled = true;
  document.getElementById("x").disabled = true;

});
document.getElementById("o").addEventListener("click", function() {

  playerSym = "O";
  computerSym = "X";
  document.getElementById("o").disabled = true;
  document.getElementById("x").disabled = true;

});
document.getElementById("resetBoard").addEventListener("click", gameReset);
document.getElementById("scoreReset").addEventListener("click", function() {

  playerScore = 0;
  compScore = 0;
  updateScore();

});

document.getElementById("0").addEventListener("click", enterPlayerChoice);
document.getElementById("1").addEventListener("click", enterPlayerChoice);
document.getElementById("2").addEventListener("click", enterPlayerChoice);
document.getElementById("3").addEventListener("click", enterPlayerChoice);
document.getElementById("4").addEventListener("click", enterPlayerChoice);
document.getElementById("5").addEventListener("click", enterPlayerChoice);
document.getElementById("6").addEventListener("click", enterPlayerChoice);
document.getElementById("7").addEventListener("click", enterPlayerChoice);
document.getElementById("8").addEventListener("click", enterPlayerChoice);