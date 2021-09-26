import { Actor } from "../../Models/actor";
import { Movie } from "../../Models/movie";

import "./Question.scss";

type QuestionProps = {
  handleAnswer: (answer: boolean) => void;
  actor: Actor;
  movie: Movie;
};

function Question({ handleAnswer, actor, movie }: QuestionProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div>
      {actor && movie ? (
        <div>
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
