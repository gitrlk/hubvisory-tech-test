import { Actor } from "../../Models/actor";
import { Movie } from "../../Models/movie";
import { useState, useEffect } from "react";

import "./Question.scss";

type QuestionProps = {
  handleAnswer: (answer: boolean) => void;
  startTimer: () => void;
  fader: boolean;
  actor: Actor;
  movie: Movie;
};

function Question({
  handleAnswer,
  startTimer,
  fader,
  actor,
  movie,
}: QuestionProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
  const [classes, setClasses] = useState("question__wrapper");

  useEffect(() => {
    startTimer();
    setTimeout(() => {
      setClasses("question__wrapper show");
    }, 300);
  }, []);

  useEffect(() => {
    setClasses("question__wrapper");
    setTimeout(() => {
      setClasses("question__wrapper show");
    }, 500);
  }, [fader]);

  return (
    <div>
      {actor && movie ? (
        <div>
          <div className={classes}>
            <div>
              <img
                className="images"
                src={imageBaseUrl + actor.profilePicturePath}
                alt="actor"
              ></img>
              <img
                className="images"
                src={imageBaseUrl + movie.posterPath}
                alt="movie"
              ></img>
            </div>
            <p className="question__text">
              Did {actor.name} play in {movie.title} ?
            </p>
          </div>
          <button
            className="question__button"
            onClick={() => handleAnswer(true)}
          >
            YES
          </button>
          <button
            className="question__button"
            onClick={() => handleAnswer(false)}
          >
            NO
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Question;
