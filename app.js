const gameBoardContainer = document.querySelector('.gameboard__container');

const gameBoard = (() => {
    const boardArray = [];
    const resetBoard = () => {
        for (let i = 0; boardArray.length < 9; i++) {
            boardArray.push('')
            const gameBoardTile = gameBoardContainer.appendChild(document.createElement('div'));
            gameBoardTile.classList.add('gameboard-tile');
            gameBoardTile.dataset.index = i
            gameBoardTile.addEventListener('click', (e) => gameFlow.handlePlay(e.target.dataset.index));

        }
        console.log(boardArray);
    }
    return { boardArray, resetBoard }

})()


gameBoard.resetBoard()

const gameFlow = (() => {
    const handlePlay = (tileClickIndex) => {
        if (gameBoard.boardArray[tileClickIndex] == '') {
            gameBoard.boardArray.splice(tileClickIndex, 1, 'X')
            console.log(gameBoard.boardArray);
            const clickedTile = document.querySelector(`.gameboard-tile[data-index="${tileClickIndex}"]`);
            clickedTile.textContent = gameBoard.boardArray[tileClickIndex];
            checkWinner()
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
        }
    }
    return { handlePlay }
})()

