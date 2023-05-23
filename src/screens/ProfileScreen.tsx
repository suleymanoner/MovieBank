import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BACKGROUND_COLOR} from '../utils/Config';

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROFILE SCREEN</Text>
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
  text: {
    fontSize: 30,
    color: 'black',
  },
});

export {ProfileScreen};
