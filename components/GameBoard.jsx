'use client'

import { useState, useEffect, useRef } from 'react';

export default function GameBoard() {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  });

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (event) => {
      const newState = JSON.parse(event.data);
      setGameState(newState);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleMove = (index) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ index }));
    }
  };

  const renderSquare = (i) => (
    <button
      className="w-16 h-16 bg-gray-200 border border-gray-400"
      onClick={() => handleMove(i)}
    >
      {gameState.board[i]}
    </button>
  );

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="mb-4 text-2xl">
        Next Player: {gameState.currentPlayer}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
      </div>
      {gameState.winner && (
        <div className="mt-4 text-2xl text-green-500">
          Winner: {gameState.winner}
        </div>
      )}
    </div>
  );
}
