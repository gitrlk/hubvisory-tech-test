type SessionInfosProps = {
    highScore: number | string;
    score: number;
    timer: number;
  };  

function SessionInfos({ score, highScore, timer }: SessionInfosProps) {
  return (
    <div>
      {highScore ? <h2>Your high score : {highScore} </h2> : null}
          <h3>Your score : {score}</h3>
          <h4>{timer} seconds left</h4>
    </div>
  );
}

export default SessionInfos;