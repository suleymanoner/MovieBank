import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from './HomeScreen';
import {FavoriteScreen} from './FavoriteScreen';
import {ProfileScreen} from './ProfileScreen';
import {DetailScreen} from './DetailScreen';
import {SearchScreen} from './SearchScreen';

const HomeStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Detail" component={DetailScreen} />
  </HomeStack.Navigator>
);

const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
    <FavoriteStack.Screen name="Favorites" component={FavoriteScreen} />
  </FavoriteStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown: false}}>
    <SearchStack.Screen name="Search" component={SearchScreen} />
  </SearchStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="HomeStack">
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="FavoriteStack"
      component={FavoriteStackScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarColor: 'red',
        tabBarIcon: ({color}) => (
          <Icon name="cards-heart" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchStack"
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: 'red',
        tabBarIcon: ({color}) => (
          <Icon name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: 'red',
        tabBarIcon: ({color}) => (
          <Icon name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
