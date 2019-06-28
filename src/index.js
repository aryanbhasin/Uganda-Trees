import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import FlashMessage from 'react-native-flash-message';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome';

import ExploreScreen from './navigators/ExploreScreen';
import FavoritesScreen from './navigators/FavoritesScreen';
import TagScreen from './navigators/TagScreen';
import MapScreen from './navigators/MapScreen'

import {store, persistor} from './store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import storage from 'redux-persist/lib/storage';

// uses react-native-screens for optimizing memory usage of react-navigation
useScreens();

const RootTabNav = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FAIcon name="binoculars" size={16} color={tintColor} />
        )
      }
    },
    Tag: {
      screen: TagScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FAIcon name="map-marker" size={20} color={tintColor} />
        )
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FA5Icon name="map" size={16} color={tintColor} />
        )
      }
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FAIcon name="heart" size={17} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Explore',
    tabBarOptions: {
      activeTintColor: 'rgb(220, 58, 28)',
      labelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      showLabel: true,
    }
  }
);

//   
const AppContainer = createAppContainer(RootTabNav);

class EntryPoint extends Component {
  
  
  render() {
    
    // uncomment below line to clear redux-persist storage anytime you change state and stuff
    storage.removeItem('persist:root')
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
      
    );
  }
}

export default EntryPoint;