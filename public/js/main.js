import {
    GAMEBOARD_ID, GAMEBOARD_ROW_COUNT, SPEED_RATE_FACTOR, START_DROP_DELAY_MILLISECONDS, COLUMN_CLASS_NAME,
    ROW_CLASS_NAME, PLAYER_ORDER, PLAYER_ENUM, PLAYER_ICONS, REQUIRED_CONNECTION_LENGTH
} from './constants.js';

window.activePlayer = PLAYER_ENUM.ONE;
window.gameIsOver = false;

const extractPlayerId = (box) => {
    if (box.hasChildNodes()) {
        return box.childNodes[0].player;
    }
    return null;
}

const calculateWinner = () => {
    // loop through all of the columns and all of the rows
    // Check horizontal, vertical, and diagonal lines for a win
    const gameBoard = document.getElementById(GAMEBOARD_ID);
    const boardColumns = gameBoard.getElementsByClassName(COLUMN_CLASS_NAME);

    for (let columnIndex = 0; columnIndex < boardColumns.length; ++columnIndex) {
        const currentColumn = boardColumns[columnIndex];
        const currentColumnRows = currentColumn.getElementsByClassName(ROW_CLASS_NAME);

        for (let rowIndex = currentColumnRows.length - 1; rowIndex > 0; --rowIndex) {
            const currentPlayerBox = currentColumnRows[rowIndex];
            const currentPlayer = extractPlayerId(currentPlayerBox);

            if (currentPlayer !== null) {
                // Check horizontally
                if (checkForConnection(rowIndex, columnIndex, 0, 1)) return currentPlayer;

                // Check vertically (up)
                if (checkForConnection(rowIndex, columnIndex, -1, 0)) return currentPlayer;

                // Check diagonal bottom-left to top-right
                if (checkForConnection(rowIndex, columnIndex, -1, 1)) return currentPlayer;

                // Check diagonal bottom-right to top-left
                if (checkForConnection(rowIndex, columnIndex, -1, -1)) return currentPlayer;
            }
            // TEMP: Stop after one row
            break;
        }
    }

    return null;  // No winner found
}

function checkForConnection(startingRow, startingColumn, rowStepSize, columnStepSize) {
    const gameBoard = document.getElementById(GAMEBOARD_ID);
    const columns = gameBoard.getElementsByClassName(COLUMN_CLASS_NAME);
    const startingColumnRows = columns[startingColumn].getElementsByClassName(ROW_CLASS_NAME);
    const startingPlayer = extractPlayerId(startingColumnRows[startingRow]);

    // Check if there are 4 consecutive cells in the given direction
    let checkRowIndex = startingRow;
    let checkColumnIndex = startingColumn;

    for (let lengthCount = 1; lengthCount <= REQUIRED_CONNECTION_LENGTH; lengthCount++) {
        if (checkColumnIndex < 0 || checkRowIndex < 0 || checkColumnIndex >= columns.length) {
            // console.log(`Failing because (${checkRowIndex},${checkColumnIndex})`)
            return false;
        }

        const checkColumn = columns[checkColumnIndex];
        const checkColumnRows = checkColumn.getElementsByClassName(ROW_CLASS_NAME);

        // Ensure the new position is within bounds and the cell matches the player's piece
        if (checkRowIndex >= checkColumnRows.length) {
            // console.log(`Failing because (${checkRowIndex},${checkColumnIndex})`)
            return false;
        }

        const checkPlayer = extractPlayerId(checkColumnRows[checkRowIndex]);
        // console.log(checkPlayer, "(at row)", checkRowIndex, "may not be equal to ", startingPlayer)
        if (checkPlayer != startingPlayer) {
            return false;
        }

        // get the next [row, column] pair in the count
        checkRowIndex += rowStepSize;
        checkColumnIndex += columnStepSize;
    }

    return true;
}


const buildGameBoard = () => {
    const gameBoard = document.getElementById(GAMEBOARD_ID);
    const gameDropColumns = gameBoard.getElementsByClassName(COLUMN_CLASS_NAME);

    // 1fr = 1fraction = splits the available space into equal fractions
    gameBoard.style.gridTemplateColumns = `repeat(${gameDropColumns.length}, 1fr)`;

    // TODO: Magic number for minimum pixel size of the grid
    gameBoard.style.gridTemplateRows = `repeat(${GAMEBOARD_ROW_COUNT}, 100px)`;

    for (let columnIndex = 0; columnIndex < gameDropColumns.length; ++columnIndex) {
        for (let rowIndex = 0; rowIndex < GAMEBOARD_ROW_COUNT; ++rowIndex) {
            const gameBox = createGameBox();
            gameDropColumns[columnIndex].appendChild(gameBox);
        }
    }

    return gameBoard;
}

const extractPossibleColumnElements = (columnIndex) => {
    const gameBoard = document.getElementById(GAMEBOARD_ID);
    const allColumns = gameBoard.getElementsByClassName(COLUMN_CLASS_NAME);
    const selectedColumnBoxes = allColumns[columnIndex - 1].getElementsByClassName(ROW_CLASS_NAME);
    const startElement = selectedColumnBoxes[0];

    let endElement = null;
    for (let columnIndex = selectedColumnBoxes.length - 1; columnIndex >= 0; --columnIndex) {
        let currentElement = selectedColumnBoxes[columnIndex];
        if (!currentElement.hasChildNodes()) {
            endElement = currentElement;
            break;
        }
    }

    return [startElement, endElement];
}

const createPlayerIcon = (playerId) => {
    const icon = document.createElement('span')
    icon.classList.add('icon')
    icon.innerHTML = PLAYER_ICONS[playerId];
    // dynamically create the .player field of the box HTML element
    icon.player = playerId;
    return icon
}

const createGameBox = () => {
    const gameBox = document.createElement('div');
    gameBox.classList.add('box')
    gameBox.style.opacity = '1';

    return gameBox;
}

const getNextActivePlayer = (playerId) => {
    const currentPlayerIndex = PLAYER_ORDER.indexOf(playerId);

    if (currentPlayerIndex == -1) {
        return null;
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % PLAYER_ORDER.length;
    return PLAYER_ORDER[nextPlayerIndex];
}

const dropInColumn = (columnIndex) => {
    if (window.gameIsOver) {
        console.log("Player", window.activePlayer, "won!");
        return;
    }

    const [startElement, endElement] = extractPossibleColumnElements(columnIndex);
    const icon = createPlayerIcon(window.activePlayer);

    // if all of the rows in the column are already full
    if (!startElement || !endElement || !icon) {
        return;
    }

    // Get the position of the start and end elements   
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    // add the icon to the final box
    endElement.appendChild(icon);

    window.gameIsOver = calculateWinner();

    if (!window.gameIsOver) {
        // don't cycle to the next player if the game has been won
        window.activePlayer = getNextActivePlayer(window.activePlayer);
    }
    else {
        console.log("Player", window.activePlayer, "won!");
    }

    // Trigger the movement (after a small delay)
    setTimeout(() => {
        // Animate the icon to the end element's position
        const deltaY = endRect.top - startRect.top;

        // Set the initial position of the icon (starting position)
        // TODO: Remove magic numbers
        icon.style.position = 'absolute' // works because the parent box has a "relative" position
        icon.style.top = `${-deltaY + 1}px`;
        icon.style.left = `${8}px`;
        icon.style.opacity = '1';

        const fallingTime = (deltaY * SPEED_RATE_FACTOR);

        icon.style.transition = `transform ${fallingTime}s ease`; // Ensure smooth transition
        icon.style.transform = `translate(${0}px, ${deltaY}px)`; // Move icon
    }, START_DROP_DELAY_MILLISECONDS);
};

const initializeGame = () => {
    const gameBoard = buildGameBoard()
    const gameBoardColumns = gameBoard.getElementsByClassName(COLUMN_CLASS_NAME);

    for (let columnIndex = 0; columnIndex < gameBoardColumns.length; ++columnIndex) {
        const selectedColumn = gameBoardColumns[columnIndex];

        const columnElements = selectedColumn.getElementsByClassName(ROW_CLASS_NAME);

        // TEMP: Should move out of the gameBoard to handle button clicks
        columnElements[0].addEventListener('click', () => dropInColumn(columnIndex + 1));
    }

    const evntSource = new EventSource('/receive_events');

    /*
    * This will listen only for events
    * similar to the following:
    *
    * event: 'columnNumber'
    * data: <actual data value>
    * id: <actual id value>
    */
    evntSource.addEventListener('columnNumber', message => {
        dropInColumn(message.data);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});
