import React, { useState, useEffect } from "react";
import { getMovies } from "../API/movies";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
    const movieArray = await getMovies()
      setMovies(movieArray);
    }
    fetchMovies();
  }, []);

  return <div>{}</div>;
}

export default Home;
