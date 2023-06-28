/**
 * The gameboard module is an IIFE that returns an object that contains a 2d array representing the gameboard
 */
const gameboard = (() => {
    var array = [
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
        ['X', 'O', 'X']
    ];
    return {array};
})();

const displayController = (() => {
    var turn = 'X';
    /**
     * The display controller function controls the flow of the game and determines who can play
     * @param {string} turn This takes in the character that just played
     * @returns The character that needs to play next
     */
    const toggleTurn = (turn) => {
        return (turn === 'X') ? 'O' : 'X';
    };
    return {turn, toggleTurn};
})();

function playerFactory(name, character){
    return {name, character};
}

function renderGameboard(array){
    const grid = document.getElementById("grid");
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            grid.children[i].children[j].textContent = array[i][j];
        }
    }
}

renderGameboard(gameboard.array);


