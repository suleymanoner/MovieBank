import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {BACKGROUND_COLOR, BTN_COLOR} from '../utils/Config';
import Carousel from 'react-native-reanimated-carousel';
import {display_movies} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('screen');

const FirstScreen = ({navigation}) => {
  const user = auth().currentUser;

  useEffect(() => {
    if (user?.email) {
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabStack'}],
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Welcome to the</Text>
      <Text style={styles.headlineSecond}>MovieBank</Text>
      <Carousel
        mode="parallax"
        loop
        width={width / 1.2}
        height={height / 1.5}
        autoPlay={true}
        data={display_movies}
        scrollAnimationDuration={2000}
        renderItem={({item}) => (
          <Image source={item.image} style={styles.movieImage} />
        )}
      />
      <ButtonWithIcon
        btnColor={BTN_COLOR}
        height={50}
        width={200}
        onTap={() => navigation.navigate('LoginPage')}
        title={'Login Here'}
        txtColor="black"
        iconColor="black"
        iconName="arrow-right-bold"
        iconSize={25}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  movieImage: {
    width: width / 1.2,
    height: height / 1.5,
    resizeMode: 'cover',
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Montserrat-Light',
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },
  headlineSecond: {
    fontSize: 40,
    fontFamily: 'Montserrat-ExtraBold',
    color: BTN_COLOR,
    alignItems: 'center',
    textAlign: 'center',
  },
});
export {FirstScreen};
