import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { useScreens } from 'react-native-screens';
import FlashMessage from 'react-native-flash-message';

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
      screen: ExploreScreen
    },
    Tag: {
      screen: TagScreen
    },
    Map: {
      screen: MapScreen
    },
    Favorites: {
      screen: FavoritesScreen
    }
  },
  {
    initialRouteName: 'Explore'
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