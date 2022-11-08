import { mobileAnimation,tabletAnimation,desktopAnimation } from "./animationFrame.js";
export default class gameView {
  
  constructor() {
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
    this.large = document.getElementById("counter");
    this.small = document.getElementById("counter1");
    this.game = document.getElementsByClassName("flex-conter-board");
    this.board = document.getElementById("3");
    this.markers = document.querySelectorAll(".markers div");
    this.markerRedSmall = document.querySelector(".marker-red-small");
    this.markerRedLarge = document.querySelector(".marker-red-large");
    this.markerYellowSmall = document.querySelector(".marker-yellow-small");
    this.markerYellowLarge = document.querySelector(".marker-yellow-large");
    this.gameboard = document.querySelector(".game-container");
    this.screen = document.querySelector(".screen");
    this.gameResult = document.querySelector(".game-result");
    this.turn = document.querySelector(".turn-red");
    this.drops = document.querySelectorAll(".droppoint");
    this.counters = document.querySelectorAll(".counters div");
    this.countersMobile = document.querySelector(".game-counters .mobile");
    this.countersTablet = document.querySelector(".game-counters .tablet");
    this.countersDesktop = document.querySelector(".game-counters .desktop");
    this.countersMobileAll = document.querySelectorAll(".counters .mobile");
    this.countersTabletAll = document.querySelectorAll(".counters .tablet");
    this.countersDesktopAll = document.querySelectorAll(".counters .desktop");
    this.MobileAllCounters = document.querySelectorAll(".counters .mobile div");
    this.MobileAllRed = document.querySelectorAll(
      ".counters .mobile .counter-red-small"
    );
    this.MobileAllYellow = document.querySelectorAll(
      ".counters .mobile .counter-yellow-small"
    );
    this.TabletAllCounters = document.querySelectorAll(".counters .tablet div");
    this.TabletAllRed = document.querySelectorAll(
      ".counters .tablet .counter-red-large"
    );
    this.TabletAllYellow = document.querySelectorAll(
      ".counters .tablet .counter-yellow-large"
    );
    this.DesktopAllCounters = document.querySelectorAll(
      ".counters .desktop div"
    );
    this.DesktopAllRed = Array.from(
      document.querySelectorAll(".counters .desktop .counter-red-large")
    );
    this.DesktopAllYellow = Array.from(
      document.querySelectorAll(".counters .desktop .counter-yellow-large")
    );
    
    this.activeEvent = "";
    this.originalX = "";
    this.originalY = "";
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
    let screen = "";

    if (window.matchMedia("(max-width: 767px)").matches) {
      screen = "mobile";
    }
    if (
      window.matchMedia("(min-width: 768px) and (max-width: 1439px)").matches
    ) {
      screen = "tablet";
    }
    if (window.matchMedia("(min-width: 1440px)").matches) {
      screen = "desktop";
    }

    return screen;
  }

  setDisplayCounters(counters) {
    counters.forEach((item) => {
      item.display = none;
    });
  }

  animateOnScreen(element, frameNumber) {
    switch (checkScreenSize()) {
      case "mobile":
        animate(element, mobileAnimation[frameNumber]);
        savePlayerMove(element, mobileAnimation[frameNumber], frameNumber);
        break;
      case "tablet":
        animate(element, tabletAnimation[frameNumber]);
        savePlayerMove(element, tabletAnimation[frameNumber], frameNumber);
        break;
      case "desktop":
        animate(element, desktopAnimation[frameNumber]);
        savePlayerMove(element, desktopAnimation[frameNumber], frameNumber);
        break;
    }
    setCounterPosition(element, frameNumber);
  }

  setCounterPosition(element, frameNumber) {
    let desktop = desktopAnimation[frameNumber].pop();
    let tablet = tabletAnimation[frameNumber].pop();
    let mobile = mobileAnimation[frameNumber].pop();
    const prefix = ["desktop", "tablet", "mobile"];
    let elementNumber = element.id.split("#")[1];
    prefix.forEach((item) => {
      let name = item + "#" + elementNumber;
      let newElement = document.getElementById(name.toString());
      switch (item) {
        case "desktop":
          newElement.style.left = desktop.left;
          newElement.style.top = desktop.top;
          moveCounterToGameBoard(newElement, "desktop");
          break;
        case "tablet":
          newElement.style.left = tablet.left;
          newElement.style.top = tablet.top;
          moveCounterToGameBoard(newElement, "tablet");
          break;
        case "mobile":
          newElement.style.left = mobile.left;
          newElement.style.top = mobile.top;
          moveCounterToGameBoard(newElement, "mobile");
          break;
      }
    });
  }

  moveCounterToGameBoard(element, boardElement) {
    let board = document.querySelector(".game-counters ." + boardElement);
    board.appendChild(element);
  }
  addListeners() {
    drops.forEach((droppoint) => {
      droppoint.addEventListener("dragenter", dragEnter);
      droppoint.addEventListener("dragover", dragOver);
      droppoint.addEventListener("dragleave", dragLeave);
      droppoint.addEventListener("drop", drop);
    });
    counters.forEach((counter) => {
      counter.addEventListener("dragstart", dragStart);
    });

    counters.forEach((counter) => {
      counter.addEventListener("touchstart", TouchStart);
      counter.addEventListener("touchmove", TouchMove);
      counter.addEventListener("touchend", TouchEnd);
    });
  }

  dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  dragEnter(e) {
    e.preventDefault();

    let color = e.dataTransfer.getData("text/plain").split("-")[1];
    let target = e.target.id;
    showMarker(color, target);
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragLeave(e) {
    e.preventDefault();
  }

  drop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const dragElement = document.getElementById(id);
    let color = getCounterColor(dragElement);
    animateOnScreen(dragElement, parseInt(e.target.id));

    respondForMove(color);
  }

  TouchStart(e) {
    originalX = e.target.offsetLeft + "px";
    originalY = e.target.offsetTop + "px";
    hideAllMarkes();
    activeEvent = "start";
  }

  TouchMove(e) {
    e.preventDefault();
    let width = parseInt(window.getComputedStyle(e.target).width);
    var touchLocation = e.targetTouches[0];

    let color = touchLocation.target.id.split("-")[1];
    var pageX = touchLocation.pageX - 50 + "px";
    var pageY = touchLocation.pageY - 50 + "px";
    e.target.style.zIndex = 100;
    e.target.style.position = "absolute";
    e.target.style.left = pageX;
    e.target.style.top = pageY;

    activeEvent = "move";
    if (detectTouchEnd(pageX, pageY, width) != null) {
      let current = detectTouchEnd(pageX, pageY, width);
      showMarker(color, current.id);
    }
  }

  TouchEnd(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let element = e.target;
    if (activeEvent === "move") {
      let pageX = parseInt(e.target.style.left);
      let pageY = parseInt(e.target.style.top);
      let width = parseInt(window.getComputedStyle(e.target).width);
      element.style.zIndex = 10;

      if (detectTouchEnd(pageX, pageY, width) != null) {
        let current = detectTouchEnd(pageX, pageY, width);
        animateOnScreen(element, parseInt(current.id));
      } else {
        e.target.style.left = originalX;
        e.target.style.top = originalY;
      }
    }
    let color = getCounterColor(element);
    respondForMove(color);
  }

  detectTouchEnd(pageX, pageY, width) {
    let scrollTop = window.pageYOffset;
    let currentDrop = null;
    drops.forEach((current) => {
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
    return currentDrop;
  }

  showMarker(color, target) {
    console.log(color);
    let markerSmall = markerRedSmall;
    let markerLarge = markerRedLarge;
    if (color === "yellow") {
      markerSmall = markerYellowSmall;
      markerLarge = markerYellowLarge;
    }

    if (checkScreenSize() === "mobile") {
      markerSmall.style.position = "absolute";
      markerSmall.style.left = mobileMarker[target];
      markerSmall.style.top = "230px";
      markerSmall.style.display = "block";
    } else if (checkScreenSize() === "tablet") {
      markerLarge.style.position = "absolute";
      markerLarge.style.left = tabletMarker[target];
      markerLarge.style.top = "230px";
      markerLarge.style.display = "block";
    } else if (checkScreenSize() === "desktop") {
      markerLarge.style.position = "absolute";
      markerLarge.style.left = desktopMarker[target];
      markerLarge.style.top = "100px";
      markerLarge.style.display = "block";
    }
  }

  respondForMove(color) {
    if (checkWinner(color)) {
      turn.style.display = "none";
      gameResult.style.display = "block";
    } else {
      color === "red" ? (color = "yellow") : (color = "red");
      changeTurn(color);
    }
  }

  hideAllMarkes() {
    markers.forEach((marker) => {
      marker.style.display = "none";
    });
  }

  savePlayerMove(element, animationFrameArr, position) {
    gameArray[animationFrameArr.length - 1][position] =
      getCounterColor(element);
  }

  getCounterColor(element) {
    return element.id.split("-")[1];
  }

  changeTurn(color) {
    if (color === "red") {
      turn.style.backgroundImage =
        "url('../assets/images/turn-background-red.svg')";
      turn.textContent = "Player 1's turn";
    } else {
      turn.style.backgroundImage =
        "url('../assets/images/turn-background-yellow.svg')";
      turn.textContent = "Player 2's turn";
    }
  }

  runGame() {
    gameResult.style.display = "none";
  }
}





import { gameview } from "./gameView.js";




class gameController {
  constructor(gameview)
  {
    this.gameView =gameview;
    const gameArray = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  }

init() {
  this.gameView.addListeners();
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
