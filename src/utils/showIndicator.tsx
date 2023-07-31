import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {BACKGROUND_COLOR, BTN_COLOR} from './Config';
import {View} from 'react-native';

export const showIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
      }}>
      <ActivityIndicator size="large" color={BTN_COLOR} />
    </View>
  );
};
