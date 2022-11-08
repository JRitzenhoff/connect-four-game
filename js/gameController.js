const gameArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

function checkMatch(one, two, three, four, color) {
    if (one === two && one === three && one === four && one === color) {
      return true;
    }
  }
  // ---------- game function
  function checkWinner(color) {
    for (let column = 0; column < 7; column++) {
      for (let row = 0; row < 3; row++) {
        if (
          checkMatch(
            gameArray[row][column],
            gameArray[row + 1][column],
            gameArray[row + 2][column],
            gameArray[row + 3][column],
            color
          )
        ) {
          return true;
        }
        if (
          checkMatch(
            gameArray[row][column],
            gameArray[row][column + 1],
            gameArray[row][column + 2],
            gameArray[row][column + 3],
            color
          )
        ) {
          return true;
        }
      }
    }
  
    for (let column = 0; column < 4; column++) {
      for (let row = 0; row < 3; row++) {
        if (
          checkMatch(
            gameArray[row][column],
            gameArray[row + 1][column + 1],
            gameArray[row + 2][column + 2],
            gameArray[row + 3][column + 3],
            color
          )
        ) {
          return true;
        }
      }
    }
  
    for (let column = 0; column < 4; column++) {
      for (let row = 5; row > 2; row--) {
        if (
          checkMatch(
            gameArray[row][column],
            gameArray[row - 1][column + 1],
            gameArray[row - 2][column + 2],
            gameArray[row - 3][column + 3],
            color
          )
        ) {
          return true;
        }
      }
    }
  }

  export {gameArray,checkMatch,checkWinner}