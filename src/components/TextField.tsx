import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
  value: string;
}

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  onTextChange,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="black"
        autoCapitalize="none"
        value={value}
        secureTextEntry={isSecure}
        onChangeText={text => onTextChange(text)}
        style={styles.textField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
    width: 320,
    height: 50,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
});

export {TextField};
