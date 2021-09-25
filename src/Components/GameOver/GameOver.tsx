import React from "react";

type GameOverProps = {
  playAgain: () => void;
  score: number;
  highScore: number;
};

function GameOver({ playAgain, score, highScore }: GameOverProps) {
  return (
    <div>
      <h1>Game over !</h1>
      <p>You scored : {score}. Well done !!!</p>
      <p>Your high score is : {highScore} </p>
      <button onClick={playAgain}>Play again ?</button>
    </div>
  );
}

export default GameOver;
