import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import MainTabScreen from './src/screens/MainTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/SplashScreen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {LoginScreen} from './src/screens/LoginScreen';
import {ForgotPasswordScreen} from './src/screens/ForgotPasswordScreen';
import {FirstScreen} from './src/screens/FirstScreen';

export type RootStackParams = {
  LoginStack: any;
  BottomTabStack: any;
};

const LoginStack = createNativeStackNavigator();

const LoginStackScreens = () => (
  <LoginStack.Navigator screenOptions={{headerShown: false}}>
    <LoginStack.Screen name="FirstPage" component={FirstScreen} />
    <LoginStack.Screen name="LoginPage" component={LoginScreen} />
    <LoginStack.Screen
      name="ForgotPasswordPage"
      component={ForgotPasswordScreen}
    />
  </LoginStack.Navigator>
);

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParams>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <RootSiblingParent>
      <Provider store={store}>
        {isLoading ? (
          <Splash setIsLoading={setIsLoading} />
        ) : (
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName="LoginStack"
              screenOptions={{headerShown: false}}>
              <RootStack.Screen
                name="LoginStack"
                component={LoginStackScreens}
              />
              <RootStack.Screen
                name="BottomTabStack"
                component={MainTabScreen}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        )}
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
