import React, { useState } from 'react';
import { Board } from './components/Board';
import { Sparkles, RotateCcw } from 'lucide-react';

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const handleClick = (i: number) => {
    if (!gameStarted) setGameStarted(true);
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(false);
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner.winner}`;
    } else if (isDraw) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Tic Tac Toe
        </h1>
        
        <div className="text-lg font-medium text-gray-700 h-8">
          {gameStarted ? getStatus() : 'Click any square to start'}
        </div>

        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={winner?.line || null}
        />

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md
            hover:shadow-lg transition-all duration-200 text-gray-700 font-medium"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;