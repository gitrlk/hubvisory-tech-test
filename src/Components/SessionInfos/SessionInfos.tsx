import "./SessionInfos.scss";

import { useState, useEffect } from "react";

type SessionInfosProps = {
  highScore: number | string;
  score: number;
  timer: number;
  rightAnswer: boolean;
};

function SessionInfos({ score, highScore, timer, rightAnswer }: SessionInfosProps) {
  const [classes, setClasses] = useState("score");

  useEffect(() => {
    if (score && rightAnswer) {
      setClasses("score right__answer")
      setTimeout(() => {
        setClasses("score")
      }, 300) 
    } else if (score && !rightAnswer) {
      setClasses("score wrong__answer")
      setTimeout(() => {
        setClasses("score")
      }, 300) 
    }
  }, [score]);

  return (
    <div className="session__infos">
      {highScore ? <h2>Your high score :  {highScore}  </h2> : null}
      <h3>Your score <div className={classes}> {score} </div> </h3>
      <h4>{timer} seconds left</h4>
    </div>
  );
}

export default SessionInfos;