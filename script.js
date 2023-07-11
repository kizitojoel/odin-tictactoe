const modal = document.getElementsByClassName("modal")[0];
const overlay = document.getElementsByClassName("overlay")[0];
/**
 * The gameboard module is an IIFE that returns an object that contains a 2d array representing the gameboard
 */
const gameboard = (() => {
    var array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const reset = () => {
        displayController.turn = 'X';
        console.clear();
        modal.classList.remove("active")
        overlay.classList.remove("overlay-visible")
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                array[i][j] = ''; 
            }
        }
        render(array);
    };
    // Add functionality for game restart using button
    const restart = document.getElementById('restart');
    restart.addEventListener('click', reset);

    const render = (inputArray) => {
        const grid = document.getElementById("grid");
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                grid.children[i].children[j].textContent = inputArray[i][j];
            }
        }
    }

    function checkWinner(){
        // Check horizontally
        for (let i = 0; i < 3; i++)
        {
            let row = array[i]
            if (row[0] === row[1] && row[1] === row[2] && row[0])
            {
                return (row[0]);
            }
        }

        // Check vertically
        for (let col = 0; col < 3; col++)
        {
            if (array[0][col] && array[0][col] === array[1][col] && array[1][col] === array[2][col])
            {
                return (array[0][col]);
            }
        }
        
        // Check diagonals
        if (array[0][0] && array[0][0] === array[1][1] && array[1][1] === array[2][2])
        {
            return (array[0][0]);
        }
        if (array[0][2] && array[0][2] === array[1][1] && array[1][1] === array[2][0])
        {
            return (array[0][2]);
        }
    }

    function checkDraw(){
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if (!array[i][j])
                {
                    return (false);
                }
            }
        }
        if (!checkWinner())
        {
            return (true);
        }
    }

    return {
        array, 
        reset, 
        render,
        checkWinner,
        checkDraw
    };
})();

function playerFactory(character){
    const _char = character;
    const playerName = `Player ${_char}`;

    const getChar = () => _char;
    return {
        getChar,
        playerName
    }
}

const displayController = (() => {
    var turn = 'X';
    playerX = playerFactory('X');
    playerO = playerFactory('O');

    const editPlayerName = (event) => {
        let target = event.target;
        let playerName = `player${target.parentElement.getAttribute('data-char')}`;
        if (playerName === "playerX"){
            playerX.playerName = target.textContent;
        }
        console.log(playerX.playerName);
    }

    const playerNames = document.getElementsByClassName("player-name");

    Array.from(playerNames).forEach(player => {
        player.addEventListener('blur', editPlayerName);
    });
    /**
     * The display controller function controls the flow of the game and determines who can play
     * @param {string} turn This takes in the character that just played
     * @returns The character that needs to play next
     */
    const toggleTurn = (currentTurn) => currentTurn === 'X' ? 'O' : 'X';

    const displayWinner = (winner) => {
        modal.classList.add("active");
        overlay.classList.add("overlay-visible")

        console.log(`${winner} is the winner and I should display them in the modal`);
        modal.textContent = `${winner} is the winner`;

    }
    return {
        turn, 
        toggleTurn,
        displayWinner
    };
})();

monitorGameboard = (() => {
    const sections = document.getElementsByClassName("grid-row");
    const audio = new Audio("pencil_check_mark.wav");
    

    function _printCharacter(e){
        var target = e.target;
        var i = Number(target.parentElement.dataset.row);
        var j = Number(target.dataset.col);

        if (gameboard.checkWinner() || gameboard.checkDraw())
        {
            return;
        }

        if (!gameboard.checkWinner() && !gameboard.checkDraw() && gameboard.array[i][j] !== 'X' && gameboard.array[i][j] !== 'O')
        {
            gameboard.array[i][j] = displayController.turn;
            audio.play();
            gameboard.render(gameboard.array);
            displayController.turn = displayController.toggleTurn(displayController.turn);
        }
        let winner = null;
        if (winner = gameboard.checkWinner())
        {
            // displayController.displayWinner(winner);
            displayController.displayWinner(winner);
            const timeout = setTimeout(gameboard.reset, 3000);
            console.log(`Winner is ${winner}`);
        }
        if (gameboard.checkDraw())
        {
            console.log('This is a draw');
            const timeout = setTimeout(gameboard.reset, 3000)
        }
    }

    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            sections[i].children[j].addEventListener('click', _printCharacter);
        }
    }
})();
