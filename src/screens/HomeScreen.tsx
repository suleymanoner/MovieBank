import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  ApplicationState,
  MovieState,
  onGetNowPlayingMovies,
  onGetTopRatedMovies,
  onGetPopularMovies,
  onGetUpcomingMovies,
  onGetGenres,
  Movie,
  MovieWithDates,
} from '../redux';
import {BACKGROUND_COLOR} from '../utils/Config';
import MovCard from '../components/MovCard';

interface HomeScreenProps {
  route: any;
  movieReducer: MovieState;
  fetchNowPlayingMovies: Function;
  fetchTopRatedMovies: Function;
  fetchPopularMovies: Function;
  fetchUpcomingMovies: Function;
  fetchGenres: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({
  route,
  navigation,
  movieReducer,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchGenres,
}) => {
  const {movie_list_type, pg} = route.params;
  const {now_playing, top_rated, popular, upcoming, genres} = movieReducer;
  const [page, setPage] = useState<number>(pg);
  const [movies, setMovies] = useState<Movie[] | MovieWithDates>([]);

  useEffect(() => {
    fetchGenres();
  });

  useEffect(() => {
    if (movie_list_type === 'now') {
      if (page !== 1) {
        fetchNowPlayingMovies(page);
      }
      setMovies(now_playing.movies);
    } else if (movie_list_type === 'top') {
      if (page !== 1) {
        fetchTopRatedMovies(page);
      }
      setMovies(top_rated);
    } else if (movie_list_type === 'pop') {
      if (page !== 1) {
        fetchPopularMovies(page);
      }
      setMovies(popular);
    } else if (movie_list_type === 'up') {
      if (page !== 1) {
        fetchUpcomingMovies(page);
      }
      setMovies(upcoming.movies);
    } else {
      if (page !== 1) {
        fetchNowPlayingMovies(page);
      }
      setMovies(now_playing.movies);
    }
    console.log('PAGE: ' + page);
    console.log('TOTAL MOV: ' + now_playing.movies.length);
  }, [page]);

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  return (
    <View style={styles.container}>
      {movies !== null ? (
        <FlatList
          keyExtractor={(item, index) =>
            item.id.toString() + '_' + index.toString()
          }
          data={movies}
          horizontal
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <MovCard
              key={index}
              image={item.poster_path}
              genre_ids={item.genre_ids}
              genres={genres}
              title={item.original_title}
              vote={item.vote_average}
              date={item.release_date}
              onPress={() => goDetail(item.id)}
            />
          )}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  listContent: {
    flexGrow: 1,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const HomeScreen = connect(mapToStateProps, {
  fetchNowPlayingMovies: onGetNowPlayingMovies,
  fetchTopRatedMovies: onGetTopRatedMovies,
  fetchPopularMovies: onGetPopularMovies,
  fetchUpcomingMovies: onGetUpcomingMovies,
  fetchGenres: onGetGenres,
})(_HomeScreen);

export {HomeScreen};
