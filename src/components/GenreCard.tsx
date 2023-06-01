import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface GenreCardProps {
  name: string;
}

const GenreCard: React.FC<GenreCardProps> = ({name}) => {
  return (
    <View style={styles.inside_container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inside_container: {
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 4,
    paddingRight: 4,
    margin: 5,
  },
  name: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export {GenreCard};
