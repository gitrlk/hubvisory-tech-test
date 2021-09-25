import {
  getMovies,
  getMoviePosters,
  getCast,
  getActorPhotos,
  getActorName,
} from "../API/movies";

import { Actor } from "../Models/actor";
import { Movie } from "../Models/movie";

export const getAllMovies = async () => {
  const pageQuantity = 50;
  var allMovies: any = [];

  for (let i = 0; i < pageQuantity; i++) {
    var result = await getMovies(i + 1);

    allMovies = allMovies.concat(result);
  }

  return allMovies.filter((movie: any) => movie.original_language === "en");
};

export const fillMovieBuffer = async (
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  movies: Movie[],
  setBuffer: React.Dispatch<React.SetStateAction<Movie[]>>,
  buffer: Movie[]
) => {
  var bufferTmp = [...buffer];
  var bufferItem: Movie = new Movie();

  if (buffer.length === 0) {
    bufferItem = await getSaneMovie(setMovies, movies);
    bufferTmp.push(bufferItem);
    setBuffer(bufferTmp);
  } else {
    bufferItem = new Movie();
    while (!bufferItem.id) {
      bufferItem = await getSaneMovie(setMovies, movies);
      if (!(await compareMovieActors(buffer[0], bufferItem)))
        bufferItem = new Movie();
    }
    bufferTmp.push(bufferItem);
    setBuffer(bufferTmp);
  }
};

export const getSaneMovie = async (
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  movies: Movie[]
) => {
  var movie: Movie = new Movie();
  var moviesTmp = [...movies];

  while (!movie.id) {
    const randomIndex = Math.floor(Math.random() * moviesTmp.length);

    movie = await getMovieData(moviesTmp[randomIndex]);

    if (!isMovieSane(movie)) movie = new Movie();
    moviesTmp.splice(randomIndex, 1);
  }
  setMovies(moviesTmp);

  return movie;
};

export const isMovieSane = (movie: Movie) => {
  var isSane = true;

  if (!movie.actor.profilePicturePath) isSane = false;

  return isSane;
};

export const getMovieData = async (movie: Movie): Promise<Movie> => {
  let movieData: Movie = new Movie();
  const castObjects = await getCast(movie.id);
  const castIdList = castObjects.map((object: any) => object.id);
  const posterPaths = await getMoviePosters(movie.id);

  movieData.castIdList = castIdList;
  movieData.id = movie.id;
  movieData.title = movie.title;
  movieData.posterPath = !posterPaths.length ? null : posterPaths[0].file_path;
  if (movieData.castIdList.length)
    movieData.actor = await getActorData(movieData.castIdList[0]);
  return movieData;
};

export const getActorData = async (actorId: number) => {
  let actorData: Actor = new Actor();

  actorData.name = await getActorName(actorId);
  const pictures = await getActorPhotos(actorId);
  if (pictures.length) {
    const picturesTmp = pictures.map((object: any) => object.file_path);
    actorData.profilePicturePath = picturesTmp[0];
  } else actorData.profilePicturePath = null;

  return actorData;
};

export const compareMovieActors = async (
  firstMovie: Movie,
  secondMovie: Movie
) => {
  const firstMovieCast = await getCast(firstMovie.id);
  const secondMovieCast = await getCast(secondMovie.id);
  const intersection = firstMovieCast.filter((element: any) =>
    secondMovieCast.includes(element)
  );

  return intersection.length ? false : true;
};
