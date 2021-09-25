import { useState, useEffect } from "react";
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
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    if (movies.length && buffer.length !== 4) {
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

  const handleAnswer = (userAnswerValue: boolean) => {
    if (answer === userAnswerValue) setScore(score + 10);
    var bufferTmp = [...buffer];
    bufferTmp.splice(0, 2);
    setBuffer(bufferTmp);
    setActor(new Actor());
    setMovie(new Movie());
  };

  return (
    <div>
      <h1>Your score : {score}</h1>
      <h1>{answer ? "MATCHING" : "NOT MATCHING"}</h1>
      {actor.name && movie.title ? (
        <Questions handleAnswer={handleAnswer} actor={actor} movie={movie} />
      ) : null}
    </div>
  );
}

export default Home;
