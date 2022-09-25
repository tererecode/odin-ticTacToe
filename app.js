const gameBoardContainer = document.querySelector('.gameboard__container');
const currentPlayerDisplay = document.querySelector('.currentplayer-value')
const gameBtn = document.querySelector('.reset__btn')
const winnerDisplay = document.querySelector('.winnerplayer')

// Player Factory
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const displayController = (() => {
    const playerTurn = (currentPlayer) => {
        currentPlayerDisplay.textContent = currentPlayer
    }
    return { playerTurn }
})();

// GameBoard is a module that stores the plays, draws the board and resets it.
const gameBoard = (() => {
    // Stores all plays for game
    const boardArray = [];
    // Removes all tiles from DOM and empties boardArray
    const clearBoard = () => {
        while (gameBoardContainer.firstChild) {
            gameBoardContainer.removeChild(gameBoardContainer.lastChild)
        }
        boardArray.splice(0)
        winnerDisplay.textContent = ''
    }
    // calls clearBoard and redraws DOM fill boardArray with empty strings
    const resetBoard = () => {
        clearBoard();
        for (let i = 0; boardArray.length < 9; i++) {
            boardArray.push('')
            const gameBoardTile = gameBoardContainer.appendChild(document.createElement('div'));
            gameBoardTile.classList.add('gameboard-tile');
            gameBoardTile.dataset.index = i
            gameBoardTile.addEventListener('click', (e) => gameFlow.handlePlay(e.target.dataset.index));

        }
        console.log(boardArray);
        currentPlayerDisplay.textContent = player1.getName()
    }
    return { boardArray, resetBoard }

})()


// gameBoard.resetBoard()
// Game flow modules handle click events on the dom tiles check for winner
const gameFlow = (() => {
    let currentPlayer = player1;

    const handlePlay = (tileClickIndex) => {
        if (gameBoard.boardArray[tileClickIndex] == '') {
            gameBoard.boardArray.splice(tileClickIndex, 1, currentPlayer.getSymbol())
            console.log(gameBoard.boardArray);
            const clickedTile = document.querySelector(`.gameboard-tile[data-index="${tileClickIndex}"]`);
            clickedTile.textContent = gameBoard.boardArray[tileClickIndex];
            //checkWinner()
            if (!checkWinner()) {
                console.log('change player')
                endTurn()
            }
        } else {
            console.log('Whoops that place is taken!');
        }
    }
    const checkWinner = () => {
        let ar = gameBoard.boardArray;
        if (
            ((ar[0] === ar[1] && ar[0] != '') && (ar[1] === ar[2]) && ar[1] != '')
            ||
            ((ar[3] === ar[4] && ar[3] != '') && (ar[4] === ar[5] && ar[4] != ''))
            ||
            ((ar[6] === ar[7] && ar[6] != '') && (ar[7] === ar[8] && ar[7] != ''))
            ||
            ((ar[0] === ar[4] && ar[0] != '') && (ar[4] === ar[8] && ar[4] != ''))
            ||
            ((ar[2] === ar[4] && ar[2] != '') && (ar[4] === ar[6] && ar[4] != ''))
            ||
            ((ar[0] === ar[3] && ar[0] != '') && (ar[3] === ar[6]) && ar[3] != '')
            ||
            ((ar[1] === ar[4] && ar[1] != '') && (ar[4] === ar[7]) && ar[4] != '')
            ||
            ((ar[2] === ar[5] && ar[2] != '') && (ar[5] === ar[8]) && ar[5] != '')
        ) {
            console.log('WINNER WINNER');
            winnerDisplay.textContent = `Congratulation ${currentPlayer.getName()} you are the WINNER!`
            return true
        }
    }
    const endTurn = () => {
        console.log(`Current player is ${currentPlayer.getName()}`);
        if (currentPlayer == player1) {
            currentPlayer = player2
            console.log(`Now its ${currentPlayer.getName()}s turn`);

        } else {
            currentPlayer = player1;
            console.log(`Now its ${currentPlayer.getName()}s turn`);
        }
        displayController.playerTurn(currentPlayer.getName())
    }
    return { handlePlay }
})()

gameBtn.addEventListener('click', gameBoard.resetBoard)



