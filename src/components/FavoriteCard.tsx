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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FavoriteCardProps {
  image: string;
  title: string;
  onPress: () => void;
  unFavMovie: () => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  image,
  title,
  onPress,
  unFavMovie,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.img_container}>
          <Image
            source={{uri: BASE_IMG_URL + image}}
            style={styles.movie_img}
          />
        </View>
        <View style={styles.title_container}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => unFavMovie()}
          style={styles.un_fav_btn}>
          <Icon name="delete" color="black" size={25} />
        </TouchableOpacity>
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
    flexDirection: 'row',
    margin: 5,
  },
  title_container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  img_container: {
    alignSelf: 'center',
  },
  movie_img: {
    width: 150,
    height: Dimensions.get('window').height / 5,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 23,
    color: 'black',
    textAlign: 'center',
    fontWeight: '800',
  },
  un_fav_btn: {
    marginRight: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default FavoriteCard;
