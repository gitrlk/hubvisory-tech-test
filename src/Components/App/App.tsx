import { useState, useEffect } from "react";
import Questions from "../Question/Questions";
import GameOver from "../GameOver/GameOver";
import Welcome from "../Welcome/Welcome";
import SessionInfos from "../SessionInfos/SessionInfos";
import { fillMovieBuffer, getAllMovies } from "../../Modules/parsing";
import { Movie } from "../../Models/movie";
import { Actor } from "../../Models/actor";
import "./App.css";

const highScoreFromLocalStorage = localStorage.getItem('highScore') || 0

function App() {
  const [movies, setMovies] = useState([] as Movie[]);
  const [movie, setMovie] = useState(new Movie());
  const [actor, setActor] = useState(new Actor());
  const [answer, setAnswer] = useState(false);
  const [buffer, setBuffer] = useState([] as Movie[]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(highScoreFromLocalStorage);
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
};

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (!timer && didGameStart) {
      setDidGameEnd(true);
      if (!highScore)
      {
        setHighScore(score);
        localStorage.setItem('highScore', JSON.stringify(score))
      } 
      else if (highScore) {
        if (score > highScore){
          setHighScore(score)
          localStorage.setItem('highScore', JSON.stringify(score))
        } else {
          setHighScore(highScore);
        }
      }
    }
  }, [timer]);

  const startGame = () => {
    setDidGameStart(true);
    setTimer(60);
  };

  const playAgain = () => {
    var bufferTmp = [...buffer];
    bufferTmp.splice(0, 2);
    setBuffer(bufferTmp);
    setMovie(new Movie());
    setActor(new Actor());
    setAnswer(false);
    setDidGameEnd(false);
    setScore(0);
    setTimer(60);
  };

  return (
    <div className="App">
      {!didGameStart ? <Welcome startGame={startGame} /> : null}
      {actor.name && movie.title && didGameStart && !didGameEnd ? (
        <div>
          <SessionInfos score={score} highScore={highScore} timer={timer} />
          <Question handleAnswer={handleAnswer} actor={actor} movie={movie} />
        </div>
      ) : null}
      {didGameEnd ? (
        <GameOver playAgain={playAgain} score={score} highScore={highScore} />
      ) : null}
    </div>
  );
}

export default App;
