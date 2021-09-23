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
  const imagesData = await axios.get(fetchMoviePosterFilePath);
  const posterFilePathUrl =
    posterBaseUrl + imagesData.data.posters[0].file_path;
  return posterFilePathUrl;
};

export const getActorsFromMovie = async (movieId) => {
  const fetchActors = `/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`;
  const request = await axios.get(fetchActors);
  const mainActors = [];
  const actorNumber = 2;
  for (let i = 0; i < actorNumber; i++) {
    mainActors.push(request.data.cast[i]);
  }
  return mainActors;
};

export const getActorPhoto = async (actorId) => {
  const fetchActorPicture = `person/${actorId}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const actorPictureBaseUrl = "https://image.tmdb.org/t/p/w300";
  const actorPictureData = await axios.get(fetchActorPicture);
  const actorPictureFilePathUrl =
    actorPictureBaseUrl + actorPictureData.data.profiles[0].file_path;
  return actorPictureFilePathUrl;
};