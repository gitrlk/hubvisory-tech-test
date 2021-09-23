import React, { useState, useEffect } from "react";
import Questions from './Questions'

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
    const movieArray = await getMovies()
      setMovies(movieArray);
    }
    fetchMovies();
  }, []);

  return <div>
    <Questions />
  </div>;
}

export default Home;
