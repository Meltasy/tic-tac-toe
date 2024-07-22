const createPlayer = (name, symbol) => {
    return {
        name: name,
        symbol: symbol,
    };
};
let playerOne = createPlayer("Melissa", "X");
let playerTwo = createPlayer("Guillaume", "O");

const game = (function () {
    const board = [];
    for (i = 0; i < 9; i++) {
        board.push(0);
    };
    console.log(board);
    return { board };
})();

const playGame = (function () {
    function getCurrentPlayer() {
        let emptyCells = 0;
        game.board.forEach(checkValue);
        function checkValue(item) {
            if (item === 0) {
                emptyCells += 1;
            };
        };
        if (emptyCells % 2 !== 0) {
            currentPlayer = playerOne;
        } else {
            currentPlayer = playerTwo;
        };
    };
    // function startGame() {
    //     getCurrentPlayer();
    // }
    function playRound(cellNum) {
        getCurrentPlayer();
        // let cellNum = Number(window.prompt(`${this.currentPlayer.name}, Which cell number do you want?`, ""));
        if (game.board[cellNum] === 0 && cellNum !== 9) {
            if (this.currentPlayer === playerOne) {
                game.board.splice(cellNum, 1, playerOne.symbol);
            } else if (this.currentPlayer === playerTwo) {
                game.board.splice(cellNum, 1, playerTwo.symbol);
            };
        };
        console.log(cellNum);
        console.log(game.board);
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
            if (game.board[a] === game.board[b] && game.board[b] === game.board[c] && game.board[c] === playerOne.symbol) {
                return alert(`${playerOne.name} is the winner!`);
            } else if (game.board[a] === game.board[b] && game.board[b] === game.board[c] && game.board[c] === playerTwo.symbol) {
                return alert(`${playerTwo.name} is the winner!`);
            };
        };
        if (game.board.forEach(item => item !== 0)) {
            return alert("It's a tie!")
        };
        return 0;
    };
    while (checkWinner() === 0) {
        playRound();
    };
    return { playRound }
})();

const updateDisplay = function() {
    let gameboard = document.querySelector("#gameboard");
    while (gameboard.firstchild) {
        gameboard.removeChild(gameboard.lastChild);
    };
    for (i = 0; i < game.board.length; i++) {
        createGameboard(game.board[i], i);
    };
    function createGameboard(cellValue, cellNum) {
        let cell = document.createElement("button");
        cell.textContent = `${cellValue}`;
        cell.addEventListener("click", (e) => {
            console.log('clicked!');
            playGame.playRound(cellNum);
        });
        gameboard.appendChild(cell);
    }
    // const startBtn = document.querySelector(".start");
    // startBtn.addEventListener("click", (e) => {
    //     // Is this available outsde of this object and inside the object playGame? If not, what can I do?
    //     startGame();
    // });
};

updateDisplay();

// playGame();