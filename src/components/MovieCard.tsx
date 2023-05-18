import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BACKGROUND_COLOR, BASE_IMG_URL, BASE_URL} from '../utils/Config';
import moment from 'moment';
import {Genre} from '../redux';

interface MovieCardProps {
  image: string;
  title: string;
  vote: number;
  date: string;
}

const MovieCard: React.FC<MovieCardProps> = ({date, image, title, vote}) => {
  const editedDate = moment(date).format('l');

  /*
  const genreNames: string[] = [];
  const getGenreNames = () => {
    if (genres) {
      genres.map(genre => {
        genreNames.push(genre.name + ' ');
      });
    }
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.text_and_title_container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{uri: BASE_IMG_URL + image}} style={styles.movie_img} />
      </View>
      <View style={styles.vote_and_date_container}>
        <Text style={styles.vote_and_date}>Vote: {vote}</Text>
        <Text style={styles.vote_and_date}>Release: {editedDate}</Text>
      </View>
    </View>
  );
};

/**
 *  <View style={styles.container}>
      <View style={styles.left_container}>
        <Image source={{uri: BASE_IMG_URL + image}} style={styles.movie_img} />
        <View style={styles.vote_date_container}>
          <Text style={styles.vote_and_date}>Vote: {vote}</Text>
          <Text style={styles.vote_and_date}>Date: {date}</Text>
        </View>
      </View>

      <View style={styles.right_container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.overview_and_genres}>{overview}</Text>
        <Text style={styles.overview_and_genres}>
          Genres: High fantasy, Epic
        </Text>
      </View>
    </View>

    const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  left_container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  right_container: {
    flexDirection: 'column',
    flex: 1,
  },
  vote_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  movie_img: {
    width: 200,
    height: 200,
    alignItems: 'center',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
  overview_and_genres: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    marginLeft: 10,
  },
  vote_and_date: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
});

 */

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
  },
  text_and_title_container: {
    alignItems: 'center',
  },
  vote_and_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  movie_img: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 4,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  vote_and_date: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
  },
});

export default MovieCard;
