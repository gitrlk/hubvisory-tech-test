import { Actor } from "../Models/actor";
import { Movie } from "../Models/movie";

type QuestionsProps = {
  handleAnswer: (answer: boolean) => void;
  actor: Actor;
  movie: Movie;
};

function Questions(
  { handleAnswer, actor, movie }: QuestionsProps
) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div>
      {actor && movie ? (
        <div>
          <div style={{ display: "flex" }}>
            <img src={imageBaseUrl + movie.posterPath} alt="movie"></img>
            <img
              src={imageBaseUrl + actor.profilePicturePath}
              alt="actor"
            ></img>
          </div>
          <p>
            Did {actor.name} play in {movie.title} ?
          </p>
          <button onClick={() => handleAnswer(true)}>YES</button>
          <button onClick={() => handleAnswer(false)}>NO</button>
        </div>
      ) : null}
    </div>
  );
}

export default Questions;
