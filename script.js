const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset');
const playerTurnDisplay = document.getElementById('player-turn');
let isXTurn = true;
let board = Array(9).fill(null);
let player1Name = localStorage.getItem('player1') || 'Player 1';
let player2Name = localStorage.getItem('player2') || 'Player 2';

// Check for win
const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'T'; // 'T' for tie
};

// Handle click on cell
const handleClick = (e) => {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    if (board[index] || checkWin()) return;
    board[index] = isXTurn ? 'X' : 'O';
    cell.textContent = board[index];
    const winner = checkWin();
    if (winner) {
        setTimeout(() => {
            alert(winner === 'T' ? 'It\'s a tie!' : `${winner === 'X' ? player1Name : player2Name} wins!`);
            resetGame();
        }, 100);
    }
    isXTurn = !isXTurn;
    playerTurnDisplay.textContent = isXTurn ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`;
};

// Reset the game
const resetGame = () => {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isXTurn = true;
    playerTurnDisplay.textContent = `${player1Name}'s turn (X)`;
};

// Initialize
cells.forEach(cell => cell.addEventListener('click', handleClick));
if (resetButton) resetButton.addEventListener('click', resetGame);
