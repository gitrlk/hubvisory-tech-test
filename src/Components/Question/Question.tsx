import { Actor } from "../../Models/actor";
import { Movie } from "../../Models/movie";
import { useState, useEffect, useRef } from "react";

import "./Question.scss";

import { useAnimation, motion } from "framer-motion";

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

  const animControls = useAnimation();
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef}>
      {actor && movie ? (
        <div>
          <div className={classes}>
            <motion.div
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={(event, info) => {
                if (info.offset.x > 300) handleAnswer(false);
                else if (info.offset.x < -300) handleAnswer(true);
              }}
            >
              <img
                className="images actor"
                src={imageBaseUrl + actor.profilePicturePath}
                alt="actor"
                draggable="false"
              ></img>
              <img
                className="images movie"
                src={imageBaseUrl + movie.posterPath}
                alt="movie"
                draggable="false"
              ></img>
            </motion.div>
            <p className="question__text">
              Did {actor.name} play in {movie.title} ?
            </p>
          </div>
          <button
            className="question__button yes"
            onClick={() => handleAnswer(true)}
          >
            YES
          </button>
          <button
            className="question__button no"
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
