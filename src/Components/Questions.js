import React, { useState, useEffect } from "react";
import {
  getMoviePoster,
  getActorsFromMovie,
  getActorPhoto,
} from "../API/movies";

const getMatchingActorAndMovie = async (setMovie, setActor, movies) => {
  const min = 0;
  const movieIndex = Math.floor(Math.random() * (movies.length - min) + min);
  setMovie(movies[movieIndex].original_title);
  const actors = await getActorsFromMovie(movies[movieIndex].id);
  const actorIndex = Math.floor(Math.random() * (actors.length - min) + min);
  setActor(actors[actorIndex]);
};

const getNonMatchingActorAndMovie = async (setMovie, setActor, movies) => {
  const min = 0;
  const firstMovieIndex = Math.floor(
    Math.random() * (movies.length - min) + min
  );
  var secondMovieIndex = Math.floor(
    Math.random() * (movies.length - min) + min
  );
  if (firstMovieIndex === secondMovieIndex) secondMovieIndex++;
  setMovie(movies[firstMovieIndex].original_title);
  const actors = await getActorsFromMovie(movies[secondMovieIndex].id);
  const actorIndex = Math.floor(Math.random() * (actors.length - min) + min);
  setActor(actors[actorIndex]);
};

function Questions({ movies }) {
  const [movie, setMovie] = useState(null);
  const [actor, setActor] = useState(null);

  useEffect(() => {
    if (movies) {
      const isAnswerYes = Math.random() < 0.5 ? true : false;
      if (isAnswerYes) {
        getMatchingActorAndMovie(setMovie, setActor, movies);
      } else if (!isAnswerYes) {
        getNonMatchingActorAndMovie(setMovie, setActor, movies);
      }
    }
  }, [movies]);

  return (
    <div>
      {actor && movie ? (
        <div>
          <p>
            Did {actor.name} play in {movie} ?
          </p>
          <button>YES</button>
          <button>NO</button>
        </div>
      ) : null}
    </div>
  );
}

export default Questions;
