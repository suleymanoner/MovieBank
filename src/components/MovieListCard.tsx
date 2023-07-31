import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {BASE_IMG_URL} from '../utils/Config';
import Carousel from 'react-native-reanimated-carousel';
import {Movie} from '../redux';

const {width, height} = Dimensions.get('screen');

interface MovieListCardProps {
  title: string;
  data: Movie[];
  onTap: Function;
}

const MovieListCard: React.FC<MovieListCardProps> = ({title, data, onTap}) => {
  return (
    <TouchableOpacity onPress={() => onTap()}>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{flex: 2}}>
          <Carousel
            mode="parallax"
            loop
            width={width / 3}
            height={150}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={2000}
            renderItem={({item}) => (
              <Image
                source={{uri: BASE_IMG_URL + item.poster_path}}
                style={styles.movieImage}
              />
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFFBF',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  },
  movieImage: {
    width: width / 3,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Montserrat-Bold',
  },
});

export default MovieListCard;
