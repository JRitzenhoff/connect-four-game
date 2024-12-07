let desktopAnimation = [
  [
    { left: "29.2%", top: " 22%" },
    { left: "29.2%", top: " 32%" },
    { left: "29.2%", top: " 41.5%" },
    { left: "29.2%", top: " 51.5%" },
    { left: "29.2%", top: " 61.2%" },
    { left: "29.2%", top: " 71%" },
  ],
  [
    { left: "35.4%", top: " 22%" },
    { left: "35.4%", top: " 32%" },
    { left: "35.4%", top: " 41.5%" },
    { left: "35.4%", top: " 51.5%" },
    { left: "35.4%", top: " 61.2%" },
    { left: "35.4%", top: " 71%" },
  ],
  [
    { left: "41.4%", top: " 22%" },
    { left: "41.4%", top: " 32%" },
    { left: "41.4%", top: " 41.5%" },
    { left: "41.4%", top: " 51.5%" },
    { left: "41.4%", top: " 61.2%" },
    { left: "41.4%", top: " 71%" },
  ],
  [
    { left: "47.4%", top: " 22%" },
    { left: "47.4%", top: " 32%" },
    { left: "47.4%", top: " 41.5%" },
    { left: "47.4%", top: " 51.5%" },
    { left: "47.4%", top: " 61.2%" },
    { left: "47.4%", top: " 71%" },
  ],
  [
    { left: "53.7%", top: " 22%" },
    { left: "53.7%", top: " 32%" },
    { left: "53.7%", top: " 41.5%" },
    { left: "53.7%", top: " 51.5%" },
    { left: "53.7%", top: " 61.2%" },
    { left: "53.7%", top: " 71%" },
  ],
  [
    { left: "59.7%", top: " 22%" },
    { left: "59.7%", top: " 32%" },
    { left: "59.7%", top: " 41.5%" },
    { left: "59.7%", top: " 51.5%" },
    { left: "59.7%", top: " 61.2%" },
    { left: "59.7%", top: " 71%" },
  ],
  [
    { left: "65.9%", Top: " 22%" },
    { left: "65.9%", top: " 32%" },
    { left: "65.9%", top: " 41.5%" },
    { left: "65.9%", top: " 51.5%" },
    { left: "65.9%", top: " 61.2%" },
    { left: "65.9%", top: " 71%" },
  ],
];

const gameArray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
let desktopMarker = [
  "420px",
  "510px",
  "600px",
  "690px",
  "770px",
  "860px",
  "950px",
];

let large = document.getElementById("counter");
let small = document.getElementById("counter1");
let game = document.getElementsByClassName("flex-conter-board");
let board = document.getElementById("3");
let markers = document.querySelectorAll(".markers div");
let markerRedSmall = document.querySelector(".marker-red-small");
let markerRedLarge = document.querySelector(".marker-red-large");
let markerYellowSmall = document.querySelector(".marker-yellow-small");
let markerYellowLarge = document.querySelector(".marker-yellow-large");

let gameboard = document.querySelector(".game-container");
let screen = document.querySelector(".screen");
let gameResult = document.querySelector(".game-result");
let turn = document.querySelector(".turn-red");

const drops = document.querySelectorAll(".droppoint");
const counters = document.querySelectorAll(".counters div");
const countersDesktop = document.querySelector(".game-counters .desktop");

const countersDesktopAll = document.querySelectorAll(".counters .desktop");

const DesktopAllCounters = document.querySelectorAll(".counters .desktop div");
const DesktopAllRed = Array.from(
  document.querySelectorAll(".counters .desktop .counter-red-large")
);
const DesktopAllYellow = Array.from(
  document.querySelectorAll(".counters .desktop .counter-yellow-large")
);

let drop0 = document.getElementById("0");
let drop1 = document.getElementById("1");
let drop2 = document.getElementById("2");
let drop3 = document.getElementById("3");
let drop4 = document.getElementById("4");
let drop5 = document.getElementById("5");
let drop6 = document.getElementById("6");

function animate(element, frames) {
  if (frames.length === 1) {
    frames.push(frames[0]);
  }

  // this steps through the provided keyFrames at the provided duration
  element.animate(frames, {
    duration: 500,
    iterations: 1,
    fill: "forwards",
  });
}

function checkScreenSize() {
  let screen = "";

  if (window.matchMedia("(min-width: 1440px)").matches) {
    screen = "desktop";
  }

  return screen;
}

function setDisplayCounters(counters) {
  counters.forEach((item) => {
    item.display = none;
  });
}

function animateOnScreen(element, frameNumber) {

  animate(element, desktopAnimation[frameNumber]);
  savePlayerMove(element, desktopAnimation[frameNumber], frameNumber);

  setCounterPosition(element, frameNumber);
}

function setCounterPosition(element, frameNumber) {
  let desktop = desktopAnimation[frameNumber].pop();
  const prefix = ["desktop"];
  let elementNumber = element.id.split("#")[1];

  let name = "desktop" + "#" + elementNumber;
  let newElement = document.getElementById(name.toString());

  newElement.style.left = desktop.left;
  newElement.style.top = desktop.top;
  moveCounterToGameBoard(newElement, "desktop");
}

function moveCounterToGameBoard(element, boardElement) {
  let board = document.querySelector(".game-counters ." + boardElement);
  board.appendChild(element);
}

drops.forEach((droppoint) => {
  droppoint.addEventListener("dragenter", dragEnter);
  droppoint.addEventListener("dragover", dragOver);
  droppoint.addEventListener("dragleave", dragLeave);
  droppoint.addEventListener("drop", drop);
});
counters.forEach((counter) => {
  counter.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnter(e) {
  e.preventDefault();

  let color = e.dataTransfer.getData("text/plain").split("-")[1];
  let target = e.target.id;
  showMarker(color, target);
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
}

function drop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const dragElement = document.getElementById(id);
  let color = getCounterColor(dragElement);
  animateOnScreen(dragElement, parseInt(e.target.id));

  respondForMove(color);
}

var activeEvent = "";
var originalX = "";
var originalY = "";



counters.forEach((counter) => {
  counter.addEventListener("touchstart", TouchStart);
  counter.addEventListener("touchmove", TouchMove);
  counter.addEventListener("touchend", TouchEnd);
});

function TouchStart(e) {
  originalX = e.target.offsetLeft + "px";
  originalY = e.target.offsetTop + "px";
  hideAllMarkes();
  activeEvent = "start";
}

function TouchMove(e) {
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

function TouchEnd(e) {
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

function detectTouchEnd(pageX, pageY, width) {
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

function showMarker(color, target) {
  console.log(color);
  let markerSmall = markerRedSmall;
  let markerLarge = markerRedLarge;
  if (color === "yellow") {
    markerSmall = markerYellowSmall;
    markerLarge = markerYellowLarge;
  }

  if (checkScreenSize() === "desktop") {
    markerLarge.style.position = "absolute";
    markerLarge.style.left = desktopMarker[target];
    markerLarge.style.top = "100px";
    markerLarge.style.display = "block";
  }
}

function respondForMove(color) {
  if (checkWinner(color)) {
    turn.style.display = "none";
    gameResult.style.display = "block";
  } else {
    color === "red" ? (color = "yellow") : (color = "red");
    changeTurn(color);
  }
}

function hideAllMarkes() {
  markers.forEach((marker) => {
    marker.style.display = "none";
  });
}

hideAllMarkes();

function savePlayerMove(element, animationFrameArr, position) {
  gameArray[animationFrameArr.length - 1][position] = getCounterColor(element);
}

function getCounterColor(element) {
  return element.id.split("-")[1];
}

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

function changeTurn(color) {
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

function runGame() {
  gameResult.style.display = "none";

  let redActive = true;
  let redCounter = 20;
  let yellowCounter = 20;

  // Add an eventsource callback that calls the drop-command with the current counter value
  const evntSource = new EventSource('/receive_events');
  evntSource.onmessage = (eventMessage) => {
    console.log('Got counter event', eventMessage.data);

    let spoofedDataTransfer = new DataTransfer();

    if (redActive) {
      spoofedDataTransfer.setData("text/plain", `desktop#${redCounter}-red`);
      redCounter = redCounter - 1;
    }
    else {
      spoofedDataTransfer.setData("text/plain", `desktop#${yellowCounter}-yellow`);
      yellowCounter = yellowCounter - 1;
    }
    redActive = !redActive;

    const spoofedTarget = {
      id: eventMessage.data
    };

    const spoofedCounterEvent = {
      dataTransfer: spoofedDataTransfer,
      target: spoofedTarget
    };

    drop(spoofedCounterEvent)
  };
}

runGame();
