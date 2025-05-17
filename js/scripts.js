function ticTac() {

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
    
        const checkWin = function() {
            for (const row of board) {
                if (row[0] === row[1] && row[0] === row[2] && row[0] !== '') {
                    console.log(`Player ${row[0]} wins!`);
                    return true;
                }
            }
            for (let i = 0; i < board.length; i++) {
                if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
                    console.log(`Player ${board[0][i]} wins!`);
                    return true;
                }
            }
            if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
                console.log(`Player ${board[0][0]} wins!`);
                return true;
            }
            if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] !== '') {
                console.log(`Player ${board[2][0]} wins!`);
                return true;
            }
        }
    
        return {getBoard, updateCell, checkWin};
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

    const game = gameboard();
    const player = playerController();

    function makeMove(row, col) {
        const playerSymbol = player.getCurrentPlayer();
        const move = game.updateCell(row, col, playerSymbol);
        if (move) {
            if (game.checkWin()) {
                return true;
            } else {
                player.turnChange();
                return false;
            }
        } else {
            console.log(`Invalid move. Please try again`);
            return false;
        }
    }

    let gameOver = false;



    return {makeMove, getBoard: game.getBoard};

}

const gameInstance = ticTac();

