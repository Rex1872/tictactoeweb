class Board {
    constructor() {
        this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
        this.players = [1, -1]; 
        this.currentPlayer = 0; 
    }

    makeTurn(cell) {
        if (this.state[cell] === 0) {
            this.state[cell] = this.players[this.currentPlayer];
            return true;
        }
        return false;
    }

    checkWin() {
        const s = this.players[this.currentPlayer];
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]               
        ];
        
        for (let pattern of winPatterns) {
            if (this.state[pattern[0]] === s && this.state[pattern[1]] === s && this.state[pattern[2]] === s) {
                return true;
            }
        }
        return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    }

    isFull() {
        return !this.state.includes(0);
    }

    reset() {
        this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

const board = new Board();

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board.state[index] === 1 ? 'X' : board.state[index] === -1 ? 'O' : '';
        cell.classList.remove('x', 'o');
        if (board.state[index] === 1) {
            cell.classList.add('x');
        } else if (board.state[index] === -1) {
            cell.classList.add('o');
        }
    });
}

function handleCellClick(event) {
    const cellIndex = parseInt(event.target.id.split('-')[1]);

    if (board.makeTurn(cellIndex)) {
        updateBoard();

        if (board.checkWin()) {
            messageElement.textContent = `Spieler ${board.currentPlayer === 0 ? 'X' : 'O'} hat gewonnen!`;
            messageElement.style.color = 'green';
            return;
        }

        if (board.isFull()) {
            messageElement.textContent = 'Unentschieden!';
            messageElement.style.color = 'orange';
            return;
        }

        board.switchPlayer();
    }
}

function resetGame() {
    board.reset();
    messageElement.textContent = '';
    messageElement.style.color = 'black';
    updateBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', resetGame);

updateBoard();
