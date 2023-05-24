import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  ApplicationState,
  MovieState,
  onGetMovies,
  onGetIndvMovie,
} from '../redux';
import {BACKGROUND_COLOR} from '../utils/Config';
import MovieCardNew from '../components/MovieCardNew';

interface HomeScreenProps {
  movieReducer: MovieState;
  fetchMovies: Function;
  fetchIndvMovie: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  movieReducer,
  fetchMovies,
}) => {
  const {movies} = movieReducer;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  return (
    <View style={styles.container}>
      {movies !== null ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={movies}
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <MovieCardNew
              key={index}
              image={item.poster_path}
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
  fetchMovies: onGetMovies,
})(_HomeScreen);

export {HomeScreen};
