import {MovieAction} from '../actions';
import {MovieState, Movie, IndvMovie} from '../models';

const initialState: MovieState = {
  movies: [] as Movie[],
  indv_movie: {} as IndvMovie,
  search_results: [] as Movie[],
  fav_movies: [] as Movie[],
};

const MovieReducer = (
  state: MovieState = initialState,
  action: MovieAction,
) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload.results,
      };

    case 'GET_INDV_MOVIE':
      return {
        ...state,
        indv_movie: action.payload,
      };

    case 'GET_SEARCH_RESULTS':
      return {
        ...state,
        search_results: action.payload.results,
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

    default:
      return state;
  }
};

export {MovieReducer};
