import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { fillMovieBuffer, getAllMovies } from "../Modules/parsing";
import { Movie } from "../Models/movie";
import { Actor } from "../Models/actor";

function Home() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movie, setMovie] = useState(new Movie());
  const [actor, setActor] = useState(new Actor());
  const [answer, setAnswer] = useState(false);
  const [buffer, setBuffer] = useState([] as Movie[]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const result = await getAllMovies();
      const allMovies: Movie[] = result.map(
        (movie: any) => new Movie(movie.id, movie.title)
      );
      setMovies(allMovies);
      if (allMovies.length)
        await fillMovieBuffer(setMovies, allMovies, setBuffer, buffer);
    };
    fetchAllMovies();
  }, []);

  // console.log(buffer);

  useEffect(() => {
    if (buffer.length && buffer.length !== 2) {
      fillMovieBuffer(setMovies, movies, setBuffer, buffer);
    }
    if (buffer.length === 2) {
      const isAnswerYes = Math.random() < 0.5 ? true : false;
      setAnswer(isAnswerYes);
      if (isAnswerYes) {
        setActor(buffer[0].actor);
        setMovie(buffer[0]);
      } else if (!isAnswerYes) {
        setActor(buffer[0].actor);
        setMovie(buffer[1]);
      }
    }
  }, [buffer]);

  return (
    <div>
      {actor.name && movie.title ? (
        <Questions answer={answer} actor={actor} movie={movie} />
      ) : null}
    </div>
  );
}

export default Home;
