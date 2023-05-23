import React, {memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BASE_IMG_URL} from '../utils/Config';
import moment from 'moment';

interface MovieCardNewProps {
  date: string;
  image: string;
  title: string;
  vote: number;
  onPress: () => void;
}

const MovieCardNew: React.FC<MovieCardNewProps> = ({
  date,
  image,
  title,
  vote,
  onPress,
}) => {
  const editedDate = moment(date).format('l');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: BASE_IMG_URL + image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{editedDate}</Text>
          <View style={styles.voteContainer}>
            <Text
              style={
                vote > 5.5
                  ? [styles.voteText, {color: 'green'}]
                  : [styles.voteText, {color: 'red'}]
              }>
              {vote.toFixed(1)}
            </Text>
            <Text style={styles.voteLabel}>/10</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    margin: 3,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  voteLabel: {
    fontSize: 14,
    color: 'gray',
  },
});

export default memo(MovieCardNew);
