const gameboard = (() => {

    const board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => [...board];
    const updateCell = (index, player) => {
        if (index > 8 || index < 0) {
            console.log('Invalid Move.')
            return false;
        } else {
            if (board[index] !== '') {
                console.log('This cell is not empty.')
                return false;
            } else {
                board[index] = player;
                return true;
            }
        }
    };

    const resetBoard = () => board.fill('');

    const checkWin = (player) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
        ]

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => board.every(cell => cell !== '');
    
    return {getBoard, updateCell, resetBoard, checkWin, checkDraw};
})();

const playerController = (() => {

    const players = [
        {name: 'Player 1', symbol: 'X'},
        {name: 'Player 2', symbol: 'O'}
    ];
    
    let currentPlayerIndex = 0;

    const turnChange = () => {
        currentPlayerIndex = 1 - currentPlayerIndex;
    };

    const resetPlayerIndex = () => currentPlayerIndex = 0;

    const getPlayer = () => players[currentPlayerIndex];

    return {turnChange, resetPlayerIndex, getPlayer};
})();

const gameController = (() => {
    
})();

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

        const checkDraw = function() {
            if (!checkWin()) {
                for (const row of board) {
                    for (const cell of row) {
                        if (cell === '') {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }
    
        return {getBoard, updateCell, checkWin, checkDraw};
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
                const draw = game.checkDraw();
                if (draw) {
                    console.log(`It's a draw!`);
                    return true;
                } else {
                    player.turnChange();
                    return false;
                }
            }
        } else {
            console.log(`Invalid move. Please try again`);
            return false;
        }
    }
    
    return {makeMove, getBoard: game.getBoard};
}

const gameInstance = ticTac();

