import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {
  ApplicationState,
  MovieState,
  onUnFavMovie,
  Movie,
  onDeleteAllFavs,
} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';
import {showToast} from '../utils/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKGROUND_COLOR} from '../utils/Config';
import LottieView from 'lottie-react-native';
import {FAB} from 'react-native-paper';

interface FavoriteScreenProps {
  movieReducer: MovieState;
  unFavMov: Function;
  deleteAllFavMovies: Function;
}

const _FavoriteScreen: React.FC<FavoriteScreenProps> = ({
  navigation,
  movieReducer,
  unFavMov,
  deleteAllFavMovies,
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

  const deleteAllFavs = () => {
    Alert.alert('Unfav all movies', 'Are you sure to unfavorite all movies?', [
      {
        text: 'Cancel',
        onPress: () => showToast('Unfav cancelled!'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteAllFavMovies();
          showToast('All movies unfaved!');
        },
      },
    ]);
  };

  useEffect(() => {
    getFavoriteMovies();
  }, [favoriteMovies]);

  return (
    <View style={styles.container}>
      {favoriteMovies.length >= 1 ? (
        <>
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
          <FAB
            style={styles.fab}
            icon="delete"
            color="black"
            onPress={() => deleteAllFavs()}
          />
        </>
      ) : (
        <>
          <View style={styles.animation_container}>
            <LottieView
              source={require('../assets/animations/ghost.json')}
              autoPlay
              style={{height: 150, width: 150}}
              loop={true}
              resizeMode="cover"
            />
            <Text style={styles.text}>No Fav yet</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
  },
  animation_container: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  text: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat-Black',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF8C8C',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const FavoriteScreen = connect(mapToStateProps, {
  unFavMov: onUnFavMovie,
  deleteAllFavMovies: onDeleteAllFavs,
})(_FavoriteScreen);

export {FavoriteScreen};
