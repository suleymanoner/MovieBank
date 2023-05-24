import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {MAIN_COLOR} from '../utils/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  onTap: Function;
  width: number;
  height: number;
  btnColor: string;
  txtColor?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  title: string;
  disable?: boolean;
}

const ButtonWithIcon: React.FC<ButtonProps> = ({
  onTap,
  width,
  height,
  iconName,
  iconColor,
  iconSize,
  title,
  btnColor,
  txtColor,
  disable,
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[styles.button, {width, height, backgroundColor: btnColor}]}
      onPress={() => onTap()}>
      <View style={styles.inside_container}>
        <Text style={[styles.button_text, {color: txtColor}]}>{title}</Text>
        <Icon
          size={iconSize}
          color={iconColor}
          style={styles.icon}
          name={iconName!}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inside_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 50,
    margin: 10,
    paddingRight: 10,
    paddingLeft: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  button_text: {
    fontSize: 17,
    color: MAIN_COLOR,
    fontFamily: 'Montserrat-SemiBold',
  },
  icon: {
    marginLeft: 10,
  },
});

export {ButtonWithIcon};
