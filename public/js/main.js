
const buildGameBoard = () => {
    const gameBoard = document.getElementById('game-board')

    for (let ii = 0; ii < 8; ++ii) {
        const gameBox = document.createElement('div');
        gameBox.classList.add('box')

        gameBoard.appendChild(gameBox);
    }
}

const moveIcon = (startElement, endElement) => {
    // create the icon on the grid
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.innerHTML = '🚀';

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

        icon.style.transition = 'transform 1.5s ease'; // Ensure smooth transition
        icon.style.transform = `translate(${0}px, ${deltaY}px)`; // Move icon
    }, 100); // Small delay to start the animation after initial setup
};

const initializeGame = () => {
    buildGameBoard()
    const column1Elements = document.getElementsByClassName("box")

    const startElement = column1Elements[0]
    const endElement = column1Elements[column1Elements.length - 1]

    startElement.style.backgroundColor = 'lightgreen'
    endElement.style.backgroundColor = 'coral'

    // Trigger the icon movement when the start element is clicked
    startElement.addEventListener('click', () => moveIcon(startElement, endElement));
}


document.addEventListener('DOMContentLoaded', () => {
    initializeGame();

});
