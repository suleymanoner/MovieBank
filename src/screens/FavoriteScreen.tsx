import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {
  ApplicationState,
  MovieState,
  onUnFavMovie,
  onDeleteAllFavs,
} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';
import {showToast} from '../utils/showToast';
import {BACKGROUND_COLOR} from '../utils/Config';
import LottieView from 'lottie-react-native';
import {FAB} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  const [favoriteMovies, setFavoriteMovies] = useState<any>([]);

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
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            unFavMov(id);
            const newArray = favoriteMovies.filter(
              (item: {id: number}) => item.id !== id,
            );
            setFavoriteMovies(newArray);
            showToast(`${title} unfaved!`);
          },
        },
      ],
    );
  };

  const deleteAllFavs = () => {
    Alert.alert('Unfav all movies', 'Are you sure to unfavorite all movies?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteAllFavMovies();
          setFavoriteMovies([]);
          showToast('All movies unfaved!');
        },
      },
    ]);
  };

  const getFavMoviesFromFirebase = async () => {
    try {
      const snapShot = await firestore().collection('favorites').get();

      const usersFavs = snapShot.docs.filter(doc =>
        doc.id.includes(auth().currentUser?.email),
      );

      const newData: any = [];

      usersFavs.forEach(element => {
        if (
          !favoriteMovies.some(
            (item: {id: any}) => item.id === element.data().id,
          )
        ) {
          newData.push({
            id: element.data().id,
            title: element.data().title,
            image: element.data().image,
          });
        }
      });

      setFavoriteMovies((prevMovies: any) => [...prevMovies, ...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavMoviesFromFirebase();
  }, []);

  return (
    <View style={styles.container}>
      {favoriteMovies.length >= 1 ? (
        <>
          <FlatList
            data={favoriteMovies}
            keyExtractor={item => item.id.toString()}
            initialNumToRender={5}
            renderItem={({item}) => (
              <FavoriteCard
                key={item.id.toString()}
                image={item.image}
                title={item.title}
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
