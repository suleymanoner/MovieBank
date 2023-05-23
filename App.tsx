import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import MainTabScreen from './src/screens/MainTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/SplashScreen';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  const RootStack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="BottomTabStack" component={MainTabScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
};

//     <Splash setIsLoading={setIsLoading} />

export default App;
