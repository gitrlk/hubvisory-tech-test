import "./SessionInfos.scss";

import { useState, useEffect } from "react";

type SessionInfosProps = {
  highScore: number | string;
  score: number;
  timer: number;
};

function SessionInfos({ score, highScore, timer }: SessionInfosProps) {
  const [classes, setClasses] = useState("score");

  useEffect(() => {
    if (score) {
      setClasses("score big")
      setTimeout(() => {
        setClasses("score")
      }, 300) 
    }
  }, [score]);

  return (
    <div>
      {highScore ? <h2>Your high score :  {highScore}  </h2> : null}
      <h3>Your score <div className={classes}> {score} </div> </h3>
      <h4>{timer} seconds left</h4>
    </div>
  );
}

export default SessionInfos;