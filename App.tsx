import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import MainTabScreen from './src/screens/MainTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Splash from './src/screens/SplashScreen';

const App = () => {
  const RootStack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="BottomTabStack" component={MainTabScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

//     <Splash setIsLoading={setIsLoading} />

export default App;
