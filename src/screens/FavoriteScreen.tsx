import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ApplicationState, MovieState, onUnFavMovie} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';

interface FavoriteScreenProps {
  movieReducer: MovieState;
  unFavMov: Function;
}

const _FavoriteScreen: React.FC<FavoriteScreenProps> = ({
  navigation,
  movieReducer,
  unFavMov,
}) => {
  const {fav_movies} = movieReducer;

  console.log('Fav movies: ' + fav_movies);

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  const unFav = (id: number) => {
    unFavMov(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={fav_movies}
        initialNumToRender={5}
        renderItem={({item}) => (
          <FavoriteCard
            image={item.poster_path}
            title={item.title}
            unFavMovie={() => unFav(item.id)}
            onPress={() => goDetail(item.id)}
          />
        )}
      />
    </View>
  );
};

/**
 *  <MovieCard
          date={fav_movies.length > 0 ? fav_movies[0]?.release_date : ''}
          image={fav_movies.length > 0 ? fav_movies[0]?.backdrop_path : ''}
          onPress={() => {}}
          title={fav_movies.length > 0 ? fav_movies[0]?.title : ''}
          vote={fav_movies.length > 0 ? fav_movies[0]?.vote_average || 0 : 0}
        />
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const FavoriteScreen = connect(mapToStateProps, {
  unFavMov: onUnFavMovie,
})(_FavoriteScreen);

export {FavoriteScreen};
