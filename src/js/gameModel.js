import Event from "./event.js";

class gameModel {
  constructor() {
    this.Players =[ { playerName: "Player 1", counters: "red" ,score:0,currentPlayer:true,startGame:true},
    { playerName: "Player 2", counters: "yellow",score:0,currentPlayer:false,startGame:false}];
    this.currentPlayer = this.Players[0].counters;
    this.lenght = 0;
    this.gameArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    this.winEvent = new Event();
    this.drawEvent = new Event();
    this.updateViewEvent = new Event();
    this.switchPlayerEvent = new Event();

  }
  play(drop) {
    this.saveInArray(drop);
    this.updateViewEvent.trigger({
      column: drop[0],
      lenght: this.lenght,
      element: drop[1],
    });
  
   

    if (this.checkWinner(this.currentPlayer)) {
      if (this.Players[0].counters == this.currentPlayer) {
        this.Players[0].score+=10;
        this.winEvent.trigger(this.Players[0]);
      } else {
        this.Players[1].score+=10;
        this.winEvent.trigger(this.Players[1]);
      }
    } else {
      this.switchPlayer();
      this.switchPlayerEvent.trigger(this.currentPlayer);
    }

   
  }

  clearGameArray()
  {
    this.gameArray.forEach(element => { 
      element.fill(0)
    })
  }

  resetPlayers() {
    this.lenght = 0;
    this.Players.map(el=> el.score=0);
    this.Players.map(el=> el.currentPlayer=false);
    this.Players.map(el=> el.startGame=false);
    this.Players.find(el =>el.counters=="red").currentPlayer=true; 
    this.Players.find(el =>el.counters=="red").startGame=true; 
    this.currentPlayer= this.Players[0].counters;
 

  }
 

  saveInArray(params) {
    let col = parseInt(params[0]);

    for (let i = 5; i >= 0; i--) {
      if (this.gameArray[i][col] === 0) {
        this.gameArray[i][col] = this.currentPlayer;
        this.lenght = i;
        
        break;
      }
    }
  }
  checkWinner(color) {
    //vertical
    for (let column = 0; column < 7; column++) {
      for (let row = 0; row < 3; row++) {
        if (
          this.checkMatch(
            this.gameArray[row][column],
            this.gameArray[row + 1][column],
            this.gameArray[row + 2][column],
            this.gameArray[row + 3][column],
            color
          )
        ) {
          return true;
        }
      }
    }
    //horizontal
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 4; column++) {
        if (
          this.checkMatch(
            this.gameArray[row][column],
            this.gameArray[row][column + 1],
            this.gameArray[row][column + 2],
            this.gameArray[row][column + 3],
            color
          )
        ) {
          return true;
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 4; column++) {
        if (
          this.checkMatch(
            this.gameArray[row][column],
            this.gameArray[row + 1][column + 1],
            this.gameArray[row + 2][column + 2],
            this.gameArray[row + 3][column + 3],
            color
          )
        ) {
          return true;
        }
      }
    }
    for (let row = 3; row < 6; row++) {
      for (let column = 0; column < 4; column++) {
        if (
          this.checkMatch(
            this.gameArray[row][column],
            this.gameArray[row - 1][column + 1],
            this.gameArray[row - 2][column + 2],
            this.gameArray[row - 3][column + 3],
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

  switchPlayer() {
    this.Players.map((el)=> {
      el.currentPlayer==true?el.currentPlayer=false:el.currentPlayer=true
    });
    this.currentPlayer = this.Players.find(el =>el.currentPlayer==true).counters; 
 
  }

  switchStarter() {
    this.Players.map((el)=> {
      el.startGame==true?el.currentPlayer=false:el.currentPlayer=true;
      el.startGame==true?el.startGame=false:el.startGame=true
    });
    this.currentPlayer = this.Players.find(el =>el.startGame==true).counters; 

  }




  draw() {
    let result;
    for (let i = 0; i < this.gameArray.length; i++) {
      result += gameArray[i].every((element) => element != 0);
    }
    result === 6 ? "draw" : "";
    return this.drawEvent.trigger(result);
  }
}

export default gameModel;
