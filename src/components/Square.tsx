import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
  children?: React.ReactNode;
}

export function Square({ onClick, isWinning, children }: SquareProps) {
  return (
    <button
      className={`w-20 h-20 flex items-center justify-center rounded-lg transition-all duration-200 
        ${isWinning ? 'bg-green-100 scale-95' : 'bg-gray-50 hover:bg-gray-100'}
        border-2 border-gray-200 hover:border-gray-300`}
      onClick={onClick}
    >
      <div className={`transform transition-transform duration-200 ${isWinning ? 'scale-110' : ''}`}>
        {children}
      </div>
    </button>
  );
}