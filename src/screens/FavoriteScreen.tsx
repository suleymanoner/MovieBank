import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {ApplicationState, MovieState, onUnFavMovie, Movie} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';
import {showToast} from '../utils/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKGROUND_COLOR } from '../utils/Config';

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
            title={item.original_title}
            unFavMovie={() => unFav(item.id, item.title)}
            onPress={() => goDetail(item.id)}
          />
        )}
      />
    </View>
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
