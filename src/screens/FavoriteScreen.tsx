import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {ApplicationState, MovieState, onUnFavMovie, Movie} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';
import {showToast} from '../utils/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteScreenProps {
  movieReducer: MovieState;
  unFavMov: Function;
}

const _FavoriteScreen: React.FC<FavoriteScreenProps> = ({
  navigation,
  movieReducer,
  unFavMov,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  const unFav = (id: number, title: string) => {
    Alert.alert(
      `Unfav the ${title}?`,
      'Are you sure to unfavorite this movie?',
      [
        {
          text: 'Cancel',
          onPress: () => showToast('Unfav cancelled!'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            unFavMov(id);
            showToast(`${title} unfaved!`);
          },
        },
      ],
    );
  };

  const getFavoriteMovies = async () => {
    try {
      const existingFavMovies = await AsyncStorage.getItem('fav_movies');
      if (existingFavMovies) {
        const parsedFavMovies = JSON.parse(existingFavMovies);
        setFavoriteMovies(parsedFavMovies);
      } else {
        await AsyncStorage.setItem('fav_movies', JSON.stringify([]));
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    getFavoriteMovies();
  }, [favoriteMovies]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMovies}
        initialNumToRender={5}
        renderItem={({item}) => (
          <FavoriteCard
            image={item.poster_path}
            title={item.title}
            unFavMovie={() => unFav(item.id, item.title)}
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
