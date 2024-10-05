import gameModel from "./gameModel.js";
import gameView from "./gameView.js";

class gameController {
  constructor() {
    this.model = new gameModel();
    this.view = new gameView();
    this.pauseMenuQuitEvent = false;

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



    this.view.mainmenuGameRulesOpenEvent.addListener(() => {
      this.view.hideMenu();
      this.view.showGameRules()
    })

    this.view.mainmenuGameRulesCloseEvent.addListener(() => {
      this.view.hideGameRules();
      this.view.showMenu();
    })

    this.view.mainmenuVsPlayerEvent.addListener(() => {
      this.view.checkScreenSize();
      if (this.pauseMenuQuitEvent === true) {
        this.restartGame();
        this.pauseMenuQuitEvent == false;
        this.view.hideMenu();
        this.view.showGameboard();
      }
      else {
        this.view.init();
        this.view.renderGame();
        this.view.hideMenu();
        this.view.showGameboard();
        this.view.setPlayerScore(0, 0);
        this.view.setPlayerScore(1, 0);
        this.view.hideAllMarkes();
        this.view.hideGameResult();
        this.view.CountersNotDraggable(this.model.Players[0].currentPlayer, this.model.Players[1].currentPlayer);
        this.view.addListenersDroppoint();
        this.view.addListenersCounters(this.model.currentPlayer);
      }



    })

    this.view.playagainEvent.addListener(() => {
      this.playagain();
      this.view.hideAllMarkes();
      this.view.hideGameResult();
      this.view.changefooterColor();
    })

    this.view.resetGameEvent.addListener((over) => {
      this.restartGame();
    });

    this.model.updateViewEvent.addListener(data => {
      this.view.runAnimation(data);

    });

    this.model.winEvent.addListener(data => {
      this.view.showGameResult(data);
      this.view.changefooterColor(data.counters);
    });

    this.model.switchPlayerEvent.addListener(player => {
      this.view.changeTurn(player);
      this.view.removeListeners();
      this.view.CountersNotDraggable(this.model.Players[0].currentPlayer, this.model.Players[1].currentPlayer);
      this.view.addListenersCounters(this.model.currentPlayer);

    })

    this.view.showPauseMenuEvent.addListener(() => {
      this.view.showPauseMenu();
    })

    this.view.PauseMenuContinueEvent.addListener(() => {
      this.view.hidePauseMenu();
    })

    this.view.PauseMenuResetEvent.addListener(() => {
      this.restartGame();
      this.view.hidePauseMenu();
      this.view.hideGameResult();
    })

    this.view.PauseQuitEvent.addListener(() => {
      this.restartGame();
      this.view.hidePauseMenu();
      this.view.hideGameboard()
      this.view.showMenu();
      this.pauseMenuQuitEvent = true;
    })

    // default setup of game 



  }

  restartGame() {
    this.model.clearGameArray();
    this.view.removeAllGameCounters();
    this.view.init();
    this.model.resetPlayers();
    this.view.setPlayerScore(0, 0);
    this.view.setPlayerScore(1, 0);
    this.view.removeListeners();
    this.view.CountersNotDraggable(this.model.Players[0].currentPlayer, this.model.Players[1].currentPlayer);
    this.view.addListenersCounters(this.model.currentPlayer);
    this.view.changeTurn(this.model.currentPlayer);

  }

  playagain() {
    this.model.clearGameArray();
    this.view.removeAllGameCounters();
    this.view.init();
    this.view.removeListeners();
    this.model.switchStarter();
    this.view.CountersNotDraggable(this.model.Players[0].currentPlayer, this.model.Players[1].currentPlayer);
    this.view.addListenersCounters(this.model.currentPlayer);
    this.view.changeTurn(this.model.currentPlayer);
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
