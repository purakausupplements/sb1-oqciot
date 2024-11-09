import React from 'react';
import { Square } from './Square';
import { X, Circle } from 'lucide-react';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

export function Board({ squares, onClick, winningLine }: BoardProps) {
  const renderSquare = (i: number) => {
    const isWinning = winningLine?.includes(i);
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
        key={i}
      >
        {squares[i] === 'X' && <X className="w-10 h-10 text-blue-500" />}
        {squares[i] === 'O' && <Circle className="w-10 h-10 text-rose-500" />}
      </Square>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl shadow-lg">
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </div>
  );
}