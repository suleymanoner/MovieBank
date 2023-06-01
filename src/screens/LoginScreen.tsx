import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BACKGROUND_COLOR, BTN_COLOR} from '../utils/Config';
import {TextField} from '../components/TextField';
import {ButtonWithIcon} from '../components/ButtonWithIcon';
import {onUserLogin, onUserSignUp} from '../redux/actions/userActions';
import {showToast} from '../utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import auth from '@react-native-firebase/auth';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const user = auth().currentUser;

  useEffect(() => {
    if (user?.email) {
      navigation.navigate('BottomTabStack');
    }
  }, [user]);

  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const login = async () => {
    if (email.length === 0 || password.length === 0) {
      showToast('Please fill all blanks!');
    } else {
      const success = await onUserLogin(email, password);
      if (success) {
        navigation.navigate('BottomTabStack');
        setEmail('');
        setPassword('');
      } else {
        console.log('Login failed!');
      }
    }
  };

  const signUp = async () => {
    if (
      name.length === 0 ||
      surname.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      showToast('Please fill all blanks!');
    } else if (password !== passwordAgain) {
      showToast('Passwords are not matched!');
    } else {
      const success = await onUserSignUp(name, surname, email, password);
      if (success) {
        navigation.navigate('BottomTabStack');
        setName('');
        setSurname('');
        setEmail('');
        setPassword('');
        setPasswordAgain('');
      } else {
        console.log('Signup failed');
      }
    }
  };

  const onTapGoNextScreen = (where: string) => {
    if (where === 'signup') {
      setIsSignUp(true);
    } else if (where === 'login') {
      setIsSignUp(false);
    }
  };

  const logo =
    'https://static.vecteezy.com/system/resources/previews/001/192/065/original/circle-logo-turbine-png.png';

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        {isSignUp ? (
          <Text style={styles.title}>SIGN-UP</Text>
        ) : (
          <>
            <Image
              source={require('../assets/images/moviebank_logo.png')}
              style={styles.logo_image}
            />
            <Text style={styles.title}>LOGIN</Text>
          </>
        )}
      </View>
      <ScrollView>
        <View style={styles.input_container}>
          {isSignUp ? (
            <>
              <TextField
                onTextChange={setName}
                placeholder="name"
                value={name}
                isSecure={false}
              />
              <TextField
                onTextChange={setSurname}
                placeholder="surname"
                value={surname}
                isSecure={false}
              />
            </>
          ) : (
            <></>
          )}
          <TextField
            onTextChange={setEmail}
            placeholder="email"
            value={email}
            isSecure={false}
          />
          <TextField
            onTextChange={setPassword}
            placeholder="password"
            value={password}
            isSecure={true}
          />
          {isSignUp ? (
            <TextField
              onTextChange={setPasswordAgain}
              placeholder="password again"
              value={passwordAgain}
              isSecure={true}
            />
          ) : (
            <></>
          )}

          {isSignUp ? (
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              width={350}
              height={50}
              onTap={() => signUp()}
              title="Sign-up"
              txtColor="black"
              iconName="account-plus"
              iconColor="black"
              iconSize={30}
            />
          ) : (
            <ButtonWithIcon
              btnColor={BTN_COLOR}
              width={350}
              height={50}
              onTap={() => login()}
              title="Login"
              txtColor="black"
              iconName="login"
              iconColor="black"
              iconSize={30}
            />
          )}
        </View>
        {isSignUp ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordPage')}>
            <Text style={styles.other_text}>Reset password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            isSignUp ? onTapGoNextScreen('login') : onTapGoNextScreen('signup');
          }}>
          {isSignUp ? (
            <Text style={styles.other_text}>
              You already have account? Click to login.
            </Text>
          ) : (
            <Text style={styles.other_text}>
              Don't have account yet? Click for sign-up.
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  logo_container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  input_container: {
    flexDirection: 'column',
    marginTop: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginTop: 10,
  },
  other_text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    marginTop: 3,
  },
  logo_image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export {LoginScreen};
