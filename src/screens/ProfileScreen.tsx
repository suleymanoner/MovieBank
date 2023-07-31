import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, BTN_COLOR, handleError} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import {onUserLogout} from '../redux/actions/userActions';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/showToast';
import storage from '@react-native-firebase/storage';
import {TextField} from '../components/TextField';
import moment from 'moment';
import {showIndicator} from '../utils/showIndicator';

interface ProfileScreenProps {
  navigation: any;
}

const default_user = require('../assets/images/default_user.png');

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string | null>('');
  const [surname, setSurname] = useState<string | null>('');
  const [photo, setPhoto] = useState<string | null>(default_user);
  const [isDefaultPhoto, setIsDefaultPhoto] = useState<boolean>(true);
  const [isChangePass, setIsChangePass] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassAgain, setNewPassAgain] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const reference = storage().ref(auth().currentUser?.email!);

  const getPhoto = async () => {
    try {
      const url = await storage()
        .ref(auth().currentUser?.email!)
        .getDownloadURL();

      if (url) {
        setPhoto(url);
        setIsDefaultPhoto(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser(auth().currentUser?.email!);
  }, [auth().currentUser]);

  useEffect(() => {
    getPhoto();
  }, [photo]);

  const getuser = async (email: string) => {
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          firestore()
            .collection('users')
            .doc(doc.id)
            .onSnapshot(documentSnapshot => {
              setName(documentSnapshot.data()?.name);
              setSurname(documentSnapshot.data()?.surname);
            });
        });
      });
  };

  const logout = async () => {
    Alert.alert('Logout', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        onPress: () => showToast('Logout cancelled!'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await onUserLogout();
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginStack'}],
          });
        },
      },
    ]);
  };

  const chooseFromLibrary = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async image => {
          await reference.putFile(image.path);
          getPhoto();
          showToast('Profile picture changed!');
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onTapChangePassword = () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      newPassAgain.length === 0
    ) {
      showToast('Please fill all blanks!');
    } else {
      const emailCred = auth.EmailAuthProvider.credential(
        auth().currentUser?.email!,
        oldPassword,
      );

      if (newPassword !== newPassAgain) {
        showToast('Passwords are not matched!');
      } else {
        setIsLoading(true);
        auth()
          .currentUser?.reauthenticateWithCredential(emailCred)
          .then(async () => {
            await auth().currentUser?.updatePassword(newPassword);
            showToast('Password successfully changed!');
            setIsLoading(false);
            setIsChangePass(!isChangePass);
            setOldPassword('');
            setNewPassword('');
            setNewPassAgain('');
          })
          .catch(err => {
            setIsLoading(false);
            const msg = handleError(err.message);
            showToast(msg!);
            setOldPassword('');
            setNewPassword('');
            setNewPassAgain('');
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={chooseFromLibrary}>
          <Image
            source={isDefaultPhoto ? photo : {uri: photo}}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      {isChangePass ? (
        <View style={{flexDirection: 'column'}}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => setIsChangePass(!isChangePass)}
              style={{marginTop: 5}}>
              <Icon name="keyboard-backspace" color="black" size={30} />
            </TouchableOpacity>
            <Text style={styles.change_pass}>Change Password</Text>
            <TextField
              onTextChange={setOldPassword}
              placeholder="old password"
              value={oldPassword}
              isSecure={true}
            />
            <TextField
              onTextChange={setNewPassword}
              placeholder="new password"
              value={newPassword}
              isSecure={true}
            />
            <TextField
              onTextChange={setNewPassAgain}
              placeholder="new password again"
              value={newPassAgain}
              isSecure={true}
            />
            {isLoading ? showIndicator() : <></>}
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              height={50}
              onTap={() => onTapChangePassword()}
              title="Change Password"
              width={310}
              txtColor="black"
              iconName="key"
              iconSize={25}
              iconColor="black"
            />
          </ScrollView>
        </View>
      ) : (
        <>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoText}>{name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Surname:</Text>
              <Text style={styles.infoText}>{surname}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>{auth().currentUser?.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Joined:</Text>
              <Text style={styles.infoText}>
                {moment(auth().currentUser?.metadata.creationTime).format('LL')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              height={50}
              onTap={() => setIsChangePass(!isChangePass)}
              title="Change Password"
              width={310}
              txtColor="black"
              iconName="lock"
              iconSize={25}
              iconColor="black"
            />
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              height={50}
              onTap={logout}
              title="Logout"
              width={310}
              txtColor="black"
              iconName="logout"
              iconSize={25}
              iconColor="black"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'black',
  },
  infoContainer: {
    marginTop: 50,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginRight: 10,
    color: 'black',
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  change_pass: {
    fontSize: 25,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export {ProfileScreen};
