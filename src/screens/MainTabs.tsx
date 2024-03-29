import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from './HomeScreen';
import {FavoriteScreen} from './FavoriteScreen';
import {ProfileScreen} from './ProfileScreen';
import {DetailScreen} from './DetailScreen';
import {SearchScreen} from './SearchScreen';
import {MovieListScreen} from './MovieListScreen';

const HomeStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="MovieList" component={MovieListScreen} />
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Detail" component={DetailScreen} />
  </HomeStack.Navigator>
);

const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
    <FavoriteStack.Screen name="Favorites" component={FavoriteScreen} />
    <FavoriteStack.Screen name="Detail" component={DetailScreen} />
  </FavoriteStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown: false}}>
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="Detail" component={DetailScreen} />
  </SearchStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    activeColor="black"
    backBehavior="history"
    shifting={true}
    compact={true}
    labeled={false}
    barStyle={{backgroundColor: '#FF8C8C', elevation: 0}}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="SearchStack"
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color}) => (
          <Icon name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="FavoriteStack"
      component={FavoriteStackScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({color}) => (
          <Icon name="cards-heart" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <Icon name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
