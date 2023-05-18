import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface FavoriteScreenProps {}

const FavoriteScreen: React.FC<FavoriteScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAVORITE SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
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

export {FavoriteScreen};
