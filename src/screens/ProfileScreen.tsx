import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, BTN_COLOR} from '../utils/Config';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onUserLogout} from '../redux/actions/userActions';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {showToast} from '../utils/showToast';

interface ProfileScreenProps {
  navigation: any;
}

const profile =
  'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string | null>('');
  const [surname, setSurname] = useState<string | null>('');
  const [photo, setPhoto] = useState<string | null>(profile);

  // we can store this photo url, name, and surname in the firebase db.
  const getPhoto = async () => {
    const profile_pic = await AsyncStorage.getItem('profile_pic');
    if (profile_pic) {
      setPhoto(profile_pic);
    }
  };

  useEffect(() => {
    getPhoto();
    getuser(auth().currentUser?.email!);
  }, []);

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
          navigation.navigate('LoginStack');
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
        .then(image => {
          console.log(image);
          setPhoto(image.path);
          AsyncStorage.setItem('profile_pic', image.path);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={chooseFromLibrary}>
          <Image source={{uri: photo}} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
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
      </View>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          btnColor={BTN_COLOR}
          height={40}
          onTap={() => {}}
          title="Change Password"
          width={220}
          txtColor="black"
          iconName="key"
          iconSize={25}
          iconColor="black"
        />
        <ButtonWithIcon
          btnColor={BTN_COLOR}
          height={40}
          onTap={logout}
          title="Logout"
          width={220}
          txtColor="black"
          iconName="logout"
          iconSize={25}
          iconColor="black"
        />
      </View>
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
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'black',
  },
  infoContainer: {
    marginTop: 30,
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
});

export {ProfileScreen};
