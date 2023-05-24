import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ApplicationState, MovieState, onSearchMovie} from '../redux';
import {connect} from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR} from '../utils/Config';

interface FavoriteScreenProps {
  movieReducer: MovieState;
  searchMovie: Function;
}

const _SearchScreen: React.FC<FavoriteScreenProps> = ({
  navigation,
  movieReducer,
  searchMovie,
}) => {
  const {search_results} = movieReducer;

  const [isEditing, setIsEditing] = useState(false);
  const [txt, setTxt] = useState('');

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  useEffect(() => {
    searchMovie(txt);
  }, [txt]);

  return (
    <View style={styles.container}>
      <View style={styles.text_field_container}>
        <TextInput
          placeholder="Search movie.."
          autoCapitalize="none"
          onTouchStart={() => setIsEditing(true)}
          onChangeText={text => setTxt(text)}
          value={txt}
          style={styles.textField}
        />
        <TouchableOpacity onPress={() => setTxt('')} style={styles.clearIcon}>
          <Icon name="close-thick" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {isEditing ? (
        <FlatList
          data={search_results}
          initialNumToRender={5}
          renderItem={({item}) => (
            <FavoriteCard
              image={item.poster_path}
              title={item.original_title}
              search={true}
              onPress={() => goDetail(item.id)}
            />
          )}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text_field_container: {
    height: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    paddingRight: 10,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  textField: {
    width: 320,
    height: 50,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 1,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const SearchScreen = connect(mapToStateProps, {
  searchMovie: onSearchMovie,
})(_SearchScreen);

export {SearchScreen};
