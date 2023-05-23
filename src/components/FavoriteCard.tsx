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
  unFavMovie?: () => void;
  search?: boolean;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  image,
  title,
  onPress,
  unFavMovie,
  search,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: BASE_IMG_URL + image}} style={styles.image} />
        <View style={styles.content}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {search ? (
            <></>
          ) : (
            <TouchableOpacity onPress={unFavMovie} style={styles.deleteButton}>
              <Icon name="close-thick" color="black" size={25} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A4A4A4',
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    padding: 5,
  },
});

export default FavoriteCard;
