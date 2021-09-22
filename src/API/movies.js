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

export const getMoviePoster = async (movieId) => {
  const fetchMoviePosterFilePath = `/movie/${movieId}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const posterBaseUrl = "https://image.tmdb.org/t/p/w300";
  const posterFilePath = await axios.get(fetchMoviePosterFilePath);
  const poster = posterBaseUrl + posterFilePath.data.posters[0].file_path;

  return poster;
};