import axios from 'axios';
import {Dispatch} from 'react';
import {API_KEY, BASE_URL, POPULAR_URL} from '../../utils/Config';
import {IndvMovie, Movie, Response} from '../models';

export interface GetMovies {
  readonly type: 'GET_MOVIES';
  payload: Response;
}

export interface GetIndvMovie {
  readonly type: 'GET_INDV_MOVIE';
  payload: IndvMovie;
}

export interface FavMovie {
  readonly type: 'FAV_MOVIE';
  payload: Movie;
}

export interface UnFavMovie {
  readonly type: 'UN_FAV_MOVIE';
  payload: number;
}

export type MovieAction = GetMovies | GetIndvMovie | FavMovie | UnFavMovie;

export const onGetMovies = (page: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<Response>(POPULAR_URL + `&page=${page}`)
        .then(response => {
          dispatch({
            type: 'GET_MOVIES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetIndvMovie = (id: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<IndvMovie>(BASE_URL + `${id}?` + API_KEY)
        .then(response => {
          dispatch({
            type: 'GET_INDV_MOVIE',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onFavMovie = (movie: Movie) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: 'FAV_MOVIE',
        payload: movie,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onUnFavMovie = (id: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: 'UN_FAV_MOVIE',
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};