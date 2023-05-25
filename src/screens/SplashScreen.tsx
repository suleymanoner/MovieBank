import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {BACKGROUND_COLOR} from '../utils/Config';

interface SplashScreenProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({setIsLoading}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/movie4.json')}
        autoPlay
        style={{height: 300, width: 300}}
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default SplashScreen;
