import auth from '@react-native-firebase/auth';
import {showToast} from '../../utils/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {handleError} from '../../utils/Config';

export const onUserLogin = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    showToast('Successfully logged in!');
    return true;
  } catch (error) {
    const msg = handleError(error.message);
    showToast(msg!);
    return false;
  }
};

export const onUserSignUp = async (
  name: string,
  surname: string,
  email: string,
  password: string,
) => {
  try {
    await AsyncStorage.setItem('user_name', name);
    await AsyncStorage.setItem('user_surname', surname);

    firestore()
      .collection('users')
      .add({
        name: name,
        surname: surname,
        email: email,
      })
      .then(() => {
        console.log('User added!');
      });

    await auth().createUserWithEmailAndPassword(email, password);
    showToast('Successfully signed up!');
    return true;
  } catch (error) {
    const msg = handleError(error.message);
    showToast(msg!);
    return false;
  }
};

export const onUserLogout = async () => {
  try {
    await auth()
      .signOut()
      .then(v => {
        showToast('Successfully logged out!');
      })
      .catch(err => {
        showToast(err.message);
        console.log('Err: ' + err.message);
      });
  } catch (error) {
    const msg = handleError(error.message);
    showToast(msg!);
  }
};
