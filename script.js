const createPlayer = (name, symbol) => {
    return {
        name: name,
        symbol: symbol,
        // colour: colour,
    };
};
let playerOne = createPlayer("Melissa", "X");
let playerTwo = createPlayer("Guillaume", "O");

const gameboard = (function () {
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
        gameboard.board.forEach(checkValue);
        function checkValue(item) {
            if (item === 0) {
                emptyCells += 1;
            }
        };
        if (emptyCells % 2 !== 0) {
            currentPlayer = playerOne;
        } else {
            currentPlayer = playerTwo;
        };
    }
    function playRound() {
        getCurrentPlayer();
        let cellNum = Number(window.prompt(`${this.currentPlayer.name}, Which cell number do you want?`, ""));
        if (gameboard.board[cellNum] === 0 && cellNum !== 9) {
            if (this.currentPlayer === playerOne) {
                gameboard.board.splice(cellNum, 1, "X");
            } else if (this.currentPlayer === playerTwo) {
                gameboard.board.splice(cellNum, 1, "O");
            };
            console.log(cellNum);
            console.log(gameboard.board);
        }
        
    }
    console.log(playRound());
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
            if (gameboard.board[a] === gameboard.board[b] && gameboard.board[b] === gameboard.board[c] && gameboard.board[c] === "X") {
                return alert(`${playerOne.name} is the winner!`);
            } else if (gameboard.board[a] === gameboard.board[b] && gameboard.board[b] === gameboard.board[c] && gameboard.board[c] === "O") {
                return alert(`${playerTwo.name} is the winner!`);
            // } else if (gameboard.board.forEach(item => item !== 0)) {
            //     return alert("It's a tie!")
            } else {
                playRound();
            };
            // Why does this not work?
            if (gameboard.board.forEach(item => item !== 0)) {
                return alert("It's a tie!")
            }
        };
    };
    console.log(checkWinner());
})();