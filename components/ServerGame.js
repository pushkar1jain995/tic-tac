// components/ServerGame.js
const initialState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  };
  
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
  
  class Game {
    constructor() {
      this.state = { ...initialState };
    }
  
    getState() {
      return this.state;
    }
  
    handleMove(index) {
      if (this.state.winner || this.state.board[index]) return;
  
      const newBoard = this.state.board.slice();
      newBoard[index] = this.state.currentPlayer;
      const winner = calculateWinner(newBoard);
  
      this.state = {
        board: newBoard,
        currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
      };
  
      return this.state;
    }
  }
  
  module.exports = Game;
  