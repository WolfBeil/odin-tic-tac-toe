function gameboard() {

    const cols = 3;
    const rows = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push('');
        }
    }


    const getBoard = function() {
        return board;
    }

    const updateCell = function(row, col, playerSymbol) {
        if ((row > 2 || row < 0) || (col > 2 || col < 0)) {
            console.log('Invalid move');
            return false;
        } else {
            if (board[row][col] === '') {
                board[row][col] = playerSymbol;
                console.log('Valid move');
                return true;
            } else {
                console.log('This cell is not empty');
                return false;
            }
        }
    }

    return {getBoard, updateCell};
}

function playerController() {

    let currentPlayer = 'X';

    const turnChange = function() {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
    }

    const getCurrentPlayer = () => currentPlayer;

    return {turnChange, getCurrentPlayer};
}

