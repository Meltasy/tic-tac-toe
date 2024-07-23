const choosePlayers = document.querySelector("#players")
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const createPlayer = (name, symbol) => {
    return {
        name: name,
        symbol: symbol,
    };
};

let players = []

choosePlayers.addEventListener("click", (e) => {
    console.log("clicked");
    dialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
    console.log("clicked");
    dialog.close();
    form.reset();
});

addBtn.addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();
    let pOneName = document.querySelector("#pOneName").value;
    let pTwoName = document.querySelector("#pTwoName").value;
    dialog.close();
    form.reset();
    players = [
        createPlayer(pOneName, "X"),
        createPlayer(pTwoName, "O"),
    ]
});

const gameboard = (function () {
    const board = [];
    for (i = 0; i < 9; i++) {
        board.push(" ")
    };
    function resetBoard() {
        for (i = 0; i < board.length; i++) {
            board[i] = " "
        };
    };
    function getCurrentPlayer() {
        let emptyCells = 0;
        board.forEach((item) => {
            if (item === " ") { 
                emptyCells += 1
            };
        });
        if (emptyCells % 2 !== 0) {
            return 0
        } else {
            return 1
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
    function checkWinner () {
        for(let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] === board[b] && board[b] === board[c] && board[c] === players[0].symbol) {
                return 0
            } else if (board[a] === board[b] && board[b] === board[c] && board[c] === players[1].symbol) {
                return 1
            };
        };
        let fullCells = 0;
        board.forEach(function(item) {
            if (item !== " ") {
                fullCells += 1
            };
        });
        if (fullCells === 9) {
            return 2
        };
    };
    return { board, resetBoard, getCurrentPlayer, checkWinner };
})();

const playGame = (function () {
    function newGame() {
        const startBtn = document.querySelector("#start");
        startBtn.addEventListener("click", (e) => {
            gameboard.resetBoard();
            if (players.length === 0) {
                dialog.showModal();
            }
            updateDisplay();
        });
    }
    newGame();
    function playRound(cellNum) {
        if (gameboard.board[cellNum] === " ") {
            gameboard.board.splice(cellNum, 1, players[gameboard.getCurrentPlayer()].symbol);
            gameboard.checkWinner();
        };
        console.log(gameboard.board);
    };
    return { playRound }
})();

const updateDisplay = function() {
    const game = document.querySelector("#gameboard");
    while (game.firstChild) {
        game.removeChild(game.lastChild)
    };
    for (i = 0; i < gameboard.board.length; i++) {
        createGameboard(gameboard.board[i], i)
    };
    function createGameboard(cellValue, cellNum) {
        const cell = document.createElement("button");
        const results = document.querySelector("#results");
        cell.disabled = false;
        results.textContent = "Who's going to win?";
        cell.textContent = `${cellValue}`;
        cell.addEventListener("click", (e) => {
            playGame.playRound(cellNum);
            updateDisplay();
        });
        game.appendChild(cell);
        if (players.length === 2) {
            if (gameboard.checkWinner() === 0) {
                results.textContent = `${players[0].name} is the winner!`;
                cell.disabled = true;
            } else if (gameboard.checkWinner() === 1) {
                results.textContent = `${players[1].name} is the winner!`;
                cell.disabled = true;
            } else if (gameboard.checkWinner() === 2) {
                results.textContent = "It's a tie!";
                cell.disabled = true;
            };
        }
    }
};