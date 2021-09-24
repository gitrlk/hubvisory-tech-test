import axios from "../axios";

export const getMovies = async (pageNumber: number) => {
  const fetchMovies = `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`;
  const request = await axios.get(fetchMovies + `&page=${pageNumber}`);

  return request.data.results;
};

export const getMoviePosters = async (movieId: number) => {
  const fetchMoviePosterFilePath = `/movie/${movieId}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const request = await axios.get(fetchMoviePosterFilePath);

  return request.data.posters;
};

export const getCast = async (movieId: number) => {
  const fetchActors = `/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en_US`;
  const request = await axios.get(fetchActors);

  return request.data.cast;
};

export const getActorName = async (actorId: number) => {
  const fetchActorName = `person/${actorId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const request = await axios.get(fetchActorName);

  return request.data.name;
};

export const getActorPhotos = async (actorId: number) => {
  const fetchActorPictures = `person/${actorId}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const request = await axios.get(fetchActorPictures);

  return request.data.profiles;
};
