import axios from "../axios";

export const getMovies = async () => {
  const fetchMovies = `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`;
  const numberPages = 5;
  var movieArray = [];
  for (let i = 0; i < numberPages; i++) {
    const request = await axios.get(fetchMovies + `&page=${i + 1}`);
    movieArray = movieArray.concat(request.data.results);
  }
  return movieArray.filter((movie) => movie.original_language === "en");
};

};