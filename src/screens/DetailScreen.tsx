import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {
  ApplicationState,
  MovieState,
  onGetIndvMovie,
  onFavMovie,
} from '../redux';
import {BACKGROUND_COLOR, BASE_IMG_URL, BTN_COLOR} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DetailScreenProps {
  route: any;
  movieReducer: MovieState;
  fetchIndvMovie: Function;
  favMovie: Function;
}

const _DetailScreen: React.FC<DetailScreenProps> = ({
  route,
  navigation,
  movieReducer,
  fetchIndvMovie,
  favMovie,
}) => {
  const {mov_id} = route.params;
  const {indv_movie} = movieReducer;
  const genreNames: string[] = [];
  const spokenLanguages: string[] = [];

  const getGenresAndLanguages = () => {
    if (indv_movie.genres) {
      indv_movie.genres.map(genre => {
        genreNames.push(genre.name);
      });
    }
    if (indv_movie.spoken_languages) {
      indv_movie.spoken_languages.map(lan => {
        spokenLanguages.push(lan.english_name);
      });
    }
  };
  getGenresAndLanguages();

  const goWebsite = async (type: string, link: string) => {
    if (type === 'homepage') {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        console.log('Error occured when opening the URL: ' + link);
      }
    } else if (type === 'imdb') {
      const imdb_url = 'https://www.imdb.com/title/' + link;
      const supported = await Linking.canOpenURL(imdb_url);
      if (supported) {
        await Linking.openURL(imdb_url);
      } else {
        console.log('Error occured when opening the URL: ' + imdb_url);
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchIndvMovie(mov_id);
  }, [mov_id, fetchIndvMovie]);

  const handleFav = async () => {
    await favMovie(indv_movie);
  };

  return (
    <ScrollView style={{backgroundColor: BACKGROUND_COLOR}}>
      <View style={styles.container}>
        <Image
          source={{uri: BASE_IMG_URL + indv_movie.backdrop_path}}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Icon name="keyboard-backspace" color="black" size={30} />
            </TouchableOpacity>
            <View style={styles.title_container}>
              <Text style={styles.title}>{indv_movie.original_title}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleFav()}
              style={styles.favoriteButton}>
              <Icon name="cards-heart" color="black" size={25} />
            </TouchableOpacity>
          </View>
          {indv_movie.tagline ? (
            <Text style={styles.tagline}>[{indv_movie.tagline}]</Text>
          ) : (
            <></>
          )}
          <Text style={styles.overview}>{indv_movie.overview}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Genres:</Text>
            <Text style={styles.infoValue}>{genreNames.join(', ')}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Languages:</Text>
            <Text style={styles.infoValue}>{spokenLanguages.join(', ')}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {indv_movie.homepage ? (
              <ButtonWithIcon
                btnColor={BTN_COLOR}
                height={40}
                onTap={() => goWebsite('homepage', indv_movie.homepage)}
                title="Website"
                width={120}
                txtColor="black"
              />
            ) : (
              <></>
            )}
            {indv_movie.imdb_id ? (
              <ButtonWithIcon
                btnColor={'#f3ce13'}
                height={40}
                onTap={() => goWebsite('imdb', indv_movie.imdb_id)}
                title="IMDb"
                width={120}
                txtColor="black"
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title_container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  backButton: {},
  favoriteButton: {
    marginTop: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    textAlign: 'justify',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  infoValue: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tagline: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const DetailScreen = connect(mapToStateProps, {
  fetchIndvMovie: onGetIndvMovie,
  favMovie: onFavMovie,
})(_DetailScreen);

export {DetailScreen};
