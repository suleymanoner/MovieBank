import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
import {BASE_IMG_URL, BTN_COLOR} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieCard from '../components/MovieCard';

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
  const {indv_movie, fav_movies} = movieReducer;

  const genreNames: string[] = [];
  const getGenreNames = () => {
    if (indv_movie.genres) {
      indv_movie.genres.map(genre => {
        genreNames.push(genre.name + ' ');
      });
    }
  };
  getGenreNames();

  const spokenLanguages: string[] = [];
  const getSpokenLanguages = () => {
    if (indv_movie.spoken_languages) {
      indv_movie.spoken_languages.map(lan => {
        spokenLanguages.push(lan.english_name + ' ');
      });
    }
  };
  getSpokenLanguages();

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
  }, [mov_id]);

  const handleFav = (id: number) => {
    const isAlreadyFav = fav_movies.some(mov => mov.id === id);

    if (isAlreadyFav) {
      console.log('Already faved!'); // show toast here
    } else {
      favMovie(indv_movie);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <TouchableOpacity onPress={goBack} style={styles.back_btn}>
            <Icon name="keyboard-backspace" color="black" size={30} />
          </TouchableOpacity>
          <View style={styles.title_container}>
            <Text style={styles.title}>{indv_movie.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleFav(indv_movie.id)}
            style={styles.fav_btn}>
            <Icon name="cards-heart" color="black" size={25} />
          </TouchableOpacity>
        </View>

        {indv_movie.tagline ? (
          <Text style={styles.tagline}>[{indv_movie.tagline}]</Text>
        ) : (
          <></>
        )}
        <Image
          source={{uri: BASE_IMG_URL + indv_movie.backdrop_path}}
          style={styles.movie_img}
        />
        <Text style={styles.overview}>{indv_movie.overview}</Text>
        <View style={styles.genre_container}>
          <Text style={[styles.genre, {fontWeight: '800'}]}>-Genres-</Text>
          <Text style={styles.genre}>{genreNames}</Text>
        </View>
        <View style={styles.genre_container}>
          <Text style={[styles.genre, {fontWeight: '800'}]}>-Languages-</Text>
          <Text style={styles.genre}>{spokenLanguages}</Text>
        </View>
        <View style={styles.btn_container}>
          {indv_movie.homepage ? (
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              height={40}
              width={100}
              title="Website"
              onTap={() => goWebsite('homepage', indv_movie.homepage)}
              txtColor="black"
            />
          ) : (
            <></>
          )}
          {indv_movie.imdb_id ? (
            <ButtonWithIcon
              btnColor="#f3ce13"
              height={40}
              width={100}
              title="IMDb"
              onTap={() => goWebsite('imdb', indv_movie.imdb_id)}
              txtColor="black"
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  top_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genre_container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  btn_container: {
    flexDirection: 'row',
  },
  title_container: {
    flex: 1,
    alignItems: 'center',
  },
  back_btn: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 10,
  },
  fav_btn: {
    marginTop: 10,
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
  movie_img: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 10,
  },
  overview: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'justify',
  },
  genre: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
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
