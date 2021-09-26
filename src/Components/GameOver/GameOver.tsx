import './GameOver.scss'

type GameOverProps = {
  playAgain: () => void;
  score: number;
  highScore: number | string;
};

function GameOver({ playAgain, score, highScore }: GameOverProps) {
  return (
    <div>
      <h1>Game over !</h1>
      <p>You scored : {score}. { score ? "Well done !!!" : "You could do better.."}</p>
      <p>Your high score is : {highScore} </p>
      <button className="gameOver__button floating" onClick={playAgain}>Play again ?</button>
    </div>
  );
}

export default GameOver;
