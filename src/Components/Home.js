import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { getMovies } from "../API/movies";

function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      const movieArray = await getMovies();
      setMovies(movieArray);
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <Questions movies={movies} />
    </div>
  );
}

export default Home;
