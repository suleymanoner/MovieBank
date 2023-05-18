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

interface HomeScreenProps {
  movieReducer: MovieState;
  fetchMovies: Function;
  fetchIndvMovie: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({
  movieReducer,
  fetchMovies,
  fetchIndvMovie,
}) => {
  const {movies, indv_movie} = movieReducer;
  const [page, setPage] = useState<number>(1);

  //console.log(movies[0]);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    fetchIndvMovie(315162);
  }, []);

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

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={movies}
        initialNumToRender={5}
        renderItem={({item}) => (
          <MovieCard
            image={item.poster_path}
            title={item.title}
            vote={item.vote_average}
            date={item.release_date}
          />
        )}
        onScroll={handleScroll}
        onEndReachedThreshold={0.1}
        onEndReached={() => setShowButton(true)}
        contentContainerStyle={styles.listContent}
      />
      {showButton && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ButtonWithIcon
            btnColor="gray"
            height={50}
            onTap={decreasePage}
            title="Back"
            width={100}
          />
          <ButtonWithIcon
            btnColor="gray"
            height={50}
            onTap={increasePage}
            title="Next"
            width={100}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  text: {
    fontSize: 30,
    color: 'black',
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
