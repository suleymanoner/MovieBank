import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  ApplicationState,
  MovieState,
  onGetNowPlayingMovies,
  onGetTopRatedMovies,
  onGetPopularMovies,
  onGetUpcomingMovies,
  onClearMovieArrays,
} from '../redux';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../utils/Config';
import MovieListCard from '../components/MovieListCard';

interface MovieListScreenProps {
  movieReducer: MovieState;
  getNowPlaying: Function;
  getTopRated: Function;
  getPopular: Function;
  getUpcoming: Function;
  clearAll: Function;
}

const _MovieListScreen: React.FC<MovieListScreenProps> = ({
  navigation,
  movieReducer,
  getNowPlaying,
  getTopRated,
  getPopular,
  getUpcoming,
}) => {
  const {now_playing, top_rated, popular, upcoming} = movieReducer;
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const getMovies = () => {
    getNowPlaying(1);
    getTopRated(1);
    getPopular(1);
    getUpcoming(1);
    setIsFirstLoad(false);
  };

  useEffect(() => {
    if (isFirstLoad) {
      getMovies();
    }
  }, []);

  const go = (where: string) => {
    navigation.navigate('Home', {movie_list_type: where, pg: 1});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <MovieListCard
          title="Now Playing"
          data={now_playing.movies.slice(0, 6)}
          onTap={() => go('now')}
        />
        <MovieListCard
          title="Top Rated"
          data={top_rated.slice(0, 6)}
          onTap={() => go('top')}
        />
        <MovieListCard
          title="Popular"
          data={popular.slice(0, 6)}
          onTap={() => go('pop')}
        />
        <MovieListCard
          title="Upcoming"
          data={upcoming.movies.slice(0, 6)}
          onTap={() => go('up')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text_field_container: {
    height: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    paddingRight: 10,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  textField: {
    width: 320,
    height: 50,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 1,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  animation_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  empty_text: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat-Black',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const MovieListScreen = connect(mapToStateProps, {
  getNowPlaying: onGetNowPlayingMovies,
  getTopRated: onGetTopRatedMovies,
  getPopular: onGetPopularMovies,
  getUpcoming: onGetUpcomingMovies,
  clearAll: onClearMovieArrays,
})(_MovieListScreen);

export {MovieListScreen};
