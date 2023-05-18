import {combineReducers} from 'redux';
import {MovieReducer} from './movieReducer';

const rootReducer = combineReducers({
  movieReducer: MovieReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
