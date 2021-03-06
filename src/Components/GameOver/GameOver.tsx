import { useState, useEffect } from "react";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { UilFacebook } from "@iconscout/react-unicons";
import { UilTwitter } from "@iconscout/react-unicons";

import "./GameOver.scss";


type GameOverProps = {
  playAgain: () => void;
  score: number;
  highScore: number | string;
};

function GameOver({ playAgain, score, highScore }: GameOverProps) {
  const [classes, setClasses] = useState("gameOver__wrapper");

  useEffect(() => {
    setTimeout(() => {
      setClasses("gameOver__wrapper show")
    }, 300);
  }, []);


  const shareUrl = "https://rlk-actor-quiz.web.app/";
  const message = `I just scored ${score} on rlk's actor quiz app ! come and try to beat me ! :)`;


  return (
    <div className={classes}>
      <h1>Game over !</h1>
      <h2>
        You scored : {score}.{score ? "Well done !!!" : "You could do better.."}
      </h2>
      <h3>Your high score is : {highScore} </h3>

      <div>
        <p>share your score on social medias !</p>
        <div className="socials__container">
          <FacebookShareButton
            url={shareUrl}
            quote={message}
            className="socials"
          >
            <UilFacebook size="25" color="#FFF"></UilFacebook>
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={message}
            className="socials"
          >
            <UilTwitter size="25" color="#FFF"></UilTwitter>
          </TwitterShareButton>
        </div>
      </div>
      <button className="gameOver__button floating" onClick={playAgain}>
        Play again ?
      </button>
    </div>
  );
}

export default GameOver;
