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

    const player = playerController();
    const board = gameboard();

    let activeGame = true;

    const playRound = (cellIndex) => {

        if (!activeGame) {
            console.log("Game Over!");
            return;
        }

        const currentPlayer = player.getPlayer();
        const move = board.updateCell(cellIndex, currentPlayer.symbol);

        if (move) {
            if (board.checkWin(currentPlayer.symbol)) {
                activeGame = false;
                console.log(`${currentPlayer.getPlayer().symbol} wins!`);
                return;
            }

            if (board.checkDraw()) {
                activeGame = false;
                console.log("Draw! Nobody wins");
                return;
            }

            player.turnChange();
            console.log(`${player.getPlayer().symbol}'s turn!`);
        } else {
            console.log("Invalid move");
        }
    }

    const startGame = () => {
        board.resetBoard();
        player.resetPlayerIndex();
        activeGame = true;
        console.log(`${player.getPlayer().symbol}'s turn`);
        return;
    }

    return {playRound, startGame, getGameBoard: board.getBoard, getCurrentPlayer: player.getPlayer, isGameActive: () => activeGame};

})();

gameController.startGame();