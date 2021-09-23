import React, { useState, useEffect } from "react";
import {
  getMoviePoster,
  getActorsFromMovie,
  getActorPhoto,
} from "../API/movies";

const getMatchingActorAndMovie = async (setMovie, setActor, movies) => {
  const min = 1;
  const movieIndex = Math.floor(Math.random() * (movies.length - min) + min);
  const movie = movies[movieIndex];
  setMovie(movie.original_title);
  const actors = await getActorsFromMovie(movie.id);
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
