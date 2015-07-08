// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)
(function() {

  window.Board = Backbone.Model.extend({

    initialize: function(params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = +!this.get(rowIndex)[colIndex];

      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      var conflict = false;
      _.each(rowIndex, function(square) {
        if (square === 1) {
          count++;
        }
        if (count >= 2) {
          conflict = true;
        }
      })
      return conflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var self = this;
      var conflict = false;
      _.each(self.rows(), function(row) {
        if (self.hasRowConflictAt(row)) {
          conflict = true;
        }
      });
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return this.hasRowConflictAt(colIndex);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var self = this;
      var conflict = false;
      for (var i = 0; i < self.rows().length; i++) {
        var column = _.map(self.rows(), function(row) {
          return row[i];
        });
        if (self.hasColConflictAt(column)) {
          conflict = true;
        }
      }

      return conflict; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(startingIndex) {
      var self = this;
      var rows = self.rows();
      var diagonal = [];
      var startingRow = startingIndex[0];
      var startingCol = startingIndex[1];
      for (var i = startingRow; i < rows.length; i++) {
        for (var j = startingCol; i < rows.length; j++) {
          diagonal.push(rows[i][j]);
          i++;
        }
      }
      return this.hasRowConflictAt(diagonal);
      //return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var self = this;
      var rows = self.rows();
      var conflict = false;
      //check each member of the first row
      for (var i = 0; i < rows.length; i++) {
        if (self.hasMajorDiagonalConflictAt([0, i])) {
          conflict = true;
        }
      }
      //check each member of the first column
      for (var j = 0; j < rows.length; j++) {
        if (self.hasMajorDiagonalConflictAt([j, 0])) {
          conflict = true;
        }
      }

      return conflict; // fixme
      //return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(startingIndex) {
      var self = this;
      var rows = self.rows();
      var diagonal = [];
      var diagonalIndex = startingIndex[0] + startingIndex[1];
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows.length; j++) {
          if ((i + j) === diagonalIndex) {
            diagonal.push(rows[i][j]);
          }
        }
      }

      return self.hasRowConflictAt(diagonal);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var self = this;
      var rows = self.rows();
      var conflict = false;
      //check each member of the first row
      for (var i = 1; i < rows.length; i++) {
        if (self.hasMinorDiagonalConflictAt([0, i])) {
          conflict = true;
        }
      }
      //check each member of the first column
      for (var j = 0; j < rows.length; j++) {
        if (self.hasMinorDiagonalConflictAt([j, rows.length - 1])) {
          conflict = true;
        }
      }

      return conflict; // fixme

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());