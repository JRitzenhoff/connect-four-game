import {
    GAMEBOARD_ROWS, SPEED_RATE_FACTOR, START_DROP_DELAY_MILLISECONDS, COLUMN_CLASS_NAME,
    ROW_CLASS_NAME, PLAYER_ORDER, PLAYER_ENUM, PLAYER_ICONS
} from './constants.js';

window.activePlayer = PLAYER_ENUM.ONE;


const buildGameBoard = () => {
    const gameBoard = document.getElementById('game-board')

    const gameDropColumns = gameBoard.getElementsByClassName('drop-column')

    gameBoard.style.gridTemplateColumns = `repeat(${gameDropColumns.length}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${GAMEBOARD_ROWS}, 100px)`;

    for (let columnIndex = 0; columnIndex < gameDropColumns.length; ++columnIndex) {
        for (let rowIndex = 0; rowIndex < GAMEBOARD_ROWS; ++rowIndex) {
            const gameBox = document.createElement('div');
            gameBox.classList.add('box')
            gameBox.style.opacity = '1';
            gameDropColumns[columnIndex].appendChild(gameBox);
        }
    }

    return gameBoard;
}

const extractColumnElements = (columnIndex) => {
    const allColumns = document.getElementsByClassName(COLUMN_CLASS_NAME);
    const selectedColumnBoxes = allColumns[columnIndex].getElementsByClassName(ROW_CLASS_NAME);
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
    return icon
}

const getNextActivePlayer = (playerId) => {
    const currentPlayerIndex = PLAYER_ORDER.indexOf(playerId);

    if (currentPlayerIndex == -1) {
        return null;
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % PLAYER_ORDER.length;
    return PLAYER_ORDER[nextPlayerIndex];
}

const moveIcon = (columnIndex) => {
    const [startElement, endElement] = extractColumnElements(columnIndex);
    const icon = createPlayerIcon(window.activePlayer);

    // if all of the rows in the column are already full
    if (!startElement || !endElement || !icon) {
        return;
    }

    window.activePlayer = getNextActivePlayer(window.activePlayer);

    // Get the position of the start and end elements   
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();

    // add the icon to the final box
    endElement.appendChild(icon);

    // Trigger the movement
    setTimeout(() => {
        // Animate the icon to the end element's position
        // const deltaX = endRect.left - startRect.left;
        const deltaY = endRect.top - startRect.top;

        // Set the initial position of the icon (starting position)
        //  NOTE: Ideally the position would be relative but I ran into some CSS issues
        icon.style.position = 'absolute'
        icon.style.top = `${startRect.top + 5}px`;
        icon.style.left = `${startRect.left + 10}px`;
        icon.style.opacity = '1'; // Make the icon visible

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

        // // TEMP: Color the top and bottom of every column
        // columnElements[0].style.backgroundColor = COLOR_PAIRS[columnIndex][0];
        // columnElements[columnElements.length - 1].style.backgroundColor = COLOR_PAIRS[columnIndex][1];

        // TEMP: Should move out of the gameBoard to handle button clicks
        columnElements[0].addEventListener('click', () => moveIcon(columnIndex));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});
