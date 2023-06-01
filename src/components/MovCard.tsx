import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BASE_IMG_URL} from '../utils/Config';
import moment from 'moment';
import {Genre} from '../redux';
import {GenreCard} from './GenreCard';

interface MovCardNewProps {
  genres: Genre[];
  genre_ids: number[];
  date: string;
  image: string;
  title: string;
  vote: number;
  onPress: () => void;
}

const MovCard: React.FC<MovCardNewProps> = ({
  genres,
  genre_ids,
  image,
  title,
  vote,
  date,
  onPress,
}) => {
  const editedDate = moment(date).format('l');

  const selectedGenres = genres
    .filter(genre => genre_ids.includes(genre.id))
    .map(genre => genre.name);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: BASE_IMG_URL + image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.vote_container}>
          <Text style={styles.voteText}>Vote: </Text>
          <Text
            style={
              vote > 5.5
                ? [
                    styles.voteText,
                    {color: 'green', fontFamily: 'Montserrat-SemiBold'},
                  ]
                : [
                    styles.voteText,
                    {color: 'red', fontFamily: 'Montserrat-SemiBold'},
                  ]
            }>
            {vote.toFixed(1)}
          </Text>
        </View>
        <Text style={styles.date}>Date: {editedDate}</Text>
      </View>
      <View style={styles.genre_container}>
        {selectedGenres.map(genre => {
          return <GenreCard name={genre} key={genre} />;
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
    width: Dimensions.get('screen').width / 1.4,
    height: Dimensions.get('screen').height / 1.3,
  },
  vote_container: {
    flexDirection: 'row',
  },
  image: {
    width: Dimensions.get('screen').width / 1.5,
    height: Dimensions.get('screen').height / 2.2,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  detailsContainer: {
    alignItems: 'center',
    maxWidth: Dimensions.get('screen').width / 1.6,
  },
  title: {
    fontSize: 23,
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Montserrat-Bold',
  },
  date: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  voteText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  genre_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default MovCard;
