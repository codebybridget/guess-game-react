import React, { useState } from 'react';

const Game = () => {
  const [randomNumber, setRandomNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [remainingGuesses, setRemainingGuesses] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGuess = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Please enter a number between 1 and 100.');
      return;
    }

    const newGuesses = [...previousGuesses, userGuess];
    setPreviousGuesses(newGuesses);
    setRemainingGuesses(10 - newGuesses.length);

    if (userGuess === randomNumber) {
      setMessage('🎉 You guessed correctly!');
      setGameOver(true);
    } else if (newGuesses.length === 10) {
      setMessage(`❌ Game Over! The number was ${randomNumber}`);
      setGameOver(true);
    } else {
      setMessage(userGuess < randomNumber ? 'Too low! Try again.' : 'Too high! Try again.');
    }

    setGuess('');
  };

  const startNewGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setPreviousGuesses([]);
    setMessage('');
    setRemainingGuesses(10);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
      {!gameStarted ? (
        <>
          <h1 className="text-2xl font-bold text-purple-700 mb-4">Welcome to the Number Guessing Game!</h1>
          <button
            onClick={startNewGame}
            className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
          >
            Start Game
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-purple-700 mb-4">Guess the Number (1–100)</h1>
          <form onSubmit={handleGuess}>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="border p-2 rounded w-full mb-2"
              placeholder="Enter your guess"
              disabled={gameOver}
            />
            <button
              type="submit"
              className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition"
              disabled={gameOver}
            >
              Submit
            </button>
          </form>

          <div className="mt-4 text-gray-700">
            <p><strong>Previous:</strong> {previousGuesses.join(', ') || '-'}</p>
            <p><strong>Remaining:</strong> {remainingGuesses}</p>
          </div>

          <p className="text-red-600 font-semibold mt-4">{message}</p>

          {gameOver && (
            <button
              onClick={startNewGame}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Start New Game
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
