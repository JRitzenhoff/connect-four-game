class gameController {
  constructor(gameview) {
    this.gameview = gameview;
    const gameArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }

  createCounters(quantity = 1,className,prefix,color) {
    let location = document.querySelector(".counters ."+prefix);
    for (let i = 1; i < quantity + 1; i++) {
      let element = document.createElement("div");
      element.id = prefix+"#"+i+"-"+color;
      element.className = className;
      element.draggable = true;
      location.appendChild(element);
    }
  }

  init() {
    this.gameview.addListeners();
    this.createCounters(20, "counter-red-large", "desktop", "red");
    this.createCounters(20, "counter-red-large", "tablet", "red");
    this.createCounters(20, "counter-red-small", "mobile", "red");
    this.createCounters(20, "counter-yellow-large", "desktop", "yellow");
    this.createCounters(20, "counter-yellow-large", "tablet", "yellow");
    this.createCounters(20, "counter-yellow-small", "mobile", "yellow");
  }

  // ---------- game function
  checkWinner(color) {
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

  checkMatch(one, two, three, four, color) {
    if (one === two && one === three && one === four && one === color) {
      return true;
    }
  }

}

const game = new gameController(new gameView());
game.init();
