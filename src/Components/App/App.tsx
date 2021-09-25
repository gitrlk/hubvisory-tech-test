import { useState, useEffect } from "react";
import Questions from "../Question/Questions";
import Welcome from "../Welcome/Welcome";
import { fillMovieBuffer, getAllMovies } from "../../Modules/parsing";
import { Movie } from "../../Models/movie";
import { Actor } from "../../Models/actor";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movie, setMovie] = useState(new Movie());
  const [actor, setActor] = useState(new Actor());
  const [answer, setAnswer] = useState(false);
  const [buffer, setBuffer] = useState([] as Movie[]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [didGameStart, setDidGameStart] = useState(false);
  const [didGameEnd, setDidGameEnd] = useState(false);

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

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (!timer && didGameStart) setDidGameEnd(true);
  }, [timer]);

  const startGame = () => {
    setDidGameStart(true);
    setTimer(60);
  };

  return (
    <div className="App">
      {!didGameStart ? <Welcome startGame={startGame} /> : null}
      {actor.name && movie.title && didGameStart && !didGameEnd ? (
        <div>
          <h1>Your score : {score}</h1>
          <h2>{timer} seconds left</h2>
          <h1>{answer ? "MATCHING" : "NOT MATCHING"}</h1>
          <Questions handleAnswer={handleAnswer} actor={actor} movie={movie} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
