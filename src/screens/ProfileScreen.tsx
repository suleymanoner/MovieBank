import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, BTN_COLOR, TEXT_COLOR} from '../utils/Config';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onUserLogout} from '../redux/actions/userActions';
import auth from '@react-native-firebase/auth';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string | null>('');
  const [surname, setSurname] = useState<string | null>('');

  const getUserNameAndSurname = async () => {
    const user_name = await AsyncStorage.getItem('user_name');
    setName(user_name);
    const user_surname = await AsyncStorage.getItem('user_surname');
    setSurname(user_surname);
  };

  useEffect(() => {
    getUserNameAndSurname();
  }, []);

  const goResetPassword = () => {};

  const logout = async () => {
    await onUserLogout();
    navigation.navigate('LoginStack');
  };

  const profile =
    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <View style={styles.container}>
      <View style={styles.profile_pic_container}>
        <Image source={{uri: profile}} style={styles.top_container_image} />
      </View>
      <View style={styles.name_container}>
        <Text
          style={[styles.user_name_text, {fontFamily: 'Montserrat-SemiBold'}]}>
          Name:
        </Text>
        <Text style={styles.user_name_text}>{name}</Text>
      </View>
      <View style={styles.surname_container}>
        <Text
          style={[styles.user_name_text, {fontFamily: 'Montserrat-SemiBold'}]}>
          Surname:
        </Text>
        <Text style={styles.user_name_text}>{surname}</Text>
      </View>
      <View style={styles.surname_container}>
        <Text
          style={[styles.user_name_text, {fontFamily: 'Montserrat-SemiBold'}]}>
          Email:
        </Text>
        <Text style={styles.user_name_text}>{auth().currentUser?.email}</Text>
      </View>
      <View style={styles.btn_container}>
        <ButtonWithIcon
          btnColor={BTN_COLOR}
          height={40}
          onTap={() => goResetPassword()}
          title="Reset Password"
          width={200}
          txtColor="black"
        />
        <ButtonWithIcon
          btnColor={BTN_COLOR}
          height={40}
          onTap={() => logout()}
          title="Logout"
          width={120}
          txtColor="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  name_container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  profile_pic_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  surname_container: {
    flexDirection: 'row',
  },
  btn_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  user_name_text: {
    fontSize: 18,
    marginTop: 10,
    color: 'black',
    marginLeft: 15,
    fontFamily: 'Montserrat-Regular',
  },
  top_container_image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export {ProfileScreen};
