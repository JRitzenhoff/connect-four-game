import gameModel from "./gameModel.js";
import gameView from "./gameView.js";

class gameController {
  constructor() {
    this.model = new gameModel();
    this.view = new gameView();

    this.view.dropEvent.addListener((drop) => {
      this.model.play(drop);
      this.view.hideAllMarkes();
      
     
    });

    this.view.dragoverEvent.addListener((over) => {
      this.dragover(over);
    });

    this.view.showMenuEvent.addListener((over) => {
      this.view.showMenu();
    });

   

    this.view.mainmenuGameRulesOpenEvent.addListener(()=>{
      this.view.hideMenu();
      this.view.showGameRules()
    })

    this.view.mainmenuGameRulesCloseEvent.addListener(() => {
      this.view.hideGameRules();
      this.view.showMenu();
    })

    this.view.mainmenuVsPlayerEvent.addListener(()=>{
      this.view.checkScreenSize();
      this.view.init();
      
      this.view.hideMenu();
      this.view.showGameboard();
      this.view.renderGame();
      
    })

    this.view.playagainEvent.addListener(()=>{
      this.playagain();
      this.view.hideAllMarkes();
      this.view.hideGameResult();
    })

    this.view.resetGameEvent.addListener((over) => {
      
      this.restartGame();
      
    
    });

    this.model.updateViewEvent.addListener(data => {
      this.view.runAnimation(data);
      
    });

    this.model.winEvent.addListener(data => {
        this.view.showGameResult(data);
    });

    this.model.switchPlayerEvent.addListener(player => {
      this.view.changeTurn(player);
      this.view.removeListeners();
      this.view.CountersNotDraggable(player);
      this.view.addListenersCounters(this.model.currentPlayer);
      
    })

    this.view.showPauseMenuEvent.addListener(()=>{
      this.view.showPauseMenu();
    })

    this.view.PauseMenuContinueEvent.addListener(()=>{
      this.view.hidePauseMenu();
    })

    this.view.PauseMenuResetEvent.addListener(()=>{
      this.restartGame();
      this.view.hidePauseMenu();
    })

    this.view.PauseQuitEvent.addListener(()=>{
      this.restartGame();
      this.view.showMenu();
    })

    // default setup of game 
    
    
   
  }

  restartGame()
  {
      this.model.clearGameArray();
      this.view.removeGameCounters();
      this.view.init();
      this.view.changeTurn("red");
      this.model.Player1.score=0;
      this.model.Player2.score=0;
      this.view.setPlayerScore(0,0);
      this.view.setPlayerScore(1,0);
  }

  playagain() {
      this.model.clearGameArray();
      this.view.removeGameCounters();
      this.view.init();
      this.model.switchPlayer(this.model.gameStarter)
      this.view.changeTurn(this.model.currentPlayer);
      this.model.gameStarter =this.model.currentPlayer;
      this.view.removeListeners();
      this.view.CountersNotDraggable(this.model.switchColor(this.model.currentPlayer));
      this.view.addListenersCounters(this.model.currentPlayer);
  }

  run() {
    //this.view.hideGameboard();
    this.view.render();
    this.view.showMenu();
    
  }

  

  dragover(over) {
    this.view.showMarker(this.model.currentPlayer, over);
  }
}

export default gameController;
