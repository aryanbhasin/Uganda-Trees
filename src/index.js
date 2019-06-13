import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import ExploreScreen from './navigators/ExploreScreen';
import FavoritesScreen from './navigators/FavoritesScreen';
import TagScreen from './features/tag';

import {store, persistor} from './store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';


const RootTabNav = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreScreen
    },
    Tag: {
      screen: TagScreen
    },
    Favorites: {
      screen: FavoritesScreen
    }
  },
  {
    initialRouteName: 'Explore'
  }
);

const AppContainer = createAppContainer(RootTabNav);

class EntryPoint extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
      
    );
  }
}

export default EntryPoint;