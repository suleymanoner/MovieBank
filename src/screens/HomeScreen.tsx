import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
  ApplicationState,
  MovieState,
  onGetMovies,
  onGetIndvMovie,
} from '../redux';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import {BACKGROUND_COLOR, BTN_COLOR} from '../utils/Config';
import {showToast} from '../utils/showToast';
import MovieCardNew from '../components/MovieCardNew';

interface HomeScreenProps {
  movieReducer: MovieState;
  fetchMovies: Function;
  fetchIndvMovie: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  movieReducer,
  fetchMovies,
  fetchIndvMovie,
}) => {
  const {movies, indv_movie} = movieReducer;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const flatListRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    setShowButton(
      contentOffset.y + layoutMeasurement.height >=
        contentSize.height - paddingToBottom,
    );
  };

  const decreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      // show toast 'you are already in the first page!'
      showToast('You are already in first page!');
    }
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 0, animated: true});
    }
  };

  const increasePage = () => {
    setPage(page + 1);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 0, animated: true});
    }
  };

  const goDetail = (id: number) => {
    navigation.navigate('Detail', {mov_id: id});
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={movies}
        initialNumToRender={5}
        renderItem={({item}) => (
          <MovieCardNew
            image={item.poster_path}
            title={item.original_title}
            vote={item.vote_average}
            date={item.release_date}
            onPress={() => goDetail(item.id)}
          />
        )}
      />
      {showButton && (
        <View style={styles.btn_container}>
          <ButtonWithIcon
            btnColor={BTN_COLOR}
            height={40}
            onTap={decreasePage}
            title="Back"
            width={100}
            txtColor="black"
          />
          <ButtonWithIcon
            btnColor={BTN_COLOR}
            height={40}
            onTap={increasePage}
            title="Next"
            width={100}
            txtColor="black"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  listContent: {
    flexGrow: 1,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  movieReducer: state.movieReducer,
});

const HomeScreen = connect(mapToStateProps, {
  fetchMovies: onGetMovies,
  fetchIndvMovie: onGetIndvMovie,
})(_HomeScreen);

export {HomeScreen};
