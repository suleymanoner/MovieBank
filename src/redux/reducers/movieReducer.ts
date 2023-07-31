import {MovieAction} from '../actions';
import {MovieState, Movie, IndvMovie, Genre, MovieWithDates} from '../models';

const initialState: MovieState = {
  now_playing: {
    dates: {maximum: '', minimum: ''},
    movies: [] as Movie[],
  } as MovieWithDates,
  top_rated: [] as Movie[],
  popular: [] as Movie[],
  upcoming: {
    dates: {maximum: '', minimum: ''},
    movies: [] as Movie[],
  } as MovieWithDates,
  indv_movie: {} as IndvMovie,
  search_results: [] as Movie[],
  fav_movies: [] as Movie[],
  genres: [] as Genre[],
};

const MovieReducer = (
  state: MovieState = initialState,
  action: MovieAction,
) => {
  switch (action.type) {
    case 'GET_NOW_PLAYING_MOVIES':
      const nowPlayingMovies = action.payload.results.filter(
        movie => !state.now_playing.movies.some(m => m.id === movie.id),
      );
      return {
        ...state,
        now_playing: {
          dates: action.payload.dates,
          movies: [...state.now_playing.movies, ...nowPlayingMovies],
        },
      };

    case 'GET_TOP_RATED_MOVIES':
      const topRatedMovies = action.payload.results.filter(
        movie => !state.top_rated.some(m => m.id === movie.id),
      );
      return {
        ...state,
        top_rated: [...state.top_rated, ...topRatedMovies],
      };

    case 'GET_POPULAR_MOVIES':
      const popularMovies = action.payload.results.filter(
        movie => !state.popular.some(m => m.id === movie.id),
      );
      return {
        ...state,
        popular: [...state.popular, ...popularMovies],
      };

    case 'GET_UPCOMING_MOVIES':
      const upcomingMovies = action.payload.results.filter(
        movie => !state.upcoming.movies.some(m => m.id === movie.id),
      );
      return {
        ...state,
        upcoming: {
          dates: action.payload.dates,
          movies: [...state.upcoming.movies, ...upcomingMovies],
        },
      };

    case 'GET_INDV_MOVIE':
      return {
        ...state,
        indv_movie: action.payload,
      };

    case 'REMOVE_INDV_MOVIE':
      return {
        ...state,
        indv_movie: {},
      };

    case 'GET_SEARCH_RESULTS':
      return {
        ...state,
        search_results: action.payload.results,
      };

    case 'GET_GENRES':
      return {
        ...state,
        genres: action.payload.genres,
      };

    case 'FAV_MOVIE':
      return {
        ...state,
        fav_movies: [...state.fav_movies, action.payload],
      };

    case 'UN_FAV_MOVIE':
      return {
        ...state,
        fav_movies: state.fav_movies.filter(
          movie => movie.id !== action.payload,
        ),
      };

    case 'CLEAR_MOVIE_ARRAYS':
      return {
        ...state,
        now_playing: {dates: null, movies: []},
        top_rated: [],
        popular: [],
        upcoming: {dates: null, movies: []},
      };

    /*
    case 'DELETE_ALL_FAVS':
      return {
        fav_movies: [],
      };*/

    default:
      return state;
  }
};

export {MovieReducer};
