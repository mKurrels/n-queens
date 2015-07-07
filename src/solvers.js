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
  //keep a list of solutions
  var solutions = [];
  //recursive function (board, rowIndex, numRooks)
  var checkBoard = function(board,rowIndex,numRooks){   
    //make matrix from board with board.rows();
    var rows = board.rows();
    //for each collumn in row at rowIndex of matrix:
    for (var col = 0; col < n; col ++){
      //add rook to this row/collumn of board.
      board.togglePiece(rowIndex,col);
      //incriment rooks
      numRooks++;
      //if col conflict of board:
      if (board.hasAnyRooksConflicts()){
        //toggle rook at this row/collumn
        board.togglePiece(rowIndex,col);
        console.log('conflict at: ' + rowIndex + ',' + col)
        //decriment rooks
        numRooks--;
      // else
      } else {
        //if rowIndex === n - 1 and number of rooks === n:
        if (rowIndex === n-1 && numRooks === n){
          //add board to lists of solutions      
          solutions.push(board.rows());
        } 
        //if not at last row 
        if (rowIndex < n -1){
          console.log('recursion')
          //recurse with new board and rowIndex++ and numRooks++
          checkBoard(board,rowIndex+1,numRooks);
          //take out rook
          //board.togglePiece(rowIndex,col);
        }    
        //toggle board[row][col]
        //board.togglePiece(rowIndex,col)
      }
      console.log('col', col, 'solutions', solutions);
    }
  }
  //make an empty board with dementions n
  var emptyBoard = new Board({n:n});
  //recurse on that empty board with row 0 and 0 rooks
  checkBoard(emptyBoard,0,0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
  return solutions;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



// window.findNRooksSolution = function(n) {
//   //keep a list of solutions
//   var solutions = [];
//   //recursive function (board, rowIndex, numRooks)
//   var checkBoard = function(board,rowIndex,numRooks){   
//     //make matrix from board with board.rows();
//     var rows = board.rows();
//     //console.log(board.rows());
//     //for each collumn in row at rowIndex of matrix:
//     for (var col = 0; col < n; col ++){

//       //add rook to this row/collumn of board.
//       board.togglePiece(rowIndex,col);
//       //incriment rooks
//       numRooks++;
//       //if col conflict of board:
//       if (board.hasAnyRooksConflicts()){
//         //toggle rook at this row/collumn
//         board.togglePiece(rowIndex,col);
//         console.log('conflict at: ' + rowIndex + ',' + col)
//         //decriment rooks
//         numRooks--;
//       // else
//       } else {
//         //if rowIndex === n - 1 and number of rooks === n:
//         if (rowIndex === n-1 && numRooks === n){
//           //add board to lists of solutions      
//           solutions.push(board.rows());
//         } 
//         //if not at last row 
//         if (rowIndex < n -1){
//           console.log('recursion')
//           //recurse with new board and rowIndex++ and numRooks++
//           checkBoard(board,rowIndex+1,numRooks);
//           //take out rook
//           //board.togglePiece(rowIndex,col);
//         }    
//         //toggle board[row][col]
//         //board.togglePiece(rowIndex,col)
//       }
//     }
//   }
//   //make an empty board with dementions n
//   var emptyBoard = new Board({n:n});
//   //recurse on that empty board with row 0 and 0 rooks
//   checkBoard(emptyBoard,0,0);

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutions));
//   return solutions;
// };
