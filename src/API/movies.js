import axios from "../axios";

const fetchTopRated = `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`

export const getMovies = async () => {
  const numberPages = 5;
  var movieArray = [];
  for (let i = 0; i < numberPages; i++) {
    const request = await axios.get(fetchTopRated + `&page=${i + 1}`);
    movieArray = movieArray.concat(request.data.results);
  }
  return movieArray;
};