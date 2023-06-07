import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextField} from '../components/TextField';
import {showToast} from '../utils/showToast';
import auth from '@react-native-firebase/auth';
import {BACKGROUND_COLOR, BTN_COLOR, handleError} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');

  const resetPassword = () => {
    if (email !== '') {
      Alert.alert(
        'Reset password?',
        `Are you sure to send reset password to this ${email} email?`,
        [
          {
            text: 'Cancel',
            onPress: () => showToast('Cancelled!'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                  showToast('Password reset email sent!');
                  navigation.navigate('LoginPage');
                })
                .catch(err => {
                  const msg = handleError(err.message);
                  showToast(msg!);
                });
            },
          },
        ],
      );
    } else {
      showToast('Please enter email!');
    }
  };


  return (
    <View style={styles.container}>
      <View
        style={{justifyContent: 'flex-start', marginLeft: 10, marginTop: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" color="black" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.second_container}>
        <Text style={styles.title}>FORGOT PASSWORD</Text>
        <View style={styles.formContainer}>
          <TextField
            onTextChange={setEmail}
            placeholder="email"
            value={email}
            isSecure={false}
          />
          <ButtonWithIcon
            btnColor={BTN_COLOR}
            width={350}
            height={50}
            onTap={resetPassword}
            title="Sent reset link"
            txtColor="black"
            iconName="email"
            iconColor="black"
            iconSize={30}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  second_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {ForgotPasswordScreen};
