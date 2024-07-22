const createPlayer = (name, symbol) => {
    return {
        name: name,
        symbol: symbol,
    };
};

const players = [
    createPlayer("Melissa", "X"),
    createPlayer("Guillaume", "O"),
]

const gameboard = (function () {
    const board = [];
    for (i = 0; i < 9; i++) {
        board.push(0);
    };
    function resetBoard() {
        for (i = 0; i < board.length; i++) {
            board[i] = 0;
        };
    };
    function getCurrentPlayer() {
        let emptyCells = 0;
        board.forEach(function(item) {
            if (item === 0) {
                emptyCells += 1;
            };
        });
        if (emptyCells % 2 !== 0) {
            return 0;
        } else {
            return 1;
        };
    };
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    const checkWinner = () => {
        for(let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] === board[b] && board[b] === board[c] && board[c] === players[0].symbol) {
                return 0;
            } else if (board[a] === board[b] && board[b] === board[c] && board[c] === players[1].symbol) {
                return 1;
            };
        };
        checkTie();
    };
    const checkTie = () => {
        let fullCells = 0;
        board.forEach(function(item) {
            if (item !== 0) {
                fullCells += 1;
            };
        });
        if (fullCells === 9) {
            return 2;
        };
    };
    return { board, resetBoard, getCurrentPlayer, checkWinner, checkTie };
})();

const playGame = (function () {
    function startGame() {
        const startBtn = document.querySelector(".start");
        startBtn.addEventListener("click", (e) => {
            gameboard.resetBoard();
            updateDisplay();
        });
    }
    startGame();
    function playRound(cellNum) {
        if (gameboard.board[cellNum] === 0) {
            gameboard.board.splice(cellNum, 1, players[gameboard.getCurrentPlayer()].symbol);
            gameboard.checkWinner();
        };
        console.log(gameboard.board);
    };
    return { playRound }
})();

const updateDisplay = function() {
    let game = document.querySelector("#gameboard");
    while (game.firstChild) {
        game.removeChild(game.lastChild);
    };
    for (i = 0; i < gameboard.board.length; i++) {
        createGameboard(gameboard.board[i], i);
    };
    function createGameboard(cellValue, cellNum) {
        let cell = document.createElement("button");
        cell.textContent = `${cellValue}`;
        cell.addEventListener("click", (e) => {
            playGame.playRound(cellNum);
            updateDisplay();
            if (gameboard.checkWinner() === 0) {
                alert(`${players[0].name} is the winner!`);
                gameboard.resetBoard();
                updateDisplay();
            } else if (gameboard.checkWinner() === 1) {
                alert(`${players[1].name} is the winner!`);
                gameboard.resetBoard();
                updateDisplay();
            } else if (gameboard.checkTie() === 2) {
                alert("It's a tie!");
                gameboard.resetBoard();
                updateDisplay();
            };
        });
        game.appendChild(cell);
    }
};