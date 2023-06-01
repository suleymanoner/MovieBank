import axios from 'axios';
import {Dispatch} from 'react';
import {
  API_KEY,
  BASE_URL,
  GENRE_URL,
  POPULAR_URL,
  SEARCH_URL,
} from '../../utils/Config';
import {IndvMovie, Movie, Response, GenreResponse} from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils/showToast';

export interface GetMovies {
  readonly type: 'GET_MOVIES';
  payload: Response;
}

export interface GetIndvMovie {
  readonly type: 'GET_INDV_MOVIE';
  payload: IndvMovie;
}

export interface GetSearchResults {
  readonly type: 'GET_SEARCH_RESULTS';
  payload: Response;
}

export interface GetGenres {
  readonly type: 'GET_GENRES';
  payload: GenreResponse;
}

export interface FavMovie {
  readonly type: 'FAV_MOVIE';
  payload: Movie;
}

export interface UnFavMovie {
  readonly type: 'UN_FAV_MOVIE';
  payload: number;
}

export interface DeleteAllFavs {
  readonly type: 'DELETE_ALL_FAVS';
}

export type MovieAction =
  | GetMovies
  | GetIndvMovie
  | GetSearchResults
  | GetGenres
  | FavMovie
  | UnFavMovie
  | DeleteAllFavs;

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
        .get<IndvMovie>(BASE_URL + `movie/${id}?` + API_KEY)
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

export const onSearchMovie = (query: string) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<Response>(SEARCH_URL + `&query=${query}`)
        .then(response => {
          dispatch({
            type: 'GET_SEARCH_RESULTS',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetGenres = () => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<GenreResponse>(GENRE_URL)
        .then(response => {
          dispatch({
            type: 'GET_GENRES',
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
      const existingFavMovies = await AsyncStorage.getItem('fav_movies');
      const favMovies = existingFavMovies ? JSON.parse(existingFavMovies) : [];

      const isAlreadyFav = favMovies.some(mov => mov.id === movie.id);
      if (isAlreadyFav) {
        showToast(`${movie.original_title} is already faved!`);
        return;
      } else {
        favMovies.push(movie);
        await AsyncStorage.setItem('fav_movies', JSON.stringify(favMovies));

        dispatch({
          type: 'FAV_MOVIE',
          payload: movie,
        });
        showToast(`${movie.original_title} faved!`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const onUnFavMovie = (id: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      const existingFavMovies = await AsyncStorage.getItem('fav_movies');
      const favMovies = existingFavMovies ? JSON.parse(existingFavMovies) : [];
      const index = favMovies.findIndex((movie: Movie) => movie.id === id);

      if (index !== -1) {
        favMovies.splice(index, 1);
        await AsyncStorage.setItem('fav_movies', JSON.stringify(favMovies));
      }

      dispatch({
        type: 'UN_FAV_MOVIE',
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onDeleteAllFavs = () => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      const existingFavMovies = await AsyncStorage.getItem('fav_movies');

      if (existingFavMovies !== null) {
        await AsyncStorage.setItem('fav_movies', JSON.stringify([]));
      }

      dispatch({
        type: 'DELETE_ALL_FAVS',
      });
    } catch (error) {
      console.log(error);
    }
  };
};
