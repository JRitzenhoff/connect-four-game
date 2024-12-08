export const GAMEBOARD_ROW_COUNT = 6;

export const SPEED_RATE_FACTOR = 0.005;

export const START_DROP_DELAY_MILLISECONDS = 100;

export const REQUIRED_CONNECTION_LENGTH = 4;

export const GAMEBOARD_ID = "game-board";
export const COLUMN_CLASS_NAME = "drop-column";
export const ROW_CLASS_NAME = "box";

export const PLAYER_ENUM = {
    ONE: 'ONE',
    TWO: 'TWO'
};

export const PLAYER_ICONS = {
    [PLAYER_ENUM.ONE]: '🚀',
    [PLAYER_ENUM.TWO]: '🍎'
};

export const PLAYER_ORDER = [PLAYER_ENUM.ONE, PLAYER_ENUM.TWO];



// export const COLOR_PAIRS = [
//     ["#32CD32", "#FF4500"], // Lime Green, Orange Red
//     ["#7CFC00", "#FF6347"], // Lawn Green, Tomato Red
//     ["#228B22", "#B22222"], // Forest Green, Firebrick Red
//     ["#00FA9A", "#CD5C5C"], // Medium Spring Green, Indian Red
//     ["#3CB371", "#D2691E"], // Medium Sea Green, Chocolate Red
//     ["#006400", "#8B0000"], // Dark Green, Dark Red
//     ["#00FF00", "#FF0000"], // Lime, Red
//     ["#006400", "#B22222"], // Dark Green, Firebrick Red
//     ["#2E8B57", "#8B0000"], // Sea Green, Dark Red
// ];