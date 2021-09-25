import React from "react";

type GameOverProps = {
  playAgain: () => void;
  score: number
};

function GameOver({ playAgain, score }: GameOverProps) {
  return (
    <div>
      <h1>Game over !</h1>
      <p>You scored : {score}. Well done !!!</p>
      <button onClick={playAgain}>Play again ?</button>
    </div>
  );
}

export default GameOver;
