import axios from 'axios';
import {Dispatch} from 'react';
import {
  API_KEY,
  BASE_URL,
  GENRE_URL,
  NOW_PLAYING_URL,
  POPULAR_URL,
  SEARCH_URL,
  TOP_RATED,
  UPCOMING,
} from '../../utils/Config';
import {
  IndvMovie,
  Movie,
  Response,
  GenreResponse,
  ResponseWithDates,
} from '../models';
import {showToast} from '../../utils/showToast';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface GetNowPlayingMovies {
  readonly type: 'GET_NOW_PLAYING_MOVIES';
  payload: ResponseWithDates;
}

export interface GetTopRatedMovies {
  readonly type: 'GET_TOP_RATED_MOVIES';
  payload: Response;
}

export interface GetPopularMovies {
  readonly type: 'GET_POPULAR_MOVIES';
  payload: Response;
}

export interface GetUpcomingMovies {
  readonly type: 'GET_UPCOMING_MOVIES';
  payload: ResponseWithDates;
}

export interface GetIndvMovie {
  readonly type: 'GET_INDV_MOVIE';
  payload: IndvMovie;
}

export interface RemoveIndvMovie {
  readonly type: 'REMOVE_INDV_MOVIE';
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

export const onClearMovieArrays = () => ({
  type: 'CLEAR_MOVIE_ARRAYS',
});

export type MovieAction =
  | GetNowPlayingMovies
  | GetTopRatedMovies
  | GetPopularMovies
  | GetUpcomingMovies
  | GetIndvMovie
  | RemoveIndvMovie
  | GetSearchResults
  | GetGenres
  | FavMovie
  | UnFavMovie
  | DeleteAllFavs;

export const onGetNowPlayingMovies = (page: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      console.log('url : ' + NOW_PLAYING_URL + `&page=${page}`);
      await axios
        .get<ResponseWithDates>(NOW_PLAYING_URL + `&page=${page}`)
        .then(response => {
          dispatch({
            type: 'GET_NOW_PLAYING_MOVIES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetTopRatedMovies = (page: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      console.log(TOP_RATED + `&page=${page}`);
      await axios
        .get<Response>(TOP_RATED + `&page=${page}`)
        .then(response => {
          dispatch({
            type: 'GET_TOP_RATED_MOVIES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetPopularMovies = (page: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<Response>(POPULAR_URL + `&page=${page}`)
        .then(response => {
          dispatch({
            type: 'GET_POPULAR_MOVIES',
            payload: response.data,
          });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const onGetUpcomingMovies = (page: number) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await axios
        .get<ResponseWithDates>(UPCOMING + `&page=${page}`)
        .then(response => {
          dispatch({
            type: 'GET_UPCOMING_MOVIES',
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

export const onRemoveIndvMovie = () => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({
        type: 'REMOVE_INDV_MOVIE',
      });
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
      const isAlreadyFaved = firestore()
        .collection('favorites')
        .doc(auth().currentUser?.email! + movie.id)
        .get();

      if ((await isAlreadyFaved).exists) {
        showToast(`${movie.original_title} already faved!`);
      } else {
        firestore()
          .collection('favorites')
          .doc(auth().currentUser?.email! + movie.id)
          .set({
            id: movie.id,
            title: movie.original_title,
            image: movie.poster_path,
          })
          .then(() => {
            console.log('Movie faved!');
          });

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
      firestore()
        .collection('favorites')
        .doc(auth().currentUser?.email! + id)
        .delete();

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
      const snapshot = firestore()
        .collection('favorites')
        .where(firestore.FieldPath.documentId(), '>', auth().currentUser?.email)
        .get();

      const batch = firestore().batch();

      (await snapshot).forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      dispatch({
        type: 'DELETE_ALL_FAVS',
      });
    } catch (error) {
      console.log(error);
    }
  };
};
