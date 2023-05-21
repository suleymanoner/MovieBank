import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BASE_IMG_URL} from '../utils/Config';
import moment from 'moment';

interface MovieCardProps {
  image: string;
  title: string;
  vote: number;
  date: string;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  date,
  image,
  title,
  vote,
  onPress,
}) => {
  const editedDate = moment(date).format('l');

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.text_and_title_container}>
          <Text style={styles.title}>{title}</Text>
          <Image
            source={{uri: BASE_IMG_URL + image}}
            style={styles.movie_img}
          />
        </View>
        <View style={styles.vote_and_date_container}>
          <Text style={styles.vote_and_date}>Vote: {vote.toFixed(1)}</Text>
          <Text style={styles.vote_and_date}>Release: {editedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
