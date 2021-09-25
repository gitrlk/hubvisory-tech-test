type SessionInfosProps = {
    highScore: number;
    score: number;
    timer: number;
  };  

function SessionInfos({ score, highScore, timer }: SessionInfosProps) {
  return (
    <div>
      {highScore ? <h1>Your high score : {highScore} </h1> : null}
          <h2>Your score : {score}</h2>
          <h3>{timer} seconds left</h3>
    </div>
  );
}

export default SessionInfos;