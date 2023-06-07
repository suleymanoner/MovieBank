import {MovieAction} from '../actions';
import {MovieState, Movie, IndvMovie, Genre} from '../models';

const initialState: MovieState = {
  movies: [] as Movie[],
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
    case 'GET_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
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
