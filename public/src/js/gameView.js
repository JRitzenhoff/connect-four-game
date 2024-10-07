import Event from "./event.js";
import { mobileAnimation, tabletAnimation, desktopAnimation } from "./animationFrame.js"

class gameView {
  constructor() {
    this.object = this;
    this.dropEvent = new Event();
    this.dragoverEvent = new Event();
    this.dragLeaveEvent = new Event();
    this.showMenuEvent = new Event();
    this.showPauseMenuEvent = new Event();
    this.PauseMenuContinueEvent = new Event();
    this.PauseMenuResetEvent = new Event();
    this.PauseQuitEvent = new Event();
    this.resetGameEvent = new Event();
    this.playagainEvent = new Event();
    this.mainmenuVsCpuEvent = new Event();
    this.mainmenuVsPlayerEvent = new Event();
    this.mainmenuGameRulesOpenEvent = new Event();
    this.mainmenuGameRulesCloseEvent = new Event();
    this.desktopAnimation = desktopAnimation;
    this.tabletAnimation = tabletAnimation;
    this.mobileAnimation = mobileAnimation;
    this.desktopMarker = [
      "420px",
      "510px",
      "600px",
      "690px",
      "770px",
      "860px",
      "950px",
    ];
    this.mobileMarker = [
      "25px",
      "75px",
      "120px",
      "170px",
      "215px",
      "260px",
      "310px",
    ];
    this.tabletMarker = [
      "95px",
      "185px",
      "270px",
      "355px",
      "450px",
      "540px",
      "630px",
    ];

    this.game = document.getElementsByClassName("flex-conter-board");
    this.markers = document.querySelectorAll(".markers div");
    this.markerRedSmall = document.querySelector(".marker-red-small");
    this.markerRedLarge = document.querySelector(".marker-red-large");
    this.markerYellowSmall = document.querySelector(".marker-yellow-small");
    this.markerYellowLarge = document.querySelector(".marker-yellow-large");
    this.screenSize = document.querySelector(".screen");
    this.gameResult = document.querySelector(".game-result");
    this.gameResultPlayer = document.querySelector(".game-result .playername");
    this.turn = document.querySelector(".turn-red");
    this.drops = document.querySelectorAll(".droppoint");

    this.prefix = ["desktop", "tablet", "mobile"];

    //gameboard menu
    this.menu = document.querySelector(".menu-top div:first-child");
    this.reset = document.querySelector(".menu-top div:last-child");
    //gameboard menu
    this.playerName = document.querySelectorAll('.player-box .playername')
    this.playerScore = document.querySelectorAll('.player-box .player-score')
    this.playagain = document.querySelector(".playagain");
    //main menu
    this.mainmenu = document.querySelector(".flex-center-menu");
    this.gameRules = document.querySelector(".flex-center-rules");
    this.mainmenuGameRulesClose = document.querySelector('.rules-container .tick');
    this.mainmenuGameRulesOpen = document.querySelector(".flex-center-menu .menu-item:nth-child(3)");
    this.mainmenuVsCpu = document.querySelector(".flex-center-menu .menu-item:nth-child(3)");
    this.mainmenuVsPlayer = document.querySelector(".flex-center-menu .menu-item:nth-child(2)");
    //main menu
    this.gameboard = document.querySelector(".flex-conter-board");

    //pause menu
    this.pauseMenu = document.querySelector(".flex-center-pausemenu");
    this.pauseMenuContinue = document.querySelector(".flex-center-pausemenu .continue");
    this.pauseMenuRestart = document.querySelector(".flex-center-pausemenu .restart");
    this.pauseMenuQuit = document.querySelector(".flex-center-pausemenu .quit");
    //pause menu
    this.activeEvent = "";
    this.originalX = "";
    this.originalY = "";
    this.screen = "";


  }

  animate(element, frames) {
    if (frames.length === 1) {
      frames.push(frames[0]);
    }
    element.animate(frames, {
      duration: 500,
      iterations: 1,
      fill: "forwards",
    });
  }

  checkScreenSize() {

    if (window.matchMedia("(max-width: 767px)").matches) {
      this.screen = "mobile";
    }
    if (
      window.matchMedia("(min-width: 768px) and (max-width: 1439px)").matches
    ) {
      this.screen = "tablet";
    }
    if (window.matchMedia("(min-width: 1440px)").matches) {
      this.screen = "desktop";
    }
  }

  setDisplayCounters(counters) {
    counters.forEach((item) => {
      item.display = none;
    });
  }

  runAnimation(data) {
    this.screen == "mobile" ? this.animate(data.element, this.mobileAnimation[data.column].slice(0, data.lenght + 1)) : "";
    this.screen == "tablet" ? this.animate(data.element, this.tabletAnimation[data.column].slice(0, data.lenght + 1)) : "";
    this.screen == "desktop" ? this.animate(data.element, this.desktopAnimation[data.column].slice(0, data.lenght + 1)) : "";
    this.setCounterPosition(data.element, data.column, data.lenght);
  }

  // function move counters on gameboard for all screen size
  setCounterPosition(element, column, lenght) {
    let desktop = this.desktopAnimation[column].slice(lenght, lenght + 1);
    let tablet = this.tabletAnimation[column].slice(lenght, lenght + 1);
    let mobile = this.mobileAnimation[column].slice(lenght, lenght + 1);

    let elementNumber = element.id.split("#")[1];
    this.prefix.forEach((item) => {
      let name = item + "#" + elementNumber;
      let newElement = document.getElementById(name.toString());
      switch (item) {
        case "desktop":
          newElement.style.position = "absolute";
          newElement.style.left = desktop[0].left;
          newElement.style.top = desktop[0].top;
          this.moveCounterToGameBoard(newElement, "desktop");
          break;
        case "tablet":
          newElement.style.position = "absolute";
          newElement.style.left = tablet[0].left;
          newElement.style.top = tablet[0].top;
          this.moveCounterToGameBoard(newElement, "tablet");
          break;
        case "mobile":
          newElement.style.position = "absolute";
          newElement.style.left = mobile[0].left;
          newElement.style.top = mobile[0].top;
          this.moveCounterToGameBoard(newElement, "mobile");
          break;
      }
    });
  }

  moveCounterToGameBoard(element, boardElement) {
    let board = document.querySelector(".game-counters ." + boardElement);
    board.appendChild(element);
  }

  detectTouchEnd(pageX, pageY, width) {
    let scrollTop = window.pageYOffset;
    let currentDrop = null;
    let shift = (this.screenSize.offsetWidth - this.gameboard.offsetWidth) / 2;
    if (this.screenSize.offsetWidth > this.gameboard.offsetWidth) {
      this.drops.forEach((current) => {
        if (
          (parseInt(pageX) + width / 2) - shift > current.getBoundingClientRect().left &&
          (parseInt(pageX) + width / 2) - shift < current.getBoundingClientRect().right &&
          (parseInt(pageY) + width / 2) > current.getBoundingClientRect().top &&
          (parseInt(pageY) + width / 2) < current.getBoundingClientRect().bottom + scrollTop
        ) {
          currentDrop = current;
        }
      });
    } else {
      this.drops.forEach((current) => {
        if (
          parseInt(pageX) + width / 2 > current.getBoundingClientRect().left &&
          parseInt(pageX) + width / 2 < current.getBoundingClientRect().right &&
          parseInt(pageY) + width / 2 > current.getBoundingClientRect().top &&
          parseInt(pageY) + width / 2 <
          current.getBoundingClientRect().bottom + scrollTop
        ) {
          currentDrop = current;
        }
      });
    }

    return currentDrop;
  }

  showMarker(color, target) {

    let markerSmall = this.markerRedSmall;
    let markerLarge = this.markerRedLarge;
    if (color === "yellow") {
      markerSmall = this.markerYellowSmall;
      markerLarge = this.markerYellowLarge;
    }


    if (this.screen === "mobile") {
      markerSmall.style.position = "absolute";
      markerSmall.style.left = this.mobileMarker[target];
      markerSmall.style.top = "230px";
      markerSmall.style.display = "block";

    } else if (this.screen === "tablet") {
      markerLarge.style.position = "absolute";
      markerLarge.style.left = this.tabletMarker[target];
      markerLarge.style.top = "230px";
      markerLarge.style.display = "block";

    } else if (this.screen === "desktop") {
      markerLarge.style.position = "absolute";
      markerLarge.style.left = this.desktopMarker[target];
      markerLarge.style.top = "100px";
      markerLarge.style.display = "block";
    }
  }


  hideAllMarkes() {
    this.markers.forEach((marker) => {
      marker.style.display = "none";
    });
  }
  // remove all counters from the game 
  removeAllGameCounters() {
    let deleteGameCounters = document.querySelectorAll(".game-counters div:not(.desktop):not(.tablet):not(.mobile)");
    let deleteCounters = document.querySelectorAll(".counters div:not(.desktop):not(.tablet):not(.mobile)")
    deleteGameCounters.forEach(element => {
      element.remove();
    })
    deleteCounters.forEach(element => {
      element.remove();
    })


  }

  changefooterColor(color) {
    let footer = document.querySelector(".footer");
    switch (color) {
      case "red":
        footer.style.backgroundColor = "#FD6687";
        break;
      case "yellow":
        footer.style.backgroundColor = "#FFCE67";
        break;
      default:
        footer.style.backgroundColor = "#5C2DD5";
        break;
    }

  }



  setPlayerName(playerNumber, playerName) {

    let player = document.getElementById(this.playerName[playerNumber].id);
    player.innerHTML = playerScore;
  }
  setPlayerScore(playerNumber, playerScore) {
    let player = document.getElementById(this.playerScore[playerNumber].id);
    player.innerHTML = playerScore;
  }

  changeTurn(color) {

    switch (color) {
      case "red":
        this.turn.style.backgroundImage =
          "url('./src/assets/images/turn-background-red.svg')";
        this.turn.textContent = "Player 1's turn";
        break;
      case "yellow":
        this.turn.style.backgroundImage =
          "url('./src/assets/images/turn-background-yellow.svg')";
        this.turn.textContent = "Player 2's turn";
        break;
    }



  }

  CountersNotDraggable(red, yellow) {

    let countersRed = document.querySelectorAll(".counters .counter-red-small, .counter-red-large");
    let countersYellow = document.querySelectorAll(".counters .counter-yellow-small, .counter-yellow-large");

    countersRed.forEach(element => {
      element.draggable = red;
    })
    countersYellow.forEach(element => {
      element.draggable = yellow;
    })
  }

  hideGameResult() {
    this.gameResult.style.display = "none";
  }

  showGameResult(data) {
    this.gameResult.style.display = "flex";
    this.gameResultPlayer.innerHTML = data.playerName;
    data.counters === "red" ? this.setPlayerScore(0, data.score) : this.setPlayerScore(1, data.score);
  }

  hideGameboard() {
    this.gameboard.style.display = "none";
  }

  showGameboard() {
    this.gameboard.style.display = "flex";
  }

  showGameRules() {
    this.gameRules.style.display = "flex";
  }

  hideGameRules() {
    this.gameRules.style.display = "none";
  }

  createCounters(quantity = 1, className, prefix, color) {
    let location = document.querySelector(".counters ." + prefix);
    for (let i = 1; i < quantity + 1; i++) {
      let element = document.createElement("div");
      element.id = prefix + "#" + i + "-" + color;
      element.className = className;
      element.draggable = true;
      location.appendChild(element);
    }
  }

  showPauseMenu() {
    this.pauseMenu.style.display = "flex";
  }

  hidePauseMenu() {
    this.pauseMenu.style.display = "none";
  }

  showMenu() {
    this.mainmenu.style.display = "flex";
  }

  hideMenu() {
    this.mainmenu.style.display = "none";
  }

  render() {
    // main menu 
    this.mainmenuVsCpu.addEventListener("click", (event) => {
      this.mainmenuVsCpuEvent.trigger("VSCPU");
    });
    this.mainmenuVsPlayer.addEventListener("click", (event) => {
      this.mainmenuVsPlayerEvent.trigger("VsPlayer");
    });
    this.mainmenuGameRulesOpen.addEventListener("click", (event) => {
      this.mainmenuGameRulesOpenEvent.trigger("rules");
    });
    this.mainmenuGameRulesClose.addEventListener("click", () => {
      this.mainmenuGameRulesCloseEvent.trigger("rules");
    })


    // main menu

  }

  renderGame() {


    this.playagain.addEventListener("click", (event) => {
      this.playagainEvent.trigger("playAgain");
    });
    // pause menu 
    this.pauseMenuContinue.addEventListener("click", (event) => {
      this.PauseMenuContinueEvent.trigger();
    });
    this.pauseMenuRestart.addEventListener("click", (event) => {
      this.PauseMenuResetEvent.trigger();
    });
    this.pauseMenuQuit.addEventListener("click", (event) => {
      this.PauseQuitEvent.trigger();
    });
    //pause menu 

    // board controles
    this.reset.addEventListener("click", (event) => {
      this.resetGameEvent.trigger("reset");
    })
    this.menu.addEventListener("click", (event) => {
      this.showPauseMenuEvent.trigger("menu");
    })
    // board controles
    addEventListener('resize', (event) => {
      this.checkScreenSize();
    });




  }


  addListenersDroppoint() {
    this.drops.forEach((droppoint) => {
      droppoint.addEventListener("dragenter", this.dragEnter.bind(this));
      droppoint.addEventListener("dragover", this.dragOver.bind(this));
      droppoint.addEventListener("dragleave", this.dragLeave.bind(this));
      droppoint.addEventListener("drop", this.drop.bind(this));
    });

  }

  addListenersCounters(color) {
    let counters = "";
    let countersRed = document.querySelectorAll(".counters .counter-red-small, .counter-red-large");
    let countersYellow = document.querySelectorAll(".counters .counter-yellow-small, .counter-yellow-large");
    color === "red" ? counters = countersRed : counters = countersYellow;
    counters.forEach((counter) => {
      counter.addEventListener("dragstart", this.dragStart.bind(this));
    });
    counters.forEach((counter) => {
      counter.addEventListener("touchstart", this.TouchStart.bind(this));
      counter.addEventListener("touchmove", this.TouchMove.bind(this));
      counter.addEventListener("touchend", this.TouchEnd.bind(this));
    });
  }

  removeListeners() {
    let counters = document.querySelectorAll(".counters div");
    counters.forEach((counter) => {
      counter.replaceWith(counter.cloneNode(true));
    });
  }


  dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    console.log(`The drag-start event id is: ${event.target.id}`)
  }

  dragEnter(event) {
    event.preventDefault();

    let color = event.dataTransfer.getData("text/plain").split("-")[1];
    let target = event.target.id;
  }

  dragOver(event) {
    event.preventDefault();

    this.dragoverEvent.trigger(event.target.id);
  }

  dragLeave(event) {
    event.preventDefault();
  }

  drop(event) {
    const id = event.dataTransfer.getData("text/plain");
    console.log(`Dropping current item id: ${id} into target id: ${event.target.id}`);
    const dragElement = document.getElementById(id);
    this.dropEvent.trigger([event.target.id, dragElement]);
  }

  TouchStart(event) {
    this.originalX = event.target.offsetLeft + "px";
    this.originalY = event.target.offsetTop + "px";
    this.activeEvent = "start";
  }

  TouchMove(event) {
    event.preventDefault();
    let pageX;
    let pageY;
    let width = parseInt(window.getComputedStyle(event.target).width);
    let touchLocation = event.targetTouches[0];
    let shift = (this.screenSize.offsetWidth - this.gameboard.offsetWidth) / 2;
    let color = touchLocation.target.id.split("-")[1];
    if (this.screenSize.offsetWidth > this.gameboard.offsetWidth) {
      pageX = touchLocation.pageX - shift - 50 + "px";
      pageY = touchLocation.pageY + "px";
    } else {
      pageX = touchLocation.pageX - 50 + "px";
      pageY = touchLocation.pageY - 50 + "px";
    }

    event.target.style.zIndex = 100;
    event.target.style.position = "absolute";
    event.target.style.left = pageX;
    event.target.style.top = pageY;

    this.activeEvent = "move";
    if (this.detectTouchEnd(pageX, pageY, width) != null) {
      let current = this.detectTouchEnd(pageX, pageY, width);
      this.showMarker(color, current.id);
    }
  }

  TouchEnd(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let element = event.target;
    if (this.activeEvent === "move") {
      let pageX = parseInt(event.target.style.left);
      let pageY = parseInt(event.target.style.top);
      let width = parseInt(window.getComputedStyle(event.target).width);
      element.style.zIndex = 10;

      if (this.detectTouchEnd(pageX, pageY, width) != null) {
        let current = this.detectTouchEnd(pageX, pageY, width);
        this.dropEvent.trigger([current.id, event.target]);

      } else {
        event.target.style.left = this.originalX;
        event.target.style.top = this.originalY;
      }
    }
  }


  init() {
    this.createCounters(20, "counter-red-large", "desktop", "red");
    this.createCounters(20, "counter-red-large", "tablet", "red");
    this.createCounters(20, "counter-red-small", "mobile", "red");
    this.createCounters(20, "counter-yellow-large", "desktop", "yellow");
    this.createCounters(20, "counter-yellow-large", "tablet", "yellow");
    this.createCounters(20, "counter-yellow-small", "mobile", "yellow");

    let redCounter = 20;
    let yellowCounter = 20;
    let redActive = true;

    // Add an eventsource callback that calls the drop-command with the current counter value
    const evntSource = new EventSource('/receive_events');
    evntSource.onmessage = (eventMessage) => {
      console.log('Got counter event', eventMessage.data);

      let spoofedDataTransfer = new DataTransfer();

      if (redActive) {
        spoofedDataTransfer.setData("text/plain", `desktop#${redCounter}-red`);
        redCounter--;
      }
      else {
        spoofedDataTransfer.setData("text/plain", `desktop#${yellowCounter}-yellow`);
        yellowCounter--;
      }
      redActive = !redActive;

      const spoofedTarget = {
        id: eventMessage.data
      };

      const spoofedCounterEvent = {
        dataTransfer: spoofedDataTransfer,
        target: spoofedTarget
      };

      this.drop(spoofedCounterEvent)
    };

  }

}

export default gameView;
