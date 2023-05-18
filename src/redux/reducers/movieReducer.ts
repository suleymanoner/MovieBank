import {MovieAction} from '../actions';
import {MovieState, Movie, IndvMovie} from '../models';

const initialState: MovieState = {
  movies: [] as Movie[],
  indv_movie: {} as IndvMovie,
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

    default:
      return state;
  }
};

export {MovieReducer};
