/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var solutions = [];
  var emptyBoard = new Board ({n: n});
  var checkBoard = function (board, rowNum) {
    for (var col = 0; col < n; col++) {
      var newBoard = new Board(JSON.parse(JSON.stringify(board.rows())));
      newBoard.togglePiece(rowNum, col);
      if (!newBoard.hasAnyRooksConflicts() && rowNum === n - 1) {
        solutions.push(newBoard.rows());
      } else if (!newBoard.hasAnyRooksConflicts() && rowNum < n - 1) {
        checkBoard (newBoard, rowNum + 1);
      }
    };
  };
  checkBoard(emptyBoard, 0);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var emptyBoard = new Board ({n: n});
  var checkBoard = function (board, rowNum) {
    for (var col = 0; col < n; col++) {
      var newBoard = new Board(JSON.parse(JSON.stringify(board.rows())));
      newBoard.togglePiece(rowNum, col);
      if (!newBoard.hasAnyRooksConflicts() && rowNum === n - 1) {
        solutions.push(newBoard.rows());
      } else if (!newBoard.hasAnyRooksConflicts() && rowNum < n - 1) {
        checkBoard (newBoard, rowNum + 1);
      }
    };
  };
  checkBoard(emptyBoard, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var emptyBoard = new Board ({n: n});
  var checkBoard = function (board, rowNum) {
    for (var col = 0; col < n; col++) {
      var newBoard = new Board(JSON.parse(JSON.stringify(board.rows())));
      newBoard.togglePiece(rowNum, col);
      if (!newBoard.hasAnyQueensConflicts() && rowNum === n - 1) {
        solutions.push(newBoard.rows());
      } else if (!newBoard.hasAnyQueensConflicts() && rowNum < n - 1) {
        checkBoard (newBoard, rowNum + 1);
      }
    };
  };
  checkBoard(emptyBoard, 0);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};




